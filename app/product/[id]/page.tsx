import React from "react";
import { ProductFullBlock } from "../../../components/product_full_block/product_full_block";
import { Api } from "../../../services/api/api-client";
import { ProductsSlider } from "../../../components/products_slider/products_slider";
import { Metadata } from "next";
import { IProduct } from "@/app/page";

interface ProductPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product: IProduct = await Api.products.product(params.id);
  return {
    title: product ? `${product.title}` : "Product Not Found",
    description: product
      ? product.description
      : "No product description available",
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product: IProduct = await Api.products.product(params.id);
  const featuredProducts = await Api.products
    .search(`?categoryId=${product.category.id}`)
    .then((data) => data?.slice(0, 10));

  return (
    <section>
      <div className="screen_content">
        <ProductFullBlock product={product} />
        {product.id != 696969 && (
          <ProductsSlider title={"Featured items"} blocks={featuredProducts} />
        )}
      </div>
    </section>
  );
}
