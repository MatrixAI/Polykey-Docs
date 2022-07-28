import { getAssetFromKV, NotFoundError, MethodNotAllowedError, mapRequestToAsset } from '@cloudflare/kv-asset-handler'

addEventListener('fetch', (event) => {
  event.respondWith(handleEvent(event))
});

async function handleEvent(event): Promise<Response> {
  console.log('HANDLING EVENT');
  console.log('event', event);
  console.log('event.request', event.request);
  console.log('event.request.url', event.request.url);
  // console.log('event.request.cf', event.request.cf);

  // The URL is `https://polykey.io/docs/...`, it is the full URL
  // Use the `handlePrefix` to strip the `/docs/` out of the request
  // The end result is that we have a URL that doesn't have the route in it
  // So if we have `https://polykey.io/docs/index.html`
  // This is converted to `https://polykey.io/index.html`
  // The reason to do this is so that `mapRequestToAsset` will then use the `index.html` to look up
  // Rather than the prefixed path
  // The `getAssetFromKV` ignores the hostname, and just uses the path directly
  // Which in this case will be index.html

  const stripPrefix = handlePrefix(/^\/docs/);

  try {
    return await getAssetFromKV(event, {
      mapRequestToAsset: (req) => {
        const r = stripPrefix(req);
        console.log('STRIPPED', r.url);
        return r;
      }
    });
  } catch (e) {
    if (e instanceof NotFoundError) {
      console.log('NOT FOUND', e.message);
      const response404 = await getAssetFromKV(
        event,
        {
          mapRequestToAsset: (req) =>  {
            const url = new URL(req.url);
            console.log('MAPPING TO', `${url.origin}/404.html`)
            return new Request(`${url.origin}/404.html`, req);
          },
        }
      );

      console.log('GOT 404 response');

      return new Response(response404.body, {
        ...response404,
        status: 404,
      });
    } else if (e instanceof MethodNotAllowedError) {
      return new Response('Method Not Allowed', { status: 405 });
    }
    return new Response('Server Error', { status: 500 });
  }
}

function handlePrefix(prefix) {
  return (request) => {
    // compute the default (e.g. / -> index.html)
    let defaultAssetKey = mapRequestToAsset(request);
    let url = new URL(defaultAssetKey.url);

    // strip the prefix from the path for lookup
    url.pathname = url.pathname.replace(prefix, "/");

    // inherit all other props from the default request
    return new Request(url.toString(), defaultAssetKey);
  };
}
