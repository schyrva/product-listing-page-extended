import { API } from '@/lib/api';
import dynamic from 'next/dynamic';

const HeroSection = dynamic(() => import('@/components/home/HeroSection'), {
  ssr: true,
});
const CategorySection = dynamic(() => import('@/components/home/CategorySection'), { ssr: true });
const TrendingProducts = dynamic(() => import('@/components/home/TrendingProducts'), { ssr: true });
const PromotionBanner = dynamic(() => import('@/components/home/PromotionBanner'), { ssr: true });
const AnimatedFeatures = dynamic(() => import('@/components/home/AnimatedFeatures'), { ssr: true });
const StatsSection = dynamic(() => import('@/components/home/StatsSection'), {
  ssr: true,
});
const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection'), {
  ssr: true,
});

import ParallaxSectionWrapper from '@/components/home/ParallaxSectionWrapper';
import FloatingNotificationWrapper from '@/components/home/FloatingNotificationWrapper';

export default async function HomePage() {
  let products = [];

  try {
    const response = await fetch(API.getProducts(), {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      products = await response.json();
    } else {
      throw new Error('Received non-JSON response from API');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return empty products array rather than failing the build
  }

  return (
    <div className="min-h-screen">
      <HeroSection />

      <ParallaxSectionWrapper />

      <AnimatedFeatures />

      <CategorySection />

      <StatsSection />

      <TrendingProducts products={products} />

      <TestimonialsSection />

      <PromotionBanner />

      <FloatingNotificationWrapper />
    </div>
  );
}
