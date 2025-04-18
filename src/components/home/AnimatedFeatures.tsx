'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShieldCheck, Truck, CreditCard, RotateCcw, HeadphonesIcon } from 'lucide-react';
import { useState, ReactNode, CSSProperties } from 'react';

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <ShieldCheck className="w-10 h-10" />,
    title: 'Secure Shopping',
    description: 'All transactions are protected with advanced encryption',
  },
  {
    icon: <Truck className="w-10 h-10" />,
    title: 'Fast Delivery',
    description: 'Get your products delivered within 2-3 business days',
  },
  {
    icon: <CreditCard className="w-10 h-10" />,
    title: 'Easy Payments',
    description: 'Multiple payment options available for your convenience',
  },
  {
    icon: <RotateCcw className="w-10 h-10" />,
    title: 'Easy Returns',
    description: '30-day money-back guarantee for all purchases',
  },
  {
    icon: <HeadphonesIcon className="w-10 h-10" />,
    title: '24/7 Support',
    description: 'Our customer service team is always ready to help',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(springY, [-100, 100], [10, -10]);
  const rotateY = useTransform(springX, [-100, 100], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!hovered) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = (rect.left + rect.right) / 2;
    const centerY = (rect.top + rect.bottom) / 2;

    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      key={index}
      className="bg-card rounded-lg p-6 shadow-sm transition-shadow flex flex-col items-center text-center perspective-[1000px]"
      variants={itemVariants}
      style={{
        rotateX: hovered ? rotateX : 0,
        rotateY: hovered ? rotateY : 0,
        z: hovered ? 50 : 0,
        boxShadow: hovered
          ? '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
          : '',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.02,
        transition: {
          type: 'tween',
          duration: 0.3,
        },
      }}
    >
      <motion.div
        className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 relative overflow-hidden"
        whileHover={{
          scale: 1.1,
          backgroundColor: 'rgba(var(--primary-rgb), 1)',
          color: 'rgb(250, 250, 250)',
        }}
        transition={{ type: 'tween', duration: 0.3 }}
        style={
          {
            '--primary-rgb': '94, 53, 177',
          } as CSSProperties
        }
      >
        {feature.icon}
        <motion.div
          className="absolute inset-0 bg-primary/10 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            hovered
              ? {
                  scale: [0, 1.5, 1],
                  opacity: [0, 0.5, 0],
                  transition: {
                    duration: 1.5,
                    times: [0, 0.5, 1],
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    ease: 'easeInOut',
                  },
                }
              : {}
          }
        />
      </motion.div>
      <motion.h3
        className="text-xl font-semibold mb-2"
        animate={hovered ? { scale: 1.05, color: 'rgb(94, 53, 177)' } : {}}
      >
        {feature.title}
      </motion.h3>
      <p className="text-muted-foreground">{feature.description}</p>
    </motion.div>
  );
}

export default function AnimatedFeatures() {
  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us</h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            We strive to provide the best shopping experience for our customers
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
