import { Restaurant } from "@/types/restaurant";
import { Star, MapPin } from "lucide-react";

type RestaurantCardProps = {
  restaurant: Restaurant;
};

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const { name, cuisines, rating, address, logoUrl } = restaurant;

  return (
    <article className="group rounded-xl overflow-hidden bg-white transition-all duration-300 hover:shadow-[0_12px_32px_rgba(37,25,18,0.06)]">
      <div className="relative h-64 overflow-hidden bg-surface-container-highest">
        {logoUrl && (
          <img
            src={logoUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute top-4 right-4 bg-primary-container text-on-primary-container px-3 py-1 rounded-full font-bold text-sm flex items-center shadow-lg">
          {rating.starRating}
          <Star className="w-3.5 h-3.5 ml-1 fill-current" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold font-heading text-on-surface mb-1">
          {name}
        </h3>
        <p className="text-secondary font-medium mb-3">
          {cuisines.map((c) => c.name).join(" · ")}
        </p>
        <div className="flex items-start text-on-surface-variant text-sm">
          <MapPin className="w-4 h-4 mr-2 mt-0.5 shrink-0 text-outline" />
          <p>
            {address.firstLine}, {address.city}, {address.postalCode}
          </p>
        </div>
      </div>
    </article>
  );
}
