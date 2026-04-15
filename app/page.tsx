"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import StatsBar from "@/components/landing/StatsBar";
import Features from "@/components/landing/Features";
import StagesRow from "@/components/landing/StagesRow";
import HowItWorks from "@/components/landing/HowItWorks";
import CTASection from "@/components/landing/CTASection";

import { c, globalStyles } from "@/lib/theme";

export default function LandingPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div
        className="min-h-screen font-sans selection:bg-indigo-500/30 overflow-x-hidden"
        style={{ background: c.bg0, color: c.t1 }}
      >
        <Navbar />
        <Hero />
        <Features />
        <StagesRow />
        <HowItWorks />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}
