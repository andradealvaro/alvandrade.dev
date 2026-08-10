import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SocialSidebar } from "@/components/social-sidebar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";

export default function Home() {
  return (
    <>
      <Header />
      <SocialSidebar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
      </main>
      <Footer />
    </>
  );
}
