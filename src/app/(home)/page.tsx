import About from '@/components/About';
import Contact from '@/components/Contact';
import Experience from '@/components/Experience';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import { getPortfolioContent } from '@/data/portfolioContent';

export default async function Home() {
  const { about, experiences, projects } = await getPortfolioContent();

  return (
    <>
      <Hero />
      <About data={about} />
      <Experience data={experiences} />
      <Projects data={projects} />
      <Contact />
    </>
  );
}
