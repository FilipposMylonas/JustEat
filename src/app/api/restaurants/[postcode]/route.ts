const API_BASE =
  "https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode";

export async function GET(
  _req: Request,
  ctx: RouteContext<"/api/restaurants/[postcode]">,
) {
  const { postcode } = await ctx.params;

  const response = await fetch(`${API_BASE}/${postcode}`);

  if (!response.ok) {
    return Response.json(
      { error: `API returned ${response.status}` },
      { status: response.status },
    );
  }

  const data = await response.json();
  return Response.json(data);
}
