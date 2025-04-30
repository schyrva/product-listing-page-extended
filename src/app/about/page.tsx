'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Quote } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  const [activeValue, setActiveValue] = useState(0);

  const values = [
    {
      title: 'Quality First',
      description:
        'We never compromise on quality. Every product in our catalog is carefully selected to meet the highest standards.',
      icon: '/icons/quality.svg',
    },
    {
      title: 'Customer Obsession',
      description:
        'Our customers are at the heart of everything we do. We continuously listen, learn, and innovate to exceed expectations.',
      icon: '/icons/customer.svg',
    },
    {
      title: 'Sustainability',
      description:
        "We're committed to reducing our environmental impact through responsible sourcing and eco-friendly practices.",
      icon: '/icons/eco.svg',
    },
    {
      title: 'Innovation',
      description:
        'We embrace change and constantly seek new ways to improve our products and services.',
      icon: '/icons/innovation.svg',
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const fadeInUpVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 12 },
    },
  };

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-r from-primary/10 to-accent/5 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="pattern"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <rect x="20" y="20" width="1" height="1" className="fill-primary" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 className="text-4xl md:text-6xl font-bold mb-6" variants={itemVariants}>
              About{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                NextCart
              </span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-10"
              variants={itemVariants}
            >
              Redefining online shopping with quality products, exceptional service, and intuitive
              experiences.
            </motion.p>
            <motion.div
              className="relative h-1 w-24 bg-primary/50 mx-auto rounded-full overflow-hidden mb-8"
              variants={itemVariants}
            >
              <motion.div
                className="absolute inset-0 bg-primary"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInUpVariants}
              className="relative"
            >
              <div className="absolute -left-5 -top-5 w-32 h-32 bg-primary/10 rounded-full -z-10" />
              <div className="aspect-square max-w-md relative rounded-2xl overflow-hidden border border-border shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="NextCart founding team"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                  className="object-cover"
                />
              </div>
              <div className="absolute -right-5 -bottom-5 w-24 h-24 bg-accent/20 rounded-full -z-10" />
            </motion.div>

            <motion.div
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold mb-2">Our Story</h2>
                <div className="h-1 w-20 bg-primary rounded mb-6" />
              </motion.div>
              <motion.p variants={itemVariants} className="text-muted-foreground">
                Founded in 2022, NextCart began with a simple mission: to create an online shopping
                experience that prioritizes quality, design, and customer satisfaction.
              </motion.p>
              <motion.p variants={itemVariants}>
                What started as a small catalog of carefully selected products has evolved into a
                comprehensive e-commerce platform offering thousands of items across multiple
                categories. Throughout our growth, we&apos;ve maintained our commitment to quality
                and customer experience.
              </motion.p>
              <motion.p variants={itemVariants}>
                Today, NextCart serves customers worldwide, connecting them with products that
                enhance their lives while maintaining our founding principles of excellence and
                innovation.
              </motion.p>
              <motion.blockquote
                variants={itemVariants}
                className="border-l-4 border-primary pl-4 my-6 italic text-muted-foreground"
              >
                &quot;We don&apos;t just sell products; we curate experiences that bring joy and
                value to our customers&apos; lives.&quot;
                <footer className="text-sm font-medium mt-2 text-foreground">
                  — Emma Richards, Founder
                </footer>
              </motion.blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 className="text-3xl font-bold mb-6" variants={itemVariants}>
              Our Mission & Vision
            </motion.h2>
            <motion.div
              className="h-1 w-20 bg-primary rounded-full mx-auto mb-6"
              variants={itemVariants}
            />
            <motion.p className="text-lg text-muted-foreground" variants={itemVariants}>
              Driving the future of e-commerce through innovation and excellence
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              className="bg-card shadow-lg rounded-xl p-8 border border-border hover:border-primary/50 transition-colors"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 50, delay: 0.1 }}
            >
              <div className="mb-6 p-4 rounded-full bg-primary/10 w-fit">
                <Quote className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To provide an exceptional online shopping experience by offering high-quality
                products, outstanding customer service, and seamless technology that makes finding
                the perfect item effortless and enjoyable.
              </p>
              <p className="mt-4">
                We strive to be more than just a store; we aim to be a trusted partner in our
                customers&apos; journey to discover products that enhance their lives.
              </p>
            </motion.div>

            <motion.div
              className="bg-card shadow-lg rounded-xl p-8 border border-border hover:border-accent/50 transition-colors"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 50, delay: 0.2 }}
            >
              <div className="mb-6 p-4 rounded-full bg-accent/10 w-fit">
                <Quote className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To become the global leader in online retail by consistently delivering value
                through innovation, quality, and customer obsession.
              </p>
              <p className="mt-4">
                We envision a future where shopping online is not just convenient but delightful,
                where every interaction with NextCart reinforces our commitment to excellence and
                exceeds customer expectations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 className="text-3xl font-bold mb-6" variants={itemVariants}>
              Our Core Values
            </motion.h2>
            <motion.div
              className="h-1 w-20 bg-primary rounded-full mx-auto mb-6"
              variants={itemVariants}
            />
            <motion.p className="text-lg text-muted-foreground" variants={itemVariants}>
              The principles that guide everything we do
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-xl cursor-pointer transition-all border-2 ${
                  activeValue === index
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/30'
                }`}
                onClick={() => setActiveValue(index)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-3 mt-1">
                    <CheckCircle2
                      className={`h-6 w-6 ${
                        activeValue === index ? 'text-primary' : 'text-primary/70'
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p
                      className={`${
                        activeValue === index ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <h2 className="text-3xl font-bold mb-6">Experience the NextCart Difference</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of satisfied customers who trust NextCart for quality products and
              exceptional service.
            </p>
            <Link href="/products">
              <Button size="lg" className="rounded-full px-8 group">
                Browse Our Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-primary/10 rounded-full" />
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-accent/10 rounded-full" />
      </section>
    </div>
  );
}
