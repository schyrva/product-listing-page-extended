import { API } from "@/lib/api";
import dynamic from "next/dynamic";

// Dynamically import components to improve initial load performance
const HeroSection = dynamic(() => import("@/components/home/HeroSection"), {
  ssr: true,
});
const CategorySection = dynamic(
  () => import("@/components/home/CategorySection"),
  { ssr: true }
);
const TrendingProducts = dynamic(
  () => import("@/components/home/TrendingProducts"),
  { ssr: true }
);
const PromotionBanner = dynamic(
  () => import("@/components/home/PromotionBanner"),
  { ssr: true }
);
const AnimatedFeatures = dynamic(
  () => import("@/components/home/AnimatedFeatures"),
  { ssr: true }
);
const StatsSection = dynamic(() => import("@/components/home/StatsSection"), {
  ssr: true,
});
const TestimonialsSection = dynamic(
  () => import("@/components/home/TestimonialsSection"),
  { ssr: true }
);

// Import the client component wrappers
import ParallaxSectionWrapper from "@/components/home/ParallaxSectionWrapper";
import FloatingNotificationWrapper from "@/components/home/FloatingNotificationWrapper";

export default async function HomePage() {
  const response = await fetch(API.getProducts(), {
    next: { revalidate: 3600 },
  });
  const products = await response.json();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <HeroSection />

      {/* Parallax Text */}
      <ParallaxSectionWrapper />

      {/* Animated Features Section */}
      <AnimatedFeatures />

      {/* Category Section */}
      <CategorySection />

      {/* Stats Section */}
      <StatsSection />

      {/* Trending Products Slider */}
      <TrendingProducts products={products} />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Promotion Banner with Countdown */}
      <PromotionBanner />

      {/* Floating Notification */}
      <FloatingNotificationWrapper />
    </div>
  );
}
