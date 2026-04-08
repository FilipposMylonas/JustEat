import { RestaurantList } from "@/components/RestaurantList";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">
        Restaurants near <span className="text-[#FF8000]">EC4M 7RF</span>
      </h1>
      <RestaurantList />
    </main>
  );
}
