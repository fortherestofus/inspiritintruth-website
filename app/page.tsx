import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import Journey from "@/components/sections/Journey";
import Inside from "@/components/sections/Inside";
import HowMade from "@/components/sections/HowMade";
import Vision from "@/components/sections/Vision";
import Give from "@/components/sections/Give";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";
import Closing from "@/components/sections/Closing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Journey />
        <Inside />
        <HowMade />
        <Vision />
        <Give />
        <Pricing />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
