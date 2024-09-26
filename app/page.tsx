import {HomePage} from "../components/home_page";

export interface ICategory  {
  id: number | string;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}
export interface IProduct  {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: ICategory;
}

export default async function Home() {
  return (
    <HomePage />
  );
}
