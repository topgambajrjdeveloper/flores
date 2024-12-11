import createImageUrlBuilder from '@sanity/image-url'
import { client } from './sanity.client'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlForImage = (source: any) => createImageUrlBuilder(client).image(source)