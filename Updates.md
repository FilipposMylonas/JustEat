# Updates

## 2026-04-08

### 1. Project setup
Bootstrapped with `create-next-app` — App Router, `src/` directory, `@/*` path alias. Stack: Next.js 16.2.2, React 19, Tailwind CSS 4, TypeScript 5, ESLint 9.

### 2. Types and API layer
Started by defining the data contract. Created `src/types/restaurant.ts` with only the fields we actually need from the API (`Restaurant`, `Cuisine`, `Rating`, `Address`). Then wrote `src/lib/api.ts` with a `fetchRestaurants(postcode)` function that hits the Just Eat API directly from the browser and slices to the first 10 results.

### 3. UI components
Built two components:
- `RestaurantCard` — pure presentational, takes a `Restaurant` and renders name, cuisines (joined by `·`), star rating as a number, and address.
- `RestaurantList` — the `"use client"` boundary. Manages loading/error/data states with `useState` + `useEffect`, renders a responsive 2-column grid of cards.

Wired it all together in `page.tsx` — just a heading and `<RestaurantList />` inside a centered layout. Added `--color-primary: #FF8000` to the Tailwind theme. Updated the page metadata.

### 4. CORS issue
Tried loading the page and got "Failed to fetch". The Just Eat API doesn't set CORS headers, so the browser blocks the response. Confirmed the API works fine server-side with a `curl` — returns 200.

Fix: created a Next.js route handler at `src/app/api/restaurants/[postcode]/route.ts` that proxies the request server-side. Updated `src/lib/api.ts` to call `/api/restaurants/{postcode}` instead of the external URL. Rebuild passed, page loads correctly now.
