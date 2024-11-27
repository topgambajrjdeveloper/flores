'use client'

import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity.client'
import ProductDetails from '@/components/pages/Shop/product-details'

async function getProduct(slug: string) {
  return client.fetch(`
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      "slug": slug.current,
      price,
      description,
      images,
      "categoryName": category->name,
      inStock,
      sizes[]->{name},
      flowerTypes,
      occasion,
      colors,
      style,
      careInstructions
    }
  `, { slug })
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  return <ProductDetails product={product} />
}