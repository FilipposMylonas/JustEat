export type Cuisine = {
  name: string;
  uniqueName: string;
};

export type Rating = {
  starRating: number;
  count: number;
};

export type Address = {
  firstLine: string;
  city: string;
  postalCode: string;
};

export type Restaurant = {
  id: string;
  name: string;
  cuisines: Cuisine[];
  rating: Rating;
  address: Address;
};

export type ApiResponse = {
  restaurants: Restaurant[];
};
