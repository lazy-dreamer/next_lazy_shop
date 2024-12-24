export const ERROR_PRODUCT = {
  id: 696969,
  title: "Product not available!",
  price: 0,
  description:
    "The product, you've requested, is not available.  Please, go to shop page!",
  images: [
    `${process.env.NEXT_PUBLIC_LOCAL_URL}/product_not_found.jpg`,
    `${process.env.NEXT_PUBLIC_LOCAL_URL}/product_not_found.jpg`,
    `${process.env.NEXT_PUBLIC_LOCAL_URL}/product_not_found.jpg`,
  ],
  creationAt: "2024-09-19T03:05:08.000Z",
  updatedAt: "2024-09-19T03:05:08.000Z",
  category: {
    id: 696969,
    name: "Not found",
    image: `${process.env.NEXT_PUBLIC_LOCAL_URL}/product_not_found.jpg`,
    creationAt: "2024-09-19T03:05:08.000Z",
    updatedAt: "2024-09-19T07:10:24.000Z",
  },
};
