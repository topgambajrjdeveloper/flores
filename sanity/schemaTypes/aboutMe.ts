import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutMe',
  title: 'Sobre Mí',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string'
    }),
    defineField({
      name: 'profileImage',
      title: 'Imagen de Perfil',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'bio',
      title: 'Biografía',
      type: 'array',
      of: [{ type: 'block' }]
    }),
    defineField({
      name: 'specialties',
      title: 'Especialidades',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'experience',
      title: 'Años de Experiencia',
      type: 'number',
      validation: Rule => Rule.min(0).max(100)
    }),
    defineField({
      name: 'education',
      title: 'Educación',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'degree', title: 'Título', type: 'string' }),
            defineField({ name: 'institution', title: 'Institución', type: 'string' }),
            defineField({ name: 'year', title: 'Año', type: 'number' })
          ]
        }
      ]
    }),
    defineField({
      name: 'awards',
      title: 'Premios y Reconocimientos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Título', type: 'string' }),
            defineField({ name: 'year', title: 'Año', type: 'number' }),
            defineField({ name: 'description', title: 'Descripción', type: 'text' })
          ]
        }
      ]
    }),
    defineField({
      name: 'socialMedia',
      title: 'Redes Sociales',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'twitter', title: 'Twitter', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
        defineField({ name: 'pinterest', title: 'Pinterest', type: 'url' })
      ]
    }),
    defineField({
      name: 'contactInfo',
      title: 'Información de Contacto',
      type: 'object',
      fields: [
        defineField({ name: 'email', title: 'Email', type: 'string' }),
        defineField({ name: 'phone', title: 'Teléfono', type: 'string' })
      ]
    })
  ]
})