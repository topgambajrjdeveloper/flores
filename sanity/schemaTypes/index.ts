import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import category from './category'
import size from './size'
import blog from './blog'
import blockContent from './blockContent'
import aboutMe from './aboutMe'
import heroImages from './heroImages'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, size, blog, blockContent, aboutMe, heroImages],
}



