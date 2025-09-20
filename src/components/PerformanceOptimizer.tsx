import { memo, lazy, Suspense, useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load heavy components for better performance
export const LazyHeroSection = lazy(() => import('@/components/HeroSection'));
export const LazyAboutSection = lazy(() => import('@/components/AboutSection'));
export const LazyCertificationsSection = lazy(() => import('@/components/CertificationsSection'));
export const LazyServicesSection = lazy(() => import('@/components/ServicesSection'));
export const LazyFeedbackSection = lazy(() => import('@/components/FeedbackSection'));
export const LazyContactSection = lazy(() => import('@/components/ContactSection'));

// Loading skeleton for sections
export const SectionSkeleton = memo(() => (
  <div className="py-20 px-4">
    <div className="container mx-auto">
      <Skeleton className="h-12 w-64 mx-auto mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  </div>
));

SectionSkeleton.displayName = 'SectionSkeleton';

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1, ...options }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [ref, options]);

  return isIntersecting;
};