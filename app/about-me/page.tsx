
import { AboutMe } from '@/types/sanity'
import { client } from '@/lib/sanity.client'
import AboutMeContent from './about-me-content'

async function getAboutMeData(): Promise<AboutMe | null> {
  return client.fetch(`
    *[_type == "aboutMe"][0] {
      name,
      profileImage,
      bio,
      specialties,
      experience,
      education,
      awards,
      socialMedia,
      contactInfo
    }
  `)
}

export default async function AboutPage() {
  const aboutData = await getAboutMeData()

  return <AboutMeContent aboutData={aboutData} />
}