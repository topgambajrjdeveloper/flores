import { SITE_INFO } from "@/seo";
import { client } from "@/lib/sanity.client";
import ProductList from "@/components/pages/Shop/product-list";

async function getProducts() {
  return client.fetch(`
    *[_type == "product"] {
      _id,
      name,
      "slug": slug.current,
      price,
      description,
      "imageUrl": images[0].asset->url,
      "categoryName": category->name,
      inStock
    }
  `);
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center pt-6">
        Bienvenido A La Tienda de {SITE_INFO.siteName}
      </h1>
      <ProductList products={products} />
    </div>
  );
}