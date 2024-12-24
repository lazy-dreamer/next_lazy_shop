import { ICartItem } from "../../components/add_to_cart/add_to_cart";

export function mergeArrays(arr1: ICartItem[], arr2: ICartItem[]): ICartItem[] {
  const map = new Map(arr1.map((item) => [item.product.id, item]));

  arr2.forEach((item) => {
    const existingItem = map.get(item.product.id);
    if (!existingItem || existingItem.quantity < item.quantity) {
      map.set(item.product.id, item);
    }
  });

  return Array.from(map.values());
}
