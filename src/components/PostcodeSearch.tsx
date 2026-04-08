"use client";

import { useState } from "react";
import { Search } from "lucide-react";

type PostcodeSearchProps = {
  initialPostcode: string;
  onSearch: (postcode: string) => void;
};

export function PostcodeSearch({
  initialPostcode,
  onSearch,
}: PostcodeSearchProps) {
  const [value, setValue] = useState(initialPostcode);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 max-w-md">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter postcode..."
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-3 bg-primary-container text-on-primary-container font-bold rounded-xl hover:opacity-90 transition-opacity"
      >
        Search
      </button>
    </form>
  );
}
