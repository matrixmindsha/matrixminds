import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBox from "@/components/ChatBox";
import TechBackground from "@/components/TechBackground";
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
          <Suspense fallback={<SectionSkeleton />}>
            <LazyAboutSection />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <LazyCertificationsSection />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <LazyServicesSection />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <LazyFeedbackSection />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <LazyContactSection />
          </Suspense>
        </main>
        <Footer />
        <ChatBox />
      </div>
    </div>
  );
};

export default Index;