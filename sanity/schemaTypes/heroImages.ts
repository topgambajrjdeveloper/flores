import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'heroImage',
  title: 'Hero Images',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Titúlo',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text'
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true
      }
    })
  ]
})