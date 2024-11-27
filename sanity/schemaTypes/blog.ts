import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blog',
  title: 'Entrada de Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'aboutMe' }]
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'categories',
      title: 'Categorías',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime'
    }),
    defineField({
      name: 'body',
      title: 'Contenido',
      type: 'blockContent'
    }),
    defineField({
      name: 'excerpt',
      title: 'Extracto',
      type: 'text',
      description: 'Breve resumen del post para mostrar en listados'
    }),
    defineField({
      name: 'tags',
      title: 'Etiquetas',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Posts Relacionados',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'blog' } }]
    }),
    defineField({
      name: 'socialShare',
      title: 'Compartir en Redes Sociales',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook', type: 'boolean' },
        { name: 'twitter', title: 'Twitter', type: 'boolean' },
        { name: 'pinterest', title: 'Pinterest', type: 'boolean' },
        { name: 'instagram', title: 'Instagram', type: 'boolean' }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage'
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    }
  }
})