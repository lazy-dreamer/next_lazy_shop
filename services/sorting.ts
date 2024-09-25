import {IPoduct} from "../app/page";

export function sortProductItems(products: IPoduct[], action: string) {
  const sortedProducts = [...products];
  
  switch (action) {
    case 'name_start':
      sortedProducts.sort((a, b) => {
        const nameA: string = a.title.toLowerCase();
        const nameB: string = b.title.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      break;
    case 'name_end':
      sortedProducts.sort((a, b) => {
        const nameA = a.title.toLowerCase();
        const nameB = b.title.toLowerCase();
        if (nameA < nameB) return 1;
        if (nameA > nameB) return -1;
        return 0;
      });
      break;
    case 'price_up':
      sortedProducts.sort((a, b) => parseFloat(a.price.toString()) - parseFloat(b.price.toString()));
      break;
    case 'price_down':
      sortedProducts.sort((a, b) => parseFloat(b.price.toString()) - parseFloat(a.price.toString()));
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
  
  return sortedProducts
}