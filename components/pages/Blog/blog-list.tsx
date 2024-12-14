import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Blog } from '@/types/sanity'
import { Badge } from "@/components/ui/badge"
import { urlForImage } from '@/lib/sanity.image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface BlogListProps {
  posts: Blog[]
}

export default function BlogList({ posts }:BlogListProps) {
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