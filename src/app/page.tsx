import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Publications from "@/components/Publications";
import Education from "@/components/Education";
import AMABot from "@/components/AMABot";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="h-px bg-border" />
        <Experience />
        <div className="h-px bg-border" />
        <Projects />
        <Skills />
        <Publications />
        <Education />
        <Footer />
      </main>
      <AMABot />
    </>
  );
}
