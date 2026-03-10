export async function onRequest(context) {
  // Get the Env-bound ASSETS fetcher that can read static files
  const { request, env } = context;

  const assetPath = "/assets/minderheiten_china.pptx";

  // Fetch the static asset from the Pages bundle
  const assetResponse = await env.ASSETS.fetch(
    new Request(new URL(assetPath, request.url), request)
  );

  if (!assetResponse.ok) {
    // Asset missing or something went wrong
    return new Response("File not found", { status: 404 });
  }

  // Clone and override headers to force download
  const fileData = await assetResponse.arrayBuffer();

    console.log("Serving download for minderheiten_china.pptx");
    console.log("content: " + fileData.byteLength + " bytes");

  return new Response(fileData, {
    status: 200,
    headers: {
      // content type is good to forward if known
      "Content-Type": assetResponse.headers.get("Content-Type") || "application/octet-stream",

      // THIS is what makes the browser download instead of display.
      "Content-Disposition": 'attachment; filename="minderheiten_china.pptx"',

      // optional caching
      "Cache-Control": "public, max-age=3600",
    },
  });
}