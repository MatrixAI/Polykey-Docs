import { getAssetFromKV, NotFoundError, MethodNotAllowedError, mapRequestToAsset } from '@cloudflare/kv-asset-handler'
// import type { Request } from '@cloudflare/workers-types';

/// <reference types="@cloudflare/workers-types" />

addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(handleEvent(event))
});

const cacheControl = {
  browserTTL: 30 * 24 * 60 * 60,
  edgeTTL: 2 * 24 * 60 * 60,
  bypassCache: false
};

const mapRequestTo404 = (req: Request) => new Request(`${new URL(req.url).origin}/404.html`, req);

async function handleEvent(event: FetchEvent): Promise<Response> {


  // This url will be `https://polykey.io/docs` or `https://polykey.io/docs/...`
  console.log('Handling request from', event.request.url);

  event.request.cf


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
      mapRequestToAsset: (req: Request) => {


        const r = stripPrefix(req);
        console.log('STRIPPED', r.url);
        return r;
      },
      cacheControl
    });
  } catch (e) {
    if (e instanceof NotFoundError) {
      console.log('Requested resource not found', e.message);
      const response404 = await getAssetFromKV(
        event,
        {
          mapRequestToAsset: mapRequestTo404,
          cacheControl
        }
      );
      console.log('Responding with 404 resource');
      return new Response(
        response404.body,
        {
          ...response404,
          status: 404,
        }
      );
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
