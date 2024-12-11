

import Link from "next/link";
import Image from "next/image";
import { SITE_INFO } from "@/seo";
import { client } from "@/lib/sanity.client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { urlForImage } from "@/lib/sanity.image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product._id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                <Link
                  href={`/shop/${product.slug}`}
                  className="hover:underline"
                >
                  {product.name}
                </Link>
              </CardTitle>
              <CardDescription>
                {product.categoryName && (
                  <Badge variant="secondary">{product.categoryName}</Badge>
                )}
              </CardDescription>
            </CardHeader>
            {product.imageUrl && (
              <div className="relative h-48">
                <Image
                priority={true}
                  src={urlForImage(product.imageUrl).url()}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            )}
            <CardContent className="flex-grow mt-4">
              <p className="text-muted-foreground line-clamp-2">
                {product.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-lg font-bold">
                {product.price.toFixed(2)} €
              </span>
              <Button asChild>
                <Link href={`/shop/${product.slug}`}>Ver Detalles</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
