'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home, RefreshCw } from 'lucide-react';

export default function NotFound() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const numberVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.2,
      },
    },
  };

  const gearVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 10,
        ease: 'linear',
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-[80vh] flex flex-col items-center justify-center">
      <motion.div
        className="text-center max-w-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative mb-8 flex items-center justify-center">
          <motion.div
            className="text-8xl md:text-9xl font-bold text-primary"
            variants={numberVariants}
            initial="initial"
            animate="animate"
          >
            404
          </motion.div>

          <motion.div
            className="absolute"
            variants={gearVariants}
            initial="initial"
            animate="animate"
          >
            <RefreshCw className="w-20 h-20 text-muted-foreground opacity-10" />
          </motion.div>
        </div>

        <motion.h1 className="text-3xl md:text-4xl font-bold mb-4" variants={itemVariants}>
          Oops! Page Not Found
        </motion.h1>

        <motion.p className="text-lg text-muted-foreground mb-8" variants={itemVariants}>
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or
          you&apos;ve mistyped the URL.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link href="/">
            <Button size="lg" className="gap-2">
              <Home className="h-5 w-5" />
              Return to Home
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
