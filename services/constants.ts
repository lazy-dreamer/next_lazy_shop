export enum ApiRoutes {
  PRODUCTS = "products/",
  CATEGORIES = "api/categories/",
  PRODUCTS_SEARCH = "api/products/search/",
}

export const SITE_TITLE = "Next.js LazyShop";

export const ERROR_PRODUCT = {
  id: 696969,
  title: "Product not available!",
  price: 0,
  description:
    "The product, you've requested, is not available.  Please, go to shop page!",
  images: [
    "/product_not_fount.jpg",
    "/product_not_fount.jpg",
    "/product_not_fount.jpg",
  ],
  creationAt: "2024-09-19T03:05:08.000Z",
  updatedAt: "2024-09-19T03:05:08.000Z",
  category: {
    id: 696969,
    name: "Not found",
    image: "/product_not_fount.jpg",
    creationAt: "2024-09-19T03:05:08.000Z",
    updatedAt: "2024-09-19T07:10:24.000Z",
  },
};

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const SHOP_DEFAULTS = {
  sort: "name_start",
  price_min: 1,
  price_max: 10001,
  price_range_step: 1,
  default_category: "all",
  items_per_page: 6,
  sortingOptions: [
    { value: "disabledOption", label: "Sorting", isDisabled: true },
    { value: "name_start", label: "Name A - Z" },
    { value: "name_end", label: "Name Z - A" },
    { value: "price_up", label: "Price from low to high" },
    { value: "price_down", label: "Price from high to low" },
  ],
};
