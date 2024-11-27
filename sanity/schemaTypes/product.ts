import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Producto Floral',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Arreglo',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text'
    }),
    defineField({
      name: 'images',
      title: 'Imágenes',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      type: 'number',
      validation: Rule => Rule.required().positive()
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'category' }]
    }),
    defineField({
      name: 'flowerTypes',
      title: 'Tipos de Flores',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'occasion',
      title: 'Ocasión',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Cumpleaños', value: 'cumpleaños' },
          { title: 'Aniversario', value: 'aniversario' },
          { title: 'Boda', value: 'boda' },
          { title: 'Condolencias', value: 'condolencias' },
          { title: 'Día de la Madre', value: 'dia_madre' },
          { title: 'San Valentín', value: 'san_valentin' },
          { title: 'Graduación', value: 'graduacion' },
          { title: 'Agradecimiento', value: 'agradecimiento' },
          { title: 'Otro', value: 'otro' }
        ],
        layout: 'checkbox'
      }
    }),
    defineField({
      name: 'sizes',
      title: 'Tamaños disponibles',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'size' }] }]
    }),
    defineField({
      name: 'colors',
      title: 'Colores predominantes',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'style',
      title: 'Estilo del Arreglo',
      type: 'string',
      options: {
        list: [
          { title: 'Clásico', value: 'clasico' },
          { title: 'Moderno', value: 'moderno' },
          { title: 'Rústico', value: 'rustico' },
          { title: 'Romántico', value: 'romantico' },
          { title: 'Minimalista', value: 'minimalista' },
          { title: 'Exótico', value: 'exotico' }
        ]
      }
    }),
    defineField({
      name: 'inStock',
      title: 'En Stock',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'seasonality',
      title: 'Temporada',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Primavera', value: 'primavera' },
          { title: 'Verano', value: 'verano' },
          { title: 'Otoño', value: 'otono' },
          { title: 'Invierno', value: 'invierno' },
          { title: 'Todo el año', value: 'todo_el_ano' }
        ],
        layout: 'checkbox'
      }
    }),
    defineField({
      name: 'careInstructions',
      title: 'Instrucciones de Cuidado',
      type: 'text'
    }),
    defineField({
      name: 'deliveryOptions',
      title: 'Opciones de Entrega',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Entrega a domicilio', value: 'domicilio' },
          { title: 'Recogida en tienda', value: 'tienda' },
          { title: 'Envío express', value: 'express' }
        ],
        layout: 'checkbox'
      }
    })
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images.0'
    }
  }
})