# Just Eat — Restaurants by Postcode

A small Next.js app that takes a UK postcode, calls the Just Eat discovery API, and displays the first 10 restaurants returned with their **name, cuisines, rating (as a number), and address**.

Built as part of the Just Eat Early Careers Software Engineering Programme coding assignment.

---

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** for styling
- **lucide-react** for icons
- A small server-side route handler that proxies the Just Eat API (see [Assumptions](#assumptions))

## Project structure

```
src/
├── app/
│   ├── api/restaurants/[postcode]/route.ts   # Server-side proxy to the Just Eat API
│   ├── layout.tsx                            # Root layout, fonts
│   ├── page.tsx                              # Page shell
│   └── globals.css                           # Theme tokens + Tailwind
├── components/
│   ├── PostcodeSearch.tsx                    # Search input
│   ├── RestaurantCard.tsx                    # Single restaurant card
│   └── RestaurantList.tsx                    # Fetch state + grid
├── lib/
│   └── api.ts                                # fetchRestaurants() — slices to first 10
└── types/
    └── restaurant.ts                         # Typed shape of the API response
```

---

## Build, compile and run

**Requirements:** Node.js 20+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) and enter a UK postcode.

### Other scripts

```bash
npm run build   # Production build
npm run start   # Run the production build
npm run lint    # ESLint
```

### Try it with these postcodes

`CT1 2EH`, `BS1 4DJ`, `SW1A 1AA`, `EC4M 7RF`, `BN1 1AE`, `M16 0RA`, `LS2 7HY`, `EH1 1RE`, `G3 8AG`, `BT7 1NN`

> Only **UK** postcodes are supported by the API — Netherlands and Germany postcodes will not work.

---

## How it works

1. The user types a postcode into `PostcodeSearch`.
2. `RestaurantList` calls `fetchRestaurants(postcode)` from [src/lib/api.ts](src/lib/api.ts), which hits the local route `/api/restaurants/[postcode]`.
3. That route handler ([src/app/api/restaurants/[postcode]/route.ts](src/app/api/restaurants/[postcode]/route.ts)) forwards the request server-side to:
   ```
   https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/{postcode}
   ```
4. The response is sliced to the first 10 restaurants and rendered as cards showing **name, cuisines, rating, and address**.

---

## Assumptions

- **CORS:** The Just Eat API does not return CORS headers, so calling it directly from the browser fails. I assumed the cleanest fix was to proxy the request through a Next.js route handler — this keeps the client side simple and means no extra backend service is needed.
- **"First 10 restaurants"** is interpreted as the first 10 in the order the API returns them. No client-side sorting is applied.
- **Rating** is taken from `restaurant.rating.starRating` and displayed as a number, as the brief specifies.
- **Address** is shown as `firstLine, city, postalCode` — these are the fields the API consistently provides.
- **Postcode validation** is intentionally minimal: the input is trimmed and submitted as-is. The upstream API returns a clear error for invalid postcodes, which the UI surfaces.
- **Image handling:** Some restaurants return a logo URL, some don't. When missing, the card falls back to the first letter of the restaurant name on a coloured background.

---

## Improvements I'd make with more time

- **Use `next/image`** instead of `<img>` for the restaurant logos — would silence the two ESLint warnings and get free image optimisation.
- **Client-side UK postcode validation** with a regex, so users get instant feedback before hitting the API.
- **Tests:** unit tests for `fetchRestaurants` (slicing, error handling) and a render test for `RestaurantCard`.
- **React error boundary** around `RestaurantList` to catch runtime errors gracefully.
- **Caching / debouncing** repeated searches for the same postcode.
- **Pagination or "load more"** if the brief were relaxed beyond 10 results.
- **Accessibility pass:** verify keyboard navigation, focus order, and screen-reader labels on the card grid.

---

## My thought process

I kept a running development log in [Updates.md](Updates.md) — written chronologically as I worked. It covers the initial scaffolding, the CORS issue and how I worked around it, the UI redesign decisions, and the small visual iterations on the cards and logo backgrounds. If you'd like to see *how* I arrived at the final solution rather than just the end result, that's the file to read.
