import Shell from "@/components/Shell";
import Hero from "@/components/Hero";
import { Stats, Experience, Projects, Skills, Education, Contact } from "@/components/Sections";

export default function Home() {
  return (
    <Shell>
      <main>
        <Hero />
        <Stats />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
    </Shell>
  );
}
