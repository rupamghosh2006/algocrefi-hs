import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BentoGrid from "@/components/BentoGrid";
import HowItWorks from "@/components/HowItWorks";
import AuraSection from "@/components/AuraSection";
import StatsTicker from "@/components/StatsTicker";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Page loader — animates out after 1.2s */}
      <Loader />

      {/* Custom lerp cursor */}
      <Cursor />

      {/* All visible content — fades in after loader exits */}
      <div id="page-content">
        <Navbar />

        <main>
          <HeroSection />
          <BentoGrid />
          <HowItWorks />
          <AuraSection />
          <StatsTicker />
        </main>

        <Footer />
      </div>
    </>
  );
}
