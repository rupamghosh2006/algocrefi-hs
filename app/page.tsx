"use client";
import { useState } from "react";
import ParticleCanvas from "@/components/ParticleCanvas";
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
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Fixed particle constellation canvas — sits behind everything */}
      <ParticleCanvas />

      {/* Full-screen entry loader */}
      <Loader onDone={() => setLoaded(true)} />

      {/* Custom lerp cursor */}
      <Cursor />

      {/* Page content — fades in after loader exits */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
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
