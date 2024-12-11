"use client";

import Image from "next/image";
import { AboutMe } from "@/types/sanity";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { urlForImage } from "@/lib/sanity.image";
import { PortableText } from "@portabletext/react";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  PinIcon as Pinterest,
  Mail,
  Phone,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AboutMeContentProps {
  aboutData: AboutMe | null;
}

export default function AboutMeContent({ aboutData }: AboutMeContentProps) {
  if (!aboutData) {
    return (
      <div className="container mx-auto px-4 py-16">
        No se encontró información.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {aboutData.profileImage && (
              <Image
                priority={true}
                src={urlForImage(aboutData.profileImage)
                  .width(300)
                  .height(300)
                  .url()}
                alt={aboutData.name}
                width={300}
                height={300}
                className="rounded-full"
              />
            )}
            <div>
              <CardTitle className="text-4xl mb-4">{aboutData.name}</CardTitle>
              <CardDescription className="text-xl">
                Florista Profesional
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <PortableText value={aboutData.bio} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {aboutData.specialties && aboutData.specialties.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Especialidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {aboutData.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {aboutData.experience && (
          <Card>
            <CardHeader>
              <CardTitle>Experiencia</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{aboutData.experience} años de experiencia en florería</p>
            </CardContent>
          </Card>
        )}

        {aboutData.education && aboutData.education.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Educación</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                {aboutData.education.map((edu, index) => (
                  <li key={index}>
                    {edu.degree} - {edu.institution}, {edu.year}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {aboutData.awards && aboutData.awards.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Premios y Reconocimientos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                {aboutData.awards.map((award, index) => (
                  <li key={index}>
                    <strong>{award.title}</strong> ({award.year})
                    <p>{award.description}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Contacto y Redes Sociales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {aboutData.socialMedia?.facebook && (
              <Button variant="outline" size="icon" asChild>
                <a
                  href={aboutData.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
            )}
            {aboutData.socialMedia?.instagram && (
              <Button variant="outline" size="icon" asChild>
                <a
                  href={aboutData.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
            )}
            {aboutData.socialMedia?.twitter && (
              <Button variant="outline" size="icon" asChild>
                <a
                  href={aboutData.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
            )}
            {aboutData.socialMedia?.linkedin && (
              <Button variant="outline" size="icon" asChild>
                <a
                  href={aboutData.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            )}
            {aboutData.socialMedia?.pinterest && (
              <Button variant="outline" size="icon" asChild>
                <a
                  href={aboutData.socialMedia.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pinterest"
                >
                  <Pinterest className="h-5 w-5" />
                </a>
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          {aboutData.contactInfo?.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <a
                href={`mailto:${aboutData.contactInfo.email}`}
                className="hover:underline"
              >
                {aboutData.contactInfo.email}
              </a>
            </div>
          )}
          {aboutData.contactInfo?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <a
                href={`tel:${aboutData.contactInfo.phone}`}
                className="hover:underline"
              >
                {aboutData.contactInfo.phone}
              </a>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
