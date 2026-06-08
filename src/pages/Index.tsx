import { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LaunchSection from "@/components/LaunchSection";
import StoreSection from "@/components/StoreSection";
import ChatBox from "@/components/ChatBox";
import TechBackground from "@/components/TechBackground";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import SectionAura from "@/components/SectionAura";
import AdSlot from "@/components/AdSlot";
import StickyDonate from "@/components/StickyDonate";
import { 
  LazyHeroSection, 
  LazyAboutSection, 
  LazyCertificationsSection, 
  LazyServicesSection, 
  LazyFeedbackSection, 
  LazyContactSection,
  SectionSkeleton 
} from "@/components/PerformanceOptimizer";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";

const Index = () => {
  // Track visitor analytics
  useVisitorTracking();
  return (
    <div className="min-h-screen relative">
      <Helmet>
        <title>Matrix Minds — AI & Cybersecurity by S. Hareedh</title>
        <meta name="description" content="Matrix Minds delivers AI, machine learning, data science and ethical-hacking solutions worldwide. Founded by S. Hareedh. Book a free consultation today." />
        <link rel="canonical" href="https://matrixminds.lovable.app/" />
        <meta property="og:title" content="Matrix Minds — AI & Cybersecurity by S. Hareedh" />
        <meta property="og:description" content="AI, ML, data science and ethical-hacking solutions worldwide. Founded by S. Hareedh." />
        <meta property="og:url" content="https://matrixminds.lovable.app/" />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* Animated tech background */}
      <TechBackground />
      
      {/* Tech grid overlay */}
      <div className="fixed inset-0 tech-grid pointer-events-none z-10" />
      
      {/* Scan line effect */}
      <div className="fixed w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30 animate-scan-line z-20 pointer-events-none" />
      
      {/* Main content with proper z-index */}
      <div className="relative z-30">
        <Header />
        <main className="gpu-accelerate">
          <Suspense fallback={<SectionSkeleton />}>
            <LazyHeroSection />
          </Suspense>
          <AdSlot label="Sponsored" />
          <Suspense fallback={<SectionSkeleton />}>
            <LazyAboutSection />
          </Suspense>
          <LaunchSection />
          <StoreSection />
          <Suspense fallback={<SectionSkeleton />}>
            <LazyCertificationsSection />
          </Suspense>
          <AdSlot label="Advertisement" />
          <Suspense fallback={<SectionSkeleton />}>
            <LazyServicesSection />
          </Suspense>
          <AdSlot label="Sponsored" />
          <Suspense fallback={<SectionSkeleton />}>
            <LazyFeedbackSection />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <LazyContactSection />
          </Suspense>
        </main>
        <Footer />
        <ChatBox />
        <StickyDonate />
      </div>
    </div>
  );
};

export default Index;