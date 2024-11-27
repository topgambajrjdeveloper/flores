'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client } from '@/lib/sanity.client'
import { urlForImage } from '@/lib/sanity.image'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

async function getBlogPost(slug: string) {
  return await client.fetch(
    `*[_type == "blog" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      "author": author->name,
      mainImage,
      publishedAt,
      categories[]->{
        title,
        "slug": slug.current
      },
      body,
      excerpt,
      tags,
      socialShare
    }`,
    { slug }
  )
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-16">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</CardTitle>
          <CardDescription>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>Por {post.author}</span>
              <span>•</span>
              <time dateTime={post.publishedAt}>
                {format(new Date(post.publishedAt), "d 'de' MMMM, yyyy", { locale: es })}
              </time>
            </div>
          </CardDescription>
        </CardHeader>
        {post.mainImage && (
          <Image
            src={urlForImage(post.mainImage).url()}
            alt={post.title}
            width={1200}
            height={630}
            className="w-full h-auto object-cover"
          />
        )}
        <CardContent className="prose dark:prose-invert max-w-none py-6">
          <PortableText value={post.body} />
        </CardContent>
        <CardFooter className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {post.tags && post.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          <div className="flex gap-2">
            {post.socialShare?.facebook && (
              <Button size="icon" variant="outline" aria-label="Compartir en Facebook">
                <Facebook className="h-4 w-4" />
              </Button>
            )}
            {post.socialShare?.twitter && (
              <Button size="icon" variant="outline" aria-label="Compartir en Twitter">
                <Twitter className="h-4 w-4" />
              </Button>
            )}
            {post.socialShare?.instagram && (
              <Button size="icon" variant="outline" aria-label="Compartir en Instagram">
                <Instagram className="h-4 w-4" />
              </Button>
            )}
            {post.socialShare?.linkedin && (
              <Button size="icon" variant="outline" aria-label="Compartir en LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </article>
  )
}