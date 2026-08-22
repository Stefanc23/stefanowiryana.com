import type { Metadata } from 'next';

import Projects from '@/components/Projects';
import { getProjectSummaries } from '@/data/projectContent';

export const metadata: Metadata = {
  title: 'Projects preview',
  description: 'Preview of the Sanity-backed project case-study system.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DevProjectsPage() {
  const projects = await getProjectSummaries();

  return (
    <div className="pt-4 sm:pt-8">
      <Projects data={projects} />
    </div>
  );
}
