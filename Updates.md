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

### 5. UI Redesign — "Culinary Curator"
Complete visual overhaul based on an HTML mockup with a warm, food-focused design language.

**Fonts**: Replaced Geist with Manrope (headlines) + Work Sans (body) via `next/font/google`. Registered as `--font-heading` and `--font-sans` in Tailwind theme.

**Color system**: Replaced flat gray/white palette with a warm MD3-inspired token set in `globals.css`. Key tokens: `primary` (#964900), `primary-container` (#ff8000), `surface` (#fff8f5), plus secondary, error, and outline variants. Removed dark mode — mockup is light-only.

**Restaurant cards**: Added image section using `logoUrl` from the Just Eat API (plain `<img>` with lazy loading, surface-colored fallback). Rating badge is now an absolute-positioned pill overlay with a star icon. Cuisine tags and address styled with the new color tokens. Hover effect scales the image and lifts the card shadow.

**Postcode search**: New `PostcodeSearch` component — controlled input with search icon and submit button. State lives in `RestaurantList` which re-fetches when the postcode changes. Replaces the hardcoded "EC4M7RF" heading.

**Loading/error states**: Loading is now a centered spinner inside a rounded surface panel with "Curating the best kitchens near you..." text. Error state shows a restaurant-themed illustration, "Tastebuds Interrupted" heading, helpful message, and a "Try New Search" button that resets to the default postcode. Added empty-results state too.

**Icons**: I always loved `lucide-react`, so I installed `lucide-react` for Star, MapPin, Search, and UtensilsCrossed icons.

**Page layout**: Widened container to `max-w-7xl`. Page is now a thin shell — just `<main>` wrapping `<RestaurantList>` which owns the heading, search, and grid.

### 6. Card background — blurred logo effect
When looking at the website and the API, I noticed that the Just Eat API only returns a small `.gif` logo per restaurant, no hero images. Stretching it to fill the card looked terrible. Tried a gradient background with the logo at natural size first and it looked too plain and basic.

After researching, and basing this on older projects I did, I landed on a Spotify-style approach: duplicate the logo as a blurred, scaled-up background (`blur-2xl scale-150 opacity-60`) behind the sharp logo. Each card now gets a unique colorful background derived from its own logo. Falls back to the restaurant's first letter if no `logoUrl` exists. Pure CSS, no new dependencies.
