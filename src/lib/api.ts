import { ApiResponse, Restaurant } from "@/types/restaurant";

export async function fetchRestaurants(
  postcode: string,
): Promise<Restaurant[]> {
  const response = await fetch(`/api/restaurants/${postcode}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch restaurants: ${response.status}`);
  }

  const data: ApiResponse = await response.json();
  return data.restaurants.slice(0, 10);
}
