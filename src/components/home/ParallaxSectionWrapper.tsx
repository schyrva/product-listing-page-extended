"use client";

import dynamic from "next/dynamic";

// Import the ParallaxSection with client-side only rendering
const ParallaxSection = dynamic(() => import("./ParallaxSection"), {
  ssr: false,
});

export default function ParallaxSectionWrapper() {
  return <ParallaxSection />;
}
