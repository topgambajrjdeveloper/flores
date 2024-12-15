import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/sanity'
import { Button } from "@/components/ui/button"
import { urlForImage } from '@/lib/sanity.image'
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface FeaturedProductsProps {
  products: Product[]
}

export function FeaturedProducts({ products }:FeaturedProductsProps) {
 
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Productos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product._id}>
              <CardContent className="p-4">
                {product.imageUrl && (
                  <Image
                  priority={true}
                    src={urlForImage(product.imageUrl).width(300).height(300).url()}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                )}
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.price.toFixed(2)} €</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/shop/${product.slug}`}>Ver Detalles</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}