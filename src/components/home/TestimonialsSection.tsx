"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useDragControls,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { User, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Emma Thompson",
    role: "Fashion Designer",
    text: "The quality of products exceeded my expectations. Shipping was fast and the customer service was excellent.",
  },
  {
    id: 2,
    name: "Daniel Moore",
    role: "Tech Enthusiast",
    text: "I've purchased several electronic items and they're all high quality. The website made it easy to find exactly what I was looking for.",
  },
  {
    id: 3,
    name: "Sophia Garcia",
    role: "Interior Designer",
    text: "The attention to detail and product variety is impressive. I'll definitely be a returning customer for all my design needs.",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Photographer",
    text: "Amazing selection of products with detailed descriptions. The checkout process was smooth and delivery was prompt.",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-5, 5]);
  const scale = useTransform(x, [-200, 0, 200], [0.95, 1, 0.95]);
  const background = useTransform(
    x,
    [-200, 0, 200],
    [
      "linear-gradient(45deg, rgba(var(--primary), 0.15), rgba(var(--accent), 0.1))",
      "none",
      "linear-gradient(-45deg, rgba(var(--primary), 0.15), rgba(var(--accent), 0.1))",
    ]
  );

  useEffect(() => {
    if (!paused) {
      const timer = setTimeout(() => {
        handleNext();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [current, paused]);

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } }
  ) => {
    if (info.offset.x > 100) {
      handlePrev();
    } else if (info.offset.x < -100) {
      handleNext();
    }
    x.set(0);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    }),
  };

  const quoteVariants = {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Prevent touch events from causing page scroll while dragging
  useEffect(() => {
    const preventDefaultTouchMove = (e: TouchEvent) => {
      if (e.target && constraintsRef.current?.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventDefaultTouchMove, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchmove", preventDefaultTouchMove);
    };
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            What Our Customers Say
          </h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        <div
          className="relative max-w-4xl mx-auto perspective-[1000px] overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          ref={constraintsRef}
        >
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={testimonials[current].id}
              drag="x"
              dragControls={dragControls}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              style={{ x, rotate, scale, backgroundImage: background }}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-card rounded-lg shadow-lg p-8 relative cursor-grab active:cursor-grabbing touch-none will-change-transform"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`quote-${testimonials[current].id}`}
                  variants={quoteVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="relative"
                >
                  <Quote className="text-primary/20 w-12 h-12 absolute top-0 right-2" />
                  <p className="text-lg italic mb-6 pt-5">
                    &ldquo;{testimonials[current].text}&rdquo;
                  </p>
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <User className="w-6 h-6 text-primary" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold">
                        {testimonials[current].name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonials[current].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center mt-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
              onClick={handlePrev}
              className="bg-primary/10 hover:bg-primary/20 rounded-full p-2 text-primary"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1);
                    setCurrent(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === current ? "bg-primary" : "bg-muted"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
              onClick={handleNext}
              className="bg-primary/10 hover:bg-primary/20 rounded-full p-2 text-primary"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          <motion.p
            className="text-center text-xs text-muted-foreground mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Swipe or drag to see more testimonials
          </motion.p>
        </div>
      </div>
    </section>
  );
}
