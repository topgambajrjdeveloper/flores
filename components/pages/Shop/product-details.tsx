"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "@/types/sanity";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { urlForImage } from "@/lib/sanity.image";
import { useCart } from "@/contexts/cart-context";
import AddToRecentlyViewed from "./add-to-recently-viewed";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecentlyViewedProducts } from "./recently-viewed-products";
import SharedCardLink from "@/components/shared-card-link";

export default function ProductDetails({ product }: { product: Product }) {
  const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/shop/${product.slug}`;
  const productImage =
    product.imageUrl && product.imageUrl.length > 0
      ? urlForImage(product.imageUrl[0]).width(1200).height(630).url()
      : undefined;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Producto añadido",
      description: `${quantity} ${quantity > 1 ? "unidades" : "unidad"} de ${product.name} añadidas al carrito.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-16 pb-6">
      <AddToRecentlyViewed product={product} />
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {product.name}
          </CardTitle>
          <CardDescription>
            {product.categoryName && (
              <Badge variant="secondary" className="mr-2">
                {product.categoryName}
              </Badge>
            )}
            {product.inStock ? (
              <Badge variant="default">En Stock</Badge>
            ) : (
              <Badge variant="destructive">Agotado</Badge>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {product.imageUrl && product.imageUrl.length > 0 && (
              <div className="relative h-96">
                <Image
                  src={urlForImage(product.imageUrl[0]).url()}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
            <div className="flex gap-2 overflow-x-auto">
              {product.imageUrl &&
                product.imageUrl
                  .slice(1)
                  .map((image, index) => (
                    <Image
                      key={index}
                      src={urlForImage(image).width(100).height(100).url()}
                      alt={`${product.name} - imagen ${index + 2}`}
                      width={100}
                      height={100}
                      className="object-cover rounded-md"
                    />
                  ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Descripción</h2>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Tamaños disponibles
                </h2>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <Badge key={size.name}>{size.name}</Badge>
                  ))}
                </div>
              </div>
            )}
            {product.flowerTypes && product.flowerTypes.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Tipos de flores</h2>
                <div className="flex flex-wrap gap-2">
                  {product.flowerTypes.map((type) => (
                    <Badge key={type} variant="outline">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Colores predominantes
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <Badge key={color} variant="outline">
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {product.style && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Estilo</h2>
                <Badge>{product.style}</Badge>
              </div>
            )}
            {product.careInstructions && (
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Instrucciones de cuidado
                </h2>
                <p className="text-muted-foreground">
                  {product.careInstructions}
                </p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Precio</h2>
                <p className="text-3xl font-bold">
                  {product.price.toFixed(2)} €
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="quantity" className="font-semibold">
                  Cantidad:
                </label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value)))
                  }
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <div className="gap-2">
          <div className="flex justify-end pb-5">
            <SharedCardLink
              url={productUrl}
              title={`Mira este hermoso arreglo floral: ${product.name}`}
              description={product.description}
              image={productImage}
              hashtag="#LaHigueraVerde"
            />
          </div>{" "}
        </div>
        <Button
          size="lg"
          className="w-full"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          Añadir al carrito
        </Button>
      </Card>
      <RecentlyViewedProducts currentProductId={product._id} />
    </div>
  );
}
