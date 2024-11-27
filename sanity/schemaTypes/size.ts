import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'size',
  title: 'Tamaño',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text'
    })
  ]
})