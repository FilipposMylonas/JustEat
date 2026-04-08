"use client";

import { useEffect, useState } from "react";
import { Restaurant } from "@/types/restaurant";
import { fetchRestaurants } from "@/lib/api";
import { RestaurantCard } from "@/components/RestaurantCard";

export function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRestaurants("EC4M7RF")
      .then(setRestaurants)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FF8000] border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="rounded-lg bg-red-50 p-4 text-center text-red-600">
        {error}
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
