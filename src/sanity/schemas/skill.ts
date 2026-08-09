import { defineField, defineType } from 'sanity';

const skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'object',
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
          { title: 'Programming Languages', value: 'Programming Languages' },
          { title: 'Frameworks & Libraries', value: 'Frameworks & Libraries' },
          {
            title: 'Databases & Other Tools',
            value: 'Databases & Other Tools',
          },
          { title: 'Security', value: 'Security' },
          { title: 'Solution Engineering', value: 'Solution Engineering' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      subtitle: 'category',
      title: 'name',
    },
  },
});

export default skill;
