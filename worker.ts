/* eslint-disable no-console */
import {
  getAssetFromKV,
  mapRequestToAsset,
  NotFoundError,
  MethodNotAllowedError,
} from '@cloudflare/kv-asset-handler';

const cacheControl = {
  browserTTL: 30 * 24 * 60 * 60,
  edgeTTL: 2 * 24 * 60 * 60,
  bypassCache: false,
};

/**
 * Handles fetch event
 * It is expected to be triggered from `https://matrix.ai` or
 * `https://polykey.com/...`
 */
async function handleFetchEvent(event: FetchEvent): Promise<Response> {
  console.log('Handling request from', event.request.url);
  const url = new URL(event.request.url);
  // Check if the URL pathname is exactly '/docs'
  if (url.pathname === '/docs') {
    console.log('Redirecting /docs to /docs/');
    return Response.redirect(url.origin + '/docs/', 301);
  }
  try {
    // This ignores everything except the pathname
    return await getAssetFromKV(event, {
      mapRequestToAsset: mapRequestToDocs,
      cacheControl,
    });
  } catch (e) {
    if (e instanceof NotFoundError) {
      console.log('Requested resource not found', e.message);
      const response404 = await getAssetFromKV(event, {
        mapRequestToAsset: mapRequestTo404,
        cacheControl,
      });
      console.log('Responding with 404 resource');
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

/**
 * Map request to documentation asset (HTML, CSS, JS, images, files... etc)
 * This worker is routed from `polykey.com/docs`
 * All of the `../docs` assets is uploaded to the "root" of the worker
 * Therefore the `/docs` path segment must be removed, as `getAssetFromKV` uses the pathname
 * of the URL to look up the correct asset
 */
function mapRequestToDocs(req: Request): Request {
  // Default mapping resolves directory URLs e.g. `/dir` becomes `/dir/index.html`
  const assetRequest = mapRequestToAsset(req);
  const assetUrl = new URL(assetRequest.url);
  // Strip the `/docs` segment: `https://polykey.com/docs/...` -> `https://polykey.com/...`
  assetUrl.pathname = assetUrl.pathname.replace(/^\/docs/, '/');
  return new Request(assetUrl.toString(), assetRequest);
}

/**
 * Map request to 404.html page
 * This does not need to use `mapRequestToAsset` because we are directly
 * going to `404.html`
 */
function mapRequestTo404(req: Request): Request {
  return new Request(`${new URL(req.url).origin}/404.html`, req);
}

addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(handleFetchEvent(event));
});
