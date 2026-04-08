import { Restaurant } from "@/types/restaurant";

type RestaurantCardProps = {
  restaurant: Restaurant;
};

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const { name, cuisines, rating, address } = restaurant;

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#FF8000]/10 px-2.5 py-0.5 text-sm font-medium text-[#FF8000]">
          ★ {rating.starRating}
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-500">
        {cuisines.map((c) => c.name).join(" · ")}
      </p>

      <p className="mt-3 text-sm text-gray-400">
        {address.firstLine}, {address.city}, {address.postalCode}
      </p>
    </article>
  );
}
