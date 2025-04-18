'use client';

import dynamic from 'next/dynamic';

const ParallaxSection = dynamic(() => import('./ParallaxSection'), {
  ssr: false,
});

export default function ParallaxSectionWrapper() {
  return <ParallaxSection />;
}
