import Link from 'next/link'
import Image from 'next/image'
import { SITE_INFO } from '@/seo'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import BlogFilter from './blog-filter'
import { client } from '@/lib/sanity.client'
import { Badge } from "@/components/ui/badge"
import { Blog, Category } from '@/types/sanity'
import { urlForImage } from '@/lib/sanity.image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

async function getCategories(): Promise<Category[]> {
  return client.fetch(`
    *[_type == "category"] {
      _id,
      title,
      "slug": slug.current
    }
  `)
}

async function getBlogPosts(): Promise<Blog[]> {
  return client.fetch(`
    *[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      "author": author->{_id, name},
      mainImage,
      publishedAt,
      excerpt,
      categories[]->{
        _id,
        title,
        "slug": slug.current
      }
    }
  `)
}

export function BlogList({ posts }: { posts: Blog[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Card key={post._id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </CardTitle>
            <CardDescription>
              <time dateTime={post.publishedAt} className="text-sm text-muted-foreground">
                {format(new Date(post.publishedAt), "d 'de' MMMM, yyyy", { locale: es })}
              </time>
            </CardDescription>
          </CardHeader>
          {post.mainImage && (
            <Image
              src={urlForImage(post.mainImage).width(600).height(400).url()}
              alt={post.title}
              width={600}
              height={400}
              priority={true}
              className="w-full h-48 object-cover"
            />
          )}
          <CardContent className="flex-grow">
            <p className="text-muted-foreground">{post.excerpt}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <Badge key={category._id} variant="secondary">{category.title}</Badge>
              ))}
            </div>
            <Link href={`/blog/${post.slug}`} className="text-primary hover:underline">
              Leer más
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default async function BlogPage() {
  const [categories, posts] = await Promise.all([getCategories(), getBlogPosts()])

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 py-10 text-center">Bienvenido al Blog de {SITE_INFO.siteName}</h1>
      <BlogFilter categories={categories} posts={posts} />
    </div>
  )
}