import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity.image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types/sanity";

interface ProductListProps {
  products: Product[]
}

export default function ProductList({ products }:ProductListProps) {
  return (
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
  );
}