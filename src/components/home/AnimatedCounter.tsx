'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  title: string;
  duration?: number;
  delay?: number;
}

export default function AnimatedCounter({
  value,
  title,
  duration = 2,
  delay = 0.2,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const step = Math.ceil(value / 60);
      const timer = setInterval(
        () => {
          start += step;
          if (start > value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        },
        (duration * 1000) / 60
      );

      controls.start('visible');

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration, controls]);

  return (
    <motion.div
      ref={ref}
      className="text-center p-6"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        className="text-4xl md:text-5xl font-bold text-primary"
        initial={{ scale: 0.5 }}
        animate={isInView ? { scale: 1 } : { scale: 0.5 }}
        transition={{ type: 'spring', stiffness: 100, delay: delay + 0.3 }}
      >
        {count}
        <span className="text-2xl">+</span>
      </motion.div>
      <motion.p
        className="text-muted-foreground mt-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: delay + 0.5 }}
      >
        {title}
      </motion.p>
    </motion.div>
  );
}
