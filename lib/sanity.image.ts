import createImageUrlBuilder from '@sanity/image-url'
import { client } from './sanity.client'

export const urlForImage = (source: any) => createImageUrlBuilder(client).image(source)