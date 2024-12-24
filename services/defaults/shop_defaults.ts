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
