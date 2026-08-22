import About from '@/components/About';
import Contact from '@/components/Contact';
import Experience from '@/components/Experience';
import Hero from '@/components/Hero';
import ProjectsWip from '@/components/ProjectsWip';
import { getPortfolioContent } from '@/data/portfolioContent';

export default async function Home() {
  const { about, experiences, hero } = await getPortfolioContent();

  return (
    <>
      <Hero data={hero} />
      <About data={about} />
      <Experience data={experiences} />
      <ProjectsWip />
      <Contact />
    </>
  );
}
