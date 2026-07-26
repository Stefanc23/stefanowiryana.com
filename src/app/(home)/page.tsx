import About from '@/components/About';
import Contact from '@/components/Contact';
import Experience from '@/components/Experience';
import Expertise from '@/components/Expertise';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import { getPortfolioContent } from '@/data/portfolioContent';

export default async function Home() {
  const { experiences, projects } = await getPortfolioContent();

  return (
    <>
      <Hero />
      <About />
      <Expertise />
      <Experience data={experiences} />
      <Projects data={projects} />
      <Contact />
    </>
  );
}
