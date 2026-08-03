/**
 * Apple App Site Association.
 *
 * Served from a route handler rather than public/, because the file has no
 * extension: Hostinger's CDN serves public/ directly, so nothing infers a MIME
 * type and the response goes out with no Content-Type at all. Apple requires
 * application/json, so the header is set explicitly here where the Node server
 * guarantees it.
 *
 * assetlinks.json stays in public/ — the .json extension means it is typed
 * correctly already.
 */
export const dynamic = "force-static";

const ASSOCIATION = {
  applinks: {
    details: [
      {
        appIDs: ["Q796W2WJKD.com.fortherestofus.inspirit"],
        components: [{ "/": "/d/*" }, { "/": "/v/*" }],
      },
    ],
  },
};

export function GET() {
  return new Response(JSON.stringify(ASSOCIATION, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
