'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import { Package, ShoppingBag, Star, Users } from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';

export default function StatsSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.01,
  });

  const y = useTransform(smoothProgress, [0, 1], [100, -100]);
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0.5]);

  const stats = [
    {
      value: 5000,
      title: 'Happy Customers',
      icon: <Users className="w-8 h-8 text-primary" />,
      delay: 0.2,
    },
    {
      value: 10000,
      title: 'Products Sold',
      icon: <ShoppingBag className="w-8 h-8 text-primary" />,
      delay: 0.4,
    },
    {
      value: 2500,
      title: 'Products Available',
      icon: <Package className="w-8 h-8 text-primary" />,
      delay: 0.6,
    },
    {
      value: 4.8,
      title: 'Average Rating',
      icon: <Star className="w-8 h-8 text-primary" />,
      delay: 0.8,
      withDecimal: true,
    },
  ];

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const statCardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.8,
      rotateX: 45,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="py-16 border-y border-muted overflow-hidden relative"
      style={{ opacity, position: 'relative' }}
    >
      <motion.div className="container mx-auto px-4" style={{ y }}>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
            <motion.span
              className="absolute -left-4 -right-4 h-3 bg-primary/10 bottom-2 -z-10 rounded"
              initial={{ width: 0 }}
              whileInView={{ width: '116%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            Our Success by the Numbers
          </h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow perspective-[800px]"
              variants={statCardVariants}
            >
              <motion.div
                className="mb-4 bg-primary/10 p-4 rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  delay: stat.delay,
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -10, 10, 0],
                  backgroundColor: 'hsl(var(--primary))',
                  color: 'white',
                  transition: { type: 'tween', duration: 0.6 },
                }}
              >
                {stat.icon}
              </motion.div>
              <AnimatedCounter value={stat.value} title={stat.title} delay={stat.delay} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="relative mt-16 pt-16 border-t border-muted flex flex-col items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, type: 'spring' }}
          >
            Join thousands of satisfied customers
          </motion.div>
          <div className="flex space-x-4 items-center mb-6">
            {[1, 2, 3, 4, 5].map(star => (
              <motion.div
                key={star}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 + star * 0.1, type: 'spring' }}
              >
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </motion.div>
            ))}
            <motion.p
              className="text-muted-foreground ml-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2 }}
            >
              Average customer rating: 4.8/5
            </motion.p>
          </div>

          <motion.blockquote
            className="text-center max-w-2xl italic text-muted-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 2.2 }}
          >
            &ldquo;Shopping with NextCart transformed my online shopping experience. Their product
            quality and customer service are unmatched in the industry!&rdquo;
            <footer className="text-sm font-medium mt-2 text-foreground">
              — Emma Thompson, Verified Customer
            </footer>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2.4, type: 'spring' }}
          >
            <Link href="/products">
              <motion.button
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Shopping Today
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
