'use client'

import Image from 'next/image'
import { urlForImage } from '@/lib/sanity.image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from '@/contexts/cart-context'
import AddToRecentlyViewed from '@/app/shop/[slug]/add-to-recently-viewed'
import { RecentlyViewedProducts } from './recently-viewed-products'

type ProductDetailsProps = {
  product: any // You might want to define a proper type for this
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart()

  return (
    <div className="container mx-auto px-4 py-16">
      <AddToRecentlyViewed product={product} />
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{product.name}</CardTitle>
          <CardDescription>
            {product.categoryName && (
              <Badge variant="secondary" className="mr-2">{product.categoryName}</Badge>
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
            {product.images && product.images.length > 0 && (
              <div className="relative h-96">
                <Image
                  src={urlForImage(product.images[0]).url()}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
            <div className="flex gap-2 overflow-x-auto">
              {product.images && product.images.slice(1).map((image, index) => (
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
            <div>
              <h2 className="text-2xl font-semibold mb-2">Precio</h2>
              <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
            </div>
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Tamaños disponibles</h2>
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
                    <Badge key={type} variant="outline">{type}</Badge>
                  ))}
                </div>
              </div>
            )}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Colores predominantes</h2>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <Badge key={color} variant="outline">{color}</Badge>
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
                <h2 className="text-xl font-semibold mb-2">Instrucciones de cuidado</h2>
                <p className="text-muted-foreground">{product.careInstructions}</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            size="lg"
            className="w-full"
            onClick={() => addToCart({
              id: product._id,
              name: product.name,
              price: product.price,
              quantity: 1,
              image: product.images[0]
            })}
          >
            Añadir al carrito
          </Button>
        </CardFooter>
      </Card>
      <RecentlyViewedProducts currentProductId={product._id} />
    </div>
  )
}