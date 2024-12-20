'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { urlForImage } from '@/lib/sanity.image'
import { RecentlyViewedProduct } from '@/types/sanity'
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"

export function RecentlyViewedProducts({ currentProductId }: { currentProductId: string }) {
  const [recentProducts, setRecentProducts] = useState<RecentlyViewedProduct[]>([])

  useEffect(() => {
    const storedProducts = localStorage.getItem('recentlyViewedProducts')
    if (storedProducts) {
      const parsedProducts: RecentlyViewedProduct[] = JSON.parse(storedProducts)
      setRecentProducts(parsedProducts.filter(product => product._id !== currentProductId).slice(0, 4))
    }
  }, [currentProductId])

  if (recentProducts.length === 0) {
    return null
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Productos vistos recientemente</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recentProducts.map((product) => (
          <Card key={product._id} className="flex flex-col">
            <CardContent className="p-4">
              <div className="relative h-40 mb-2">
                <Image
                  src={urlForImage(product.imageUrl).width(300).height(300).url()}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <CardTitle className="text-sm line-clamp-2">{product.name}</CardTitle>
            </CardContent>
            <CardFooter className="p-4 pt-0 mt-auto">
              <Link href={`/shop/${product.slug}`} className="text-primary hover:underline text-sm">
                Ver producto
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}