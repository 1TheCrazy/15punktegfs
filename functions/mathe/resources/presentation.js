export async function onRequest(context) {
  // Get the Env-bound ASSETS fetcher that can read static files
  // (Cloudflare Pages injects this for you)
  const { request, env } = context;

  // We want to serve /assets/myFile.zip but force it as an attachment
  const assetPath = "../public/assets/bezier_kurven.pptm";

  // 1. Fetch the static asset from the Pages bundle
  const assetResponse = await env.ASSETS.fetch(
    new Request(new URL(assetPath, request.url), request)
  );

  if (!assetResponse.ok) {
    // Asset missing or something went wrong
    return new Response("File not found", { status: 404 });
  }

  // 2. Clone and override headers to force download
  const fileData = await assetResponse.arrayBuffer();

  return new Response(fileData, {
    status: 200,
    headers: {
      // content type is good to forward if known
      "Content-Type": assetResponse.headers.get("Content-Type") || "application/octet-stream",

      // THIS is what makes the browser download instead of display.
      // The filename here is what the user will see in "Save as..."
      "Content-Disposition": 'attachment; filename="bezier_kurven.pptm"',

      // optional but nice
      "Cache-Control": "public, max-age=3600",
    },
  });
}