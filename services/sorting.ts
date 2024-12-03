import { IProduct } from "../app/page";

export function sortProductItems(
  products: IProduct[] | null,
  action: string | null,
) {
  if (!products) return [];
  const sortedProducts = [...products];

  switch (action) {
    case "name_start":
      sortedProducts.sort((a, b) => {
        const nameA: string = a.title.toLowerCase();
        const nameB: string = b.title.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      break;
    case "name_end":
      sortedProducts.sort((a, b) => {
        const nameA = a.title.toLowerCase();
        const nameB = b.title.toLowerCase();
        if (nameA < nameB) return 1;
        if (nameA > nameB) return -1;
        return 0;
      });
      break;
    case "price_up":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "price_down":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    default:
      //name_start
      sortedProducts.sort((a, b) => {
        const nameA: string = a.title.toLowerCase();
        const nameB: string = b.title.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      break;
  }

  return sortedProducts;
}
