import { defineField, defineType } from 'sanity';

const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Web', value: 'Web' },
          { title: 'Security', value: 'Security' },
          { title: 'Cloud', value: 'Cloud' },
          { title: 'Product', value: 'Product' },
          { title: 'Mobile', value: 'Mobile' },
          { title: 'Other', value: 'Other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this project before the rest of the selected work.',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first within the featured group.',
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: 'projectDate',
      title: 'Project Date',
      type: 'date',
      description: 'Use the most relevant completion or publication date.',
    }),
    defineField({
      name: 'responsibility',
      title: 'Responsibility',
      type: 'string',
      description: 'Your specific contribution to this work.',
      validation: (Rule) => Rule.max(140),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'impact',
      title: 'Impact',
      type: 'text',
      rows: 3,
      description: 'A concise outcome or reason this project matters.',
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'repoLink',
      title: 'Repository Link',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'demoLink',
      title: 'Demo Link',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: {
      media: 'image',
      subtitle: 'category',
      title: 'name',
    },
  },
});

export default project;
