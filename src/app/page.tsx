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
// Import the client component wrapper
import ParallaxSectionWrapper from "@/components/home/ParallaxSectionWrapper";

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

      {/* Category Section */}
      <CategorySection />

      {/* Trending Products Slider */}
      <TrendingProducts products={products} />

      {/* Promotion Banner with Countdown */}
      <PromotionBanner />
    </div>
  );
}
