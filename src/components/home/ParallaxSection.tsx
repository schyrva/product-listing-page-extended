"use client";

import ParallaxText from "./ParallaxText";

export default function ParallaxSection() {
  return (
    <section className="py-8 bg-muted/40">
      <div className="overflow-hidden">
        <ParallaxText baseVelocity={-2}>Shop the latest trends</ParallaxText>
        <ParallaxText baseVelocity={2}>Premium quality products</ParallaxText>
      </div>
    </section>
  );
}
