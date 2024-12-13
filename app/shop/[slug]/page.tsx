import { Product } from '@/types/sanity'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity.client'
import ProductDetails from '@/components/pages/Shop/product-details'

async function getProduct(slug: string): Promise<Product | null> {
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

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetails product={product} />
}