import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types/sanity";
import { urlForImage } from "@/lib/sanity.image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface CategoriesSectionProps {
  categories: Category[]
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="py-16 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Nuestras Categorías
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category._id} className="overflow-hidden">
              <CardContent className="p-0">
                {category.imageUrl && (
                  <Image
                    priority={true}
                    src={urlForImage(category.imageUrl)
                      .width(300)
                      .height(200)
                      .url()}
                    alt={category.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover "
                  />
                )}
              </CardContent>
              <CardFooter className="p-4">
                <Link
                  href={`/shop?category=${category.slug}`}
                  className="text-lg font-semibold hover:underline text-center text-primary"
                >
                  <p className="text-primary">
                    {category.title}
                    </p>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
