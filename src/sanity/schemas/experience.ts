const experience = {
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      required: true,
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
      required: true,
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      required: true,
    },
    {
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full Time', value: 'Full Time' },
          { title: 'Part Time', value: 'Part Time' },
          { title: 'Contract', value: 'Contract' },
          { title: 'Internship', value: 'Internship' },
          { title: 'Freelance', value: 'Freelance' },
        ],
      },
      required: true,
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      required: true,
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'Optional concise summary used by the portfolio timeline.',
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'focusAreas',
      title: 'Focus Areas',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};

export default experience;
