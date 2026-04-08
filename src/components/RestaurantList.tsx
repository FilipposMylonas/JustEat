"use client";

import { useEffect, useState, useCallback } from "react";
import { UtensilsCrossed } from "lucide-react";
import { Restaurant } from "@/types/restaurant";
import { fetchRestaurants } from "@/lib/api";
import { RestaurantCard } from "@/components/RestaurantCard";
import { PostcodeSearch } from "@/components/PostcodeSearch";

const DEFAULT_POSTCODE = "EC4M7RF";

export function RestaurantList() {
  const [postcode, setPostcode] = useState(DEFAULT_POSTCODE);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback((pc: string) => {
    setPostcode(pc);
    setLoading(true);
    setError(null);
    setRestaurants([]);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchRestaurants(postcode)
      .then((data) => {
        if (!cancelled) setRestaurants(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [postcode]);

  return (
    <>
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-heading tracking-tight mb-4">
          Restaurants in{" "}
          <span className="text-primary-container">{postcode}</span>
        </h1>
        <p className="text-on-surface-variant max-w-2xl leading-relaxed mb-8">
          Discover the finest dining experiences curated for your neighborhood.
          From artisanal bakeries to Michelin-starred classics.
        </p>
        <PostcodeSearch initialPostcode={postcode} onSearch={search} />
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center p-20 rounded-3xl bg-surface-container-low">
          <div className="w-12 h-12 border-4 border-primary-container/20 border-t-primary-container rounded-full animate-spin mb-6" />
          <p className="font-medium text-secondary">
            Curating the best kitchens near you...
          </p>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center text-center p-12 rounded-3xl bg-error-container/30 border-2 border-dashed border-error/20">
          <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mb-6">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold font-heading text-on-error-container mb-2">
            Tastebuds Interrupted
          </h3>
          <p className="text-on-surface-variant max-w-md mb-8">
            We couldn&apos;t find any restaurants for that specific postcode. Try
            searching for a nearby street or a broader area.
          </p>
          <button
            onClick={() => search(DEFAULT_POSTCODE)}
            className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
          >
            Try New Search
          </button>
        </div>
      )}

      {!loading && !error && restaurants.length === 0 && (
        <div className="flex flex-col items-center text-center p-12 rounded-3xl bg-surface-container-low">
          <p className="text-on-surface-variant font-medium">
            No restaurants found for this postcode.
          </p>
        </div>
      )}

      {!loading && !error && restaurants.length > 0 && (
        <div className="grid gap-8 md:grid-cols-2">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </>
  );
}
