import { HomePage } from "../components/home_page/home_page";
import { Metadata } from "next";
import { SITE_TITLE } from "../services/constants";

export interface ICategory {
  id: number | string;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}
export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: ICategory;
}

export const metadata: Metadata = {
  title: `${SITE_TITLE}`,
};

export default async function Home() {
  return <HomePage />;
}
