export enum ApiRoutes {
  PRODUCTS = 'products/',
  CATEGORIES = 'categories/',
  PRODUCTS_SEARCH = 'products/search/'
}

export const ERROR_PRODUCT = {
  id: 696969,
  title: "Product not available!",
  price: 0,
  description: "The product, you've requested, is not available.  Please, go to shop page!",
  images: [
    "/product_not_fount.jpg",
    "/product_not_fount.jpg",
    "/product_not_fount.jpg"
  ],
  creationAt: "2024-09-19T03:05:08.000Z",
  updatedAt: "2024-09-19T03:05:08.000Z",
  category: {
    id: 696969,
    name: "Not found",
    image: "/product_not_fount.jpg",
    creationAt: "2024-09-19T03:05:08.000Z",
    updatedAt: "2024-09-19T07:10:24.000Z"
  }
}

export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];