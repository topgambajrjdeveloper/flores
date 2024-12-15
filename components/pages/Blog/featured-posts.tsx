import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Blog } from '@/types/sanity'
// import { Badge } from "@/components/ui/badge"
import { urlForImage } from '@/lib/sanity.image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface FeaturedPostsProps {
    posts: Blog[];
  }

export default function FeaturedPosts({ posts }:FeaturedPostsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <Card key={post._id} className={`flex flex-col h-full ${index === 0 ? 'md:col-span-2 lg:col-span-3' : ''}`}>
          <CardHeader className="pb-4">
            <CardTitle className={`${index === 0 ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} line-clamp-2`}>
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </CardTitle>
            <CardDescription className="text-sm">
              <time dateTime={post.publishedAt}>
                {format(new Date(post.publishedAt), "d 'de' MMMM, yyyy", { locale: es })}
              </time>
            </CardDescription>
          </CardHeader>
          {post.mainImage && (
            <div className={`relative ${index === 0 ? 'h-64 md:h-96' : 'h-48 md:h-56'}`}>
              <Image
                src={urlForImage(post.mainImage).width(index === 0 ? 1200 : 600).height(index === 0 ? 600 : 400).url()}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <CardContent className="flex-grow py-4">
            <p className={`text-muted-foreground ${index === 0 ? 'line-clamp-4' : 'line-clamp-3'}`}>{post.excerpt}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-center pt-4">
            {/* <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <Badge key={category._id} variant="secondary">{category.title}</Badge>
              ))}
            </div> */}
            <Link href={`/blog/${post.slug}`} className="text-primary hover:underline text-sm">
              Leer más
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}