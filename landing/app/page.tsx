import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Calculator from "@/components/Calculator";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-div-black text-div-cream">

      <CustomCursor />

      <Navbar />

      <Hero />

      <Intro />

      <Services />

      <Projects />

      <Process />

      <WhyUs />

      <Calculator />

      <Contact />

      <Footer />

      <div className="noise" />

    </main>
  );
}