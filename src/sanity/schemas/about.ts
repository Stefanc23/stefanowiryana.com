import { defineField, defineType } from 'sanity';

const heroEvidenceField = defineField({
  name: 'evidence',
  title: 'Evidence',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        defineField({
          name: 'value',
          title: 'Value',
          type: 'string',
          validation: (Rule) => Rule.required().max(32),
        }),
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          validation: (Rule) => Rule.required().max(64),
        }),
      ],
      preview: {
        select: { subtitle: 'label', title: 'value' },
      },
    },
  ],
  validation: (Rule) => Rule.max(2),
});

const heroTagsField = defineField({
  name: 'tags',
  title: 'Related Skills',
  type: 'array',
  of: [{ type: 'string' }],
  validation: (Rule) => Rule.max(8).unique(),
});

const heroDetailFields = [
  defineField({
    name: 'category',
    title: 'Category',
    type: 'string',
    validation: (Rule) => Rule.required().max(48),
  }),
  defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
    validation: (Rule) => Rule.required().max(64),
  }),
  defineField({
    name: 'subtitle',
    title: 'Diagram Subtitle',
    type: 'string',
    validation: (Rule) => Rule.required().max(48),
  }),
  defineField({
    name: 'body',
    title: 'Detail Body',
    type: 'text',
    rows: 5,
    validation: (Rule) => Rule.required().min(80).max(520),
  }),
  heroEvidenceField,
  heroTagsField,
];

const heroNodeSlots = [
  { title: 'Inner — North', value: 'inner-north' },
  { title: 'Inner — East', value: 'inner-east' },
  { title: 'Inner — South', value: 'inner-south' },
  { title: 'Inner — West', value: 'inner-west' },
  { title: 'Outer — Northwest', value: 'outer-northwest' },
  { title: 'Outer — Northeast', value: 'outer-northeast' },
  { title: 'Outer — Southeast', value: 'outer-southeast' },
  { title: 'Outer — Southwest', value: 'outer-southwest' },
];

const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: (Rule) => Rule.required().max(90),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 8,
      validation: (Rule) => Rule.required().min(80),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'resumeFile',
      title: 'Resume File',
      type: 'file',
      options: { accept: '.pdf' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'skill' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'hero',
      title: 'Interactive Hero',
      type: 'object',
      description:
        'Optional. The public site uses reviewed local defaults until this complete object is published.',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          validation: (Rule) => Rule.required().max(90),
        }),
        defineField({
          name: 'headlineLead',
          title: 'Headline — First Line',
          type: 'string',
          validation: (Rule) => Rule.required().max(56),
        }),
        defineField({
          name: 'headlineAccent',
          title: 'Headline — Accent Line',
          type: 'string',
          validation: (Rule) => Rule.required().max(56),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4,
          validation: (Rule) => Rule.required().min(90).max(320),
        }),
        defineField({
          name: 'primaryCtaLabel',
          title: 'Primary CTA Label',
          type: 'string',
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: 'secondaryCtaLabel',
          title: 'Secondary CTA Label',
          type: 'string',
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: 'overview',
          title: 'Center Overview',
          type: 'object',
          fields: heroDetailFields,
        }),
        defineField({
          name: 'nodes',
          title: 'Capability Nodes',
          type: 'array',
          description:
            'Provide one node for each of the eight fixed diagram slots.',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'slot',
                  title: 'Diagram Slot',
                  type: 'string',
                  options: { list: heroNodeSlots },
                  validation: (Rule) => Rule.required(),
                }),
                ...heroDetailFields,
              ],
              preview: {
                select: { subtitle: 'slot', title: 'title' },
              },
            },
          ],
          validation: (Rule) =>
            Rule.required()
              .length(8)
              .custom((nodes) => {
                const slots = (nodes as Array<{ slot?: string }> | undefined)
                  ?.map((node) => node.slot)
                  .filter(Boolean);

                return slots && new Set(slots).size === slots.length
                  ? true
                  : 'Each capability node must use a unique diagram slot.';
              }),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      media: 'profileImage',
      subtitle: 'tagline',
      title: 'displayName',
    },
  },
});

export default about;
