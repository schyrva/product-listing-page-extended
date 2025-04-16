"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useDragControls,
  useMotionValue,
  useTransform,
  MotionConfig,
  PanInfo,
} from "framer-motion";
import { User, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion, useIntersectionObserver } from "@/hooks";

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
  const [isTouching, setIsTouching] = useState(false);
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

  // Use reduced motion preference hook
  const prefersReducedMotion = useReducedMotion();

  // Use intersection observer to detect when component is in viewport
  const [sectionRef, isInView] = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: "100px 0px",
    triggerOnce: false,
  });

  // Detect if on mobile
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  }, []);

  // Define handleNext before using it in useEffect
  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  // Only auto-advance testimonials when in view, not paused, and not being touched
  useEffect(() => {
    if (!paused && isInView && !isTouching) {
      const timer = setTimeout(() => {
        handleNext();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [current, paused, isInView, isTouching, handleNext]);

  // Adapt animations based on reduced motion preference and device
  const transitions = useMemo(() => {
    if (prefersReducedMotion) {
      return {
        type: "tween" as const,
        duration: 0.2,
        ease: "easeOut",
      };
    }

    return isMobile
      ? {
          type: "tween" as const,
          duration: 0.3,
          ease: "easeOut",
        }
      : {
          type: "spring" as const,
          stiffness: 300,
          damping: 30,
        };
  }, [prefersReducedMotion, isMobile]);

  // Adapt animations distance based on reduced motion preference and device
  const animationDistance = useMemo(() => {
    if (prefersReducedMotion) return 20;
    return isMobile ? 50 : 100;
  }, [prefersReducedMotion, isMobile]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    // Adjust threshold based on screen size for better mobile experience
    const threshold = window.innerWidth < 640 ? 50 : 100;

    if (info.offset.x > threshold) {
      handlePrev();
    } else if (info.offset.x < -threshold) {
      handleNext();
    }
    x.set(0);
    setIsTouching(false);
  };

  // Handle touch start and end to pause auto-rotation during touch interaction
  const handleTouchStart = () => {
    setIsTouching(true);
    setPaused(true);
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
    setPaused(false);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? animationDistance : -animationDistance,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: transitions,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -animationDistance : animationDistance,
      opacity: 0,
      scale: 0.95,
      transition: transitions,
    }),
  };

  const quoteVariants = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : -10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        delay: prefersReducedMotion ? 0.1 : 0.3,
        duration: prefersReducedMotion ? 0.2 : 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 10,
      transition: {
        type: "tween",
        duration: prefersReducedMotion ? 0.1 : 0.3,
        ease: "easeIn",
      },
    },
  };

  // Prevent touch events from causing page scroll while dragging
  useEffect(() => {
    // Only add event listeners if the component is in view
    if (!isInView) return;

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
  }, [isInView]);

  // Enhanced scroll reveal animation
  const scrollRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.6,
        ease: "easeOut",
      },
    },
  };

  // Dynamic content for swipe instructions based on device
  const swipeInstructions = useMemo(() => {
    if (prefersReducedMotion) {
      return "Use buttons to navigate testimonials";
    }
    return isMobile
      ? "Swipe to navigate testimonials"
      : "Swipe or drag to see more testimonials";
  }, [prefersReducedMotion, isMobile]);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-16 bg-gradient-to-r from-primary/5 to-accent/5 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={scrollRevealVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            What Our Customers Say
          </h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto mt-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.3 : 0.6,
              delay: prefersReducedMotion ? 0.1 : 0.3,
            }}
          />
        </motion.div>

        <MotionConfig reducedMotion={prefersReducedMotion ? "user" : "never"}>
          <div
            className="relative max-w-4xl mx-auto perspective-[1000px] overflow-hidden"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            ref={constraintsRef}
          >
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={testimonials[current].id}
                drag={prefersReducedMotion ? false : "x"}
                dragControls={dragControls}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={isMobile ? 0.05 : 0.1}
                onDragEnd={handleDragEnd}
                style={{
                  x,
                  rotate: prefersReducedMotion ? 0 : rotate,
                  scale,
                  backgroundImage: background,
                }}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-card rounded-lg shadow-lg p-6 md:p-8 relative cursor-grab active:cursor-grabbing touch-none will-change-transform select-none"
                aria-live="polite"
                aria-atomic="true"
                whileTap={{ cursor: "grabbing" }}
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
                    <Quote className="text-primary/20 w-8 h-8 md:w-12 md:h-12 absolute top-0 right-2" />
                    <p className="text-base md:text-lg italic mb-6 pt-5">
                      &ldquo;{testimonials[current].text}&rdquo;
                    </p>
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary flex items-center justify-center"
                        whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <User className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                      </motion.div>
                      <div>
                        <h4 className="font-semibold">
                          {testimonials[current].name}
                        </h4>
                        <p className="text-xs md:text-sm text-muted-foreground">
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
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
                whileTap={{ scale: prefersReducedMotion ? 0.95 : 0.9 }}
                transition={{ type: "tween", duration: 0.2 }}
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
                    aria-current={index === current ? "true" : "false"}
                    whileHover={{ scale: prefersReducedMotion ? 1 : 1.2 }}
                    whileTap={{ scale: prefersReducedMotion ? 0.95 : 0.9 }}
                    transition={{ type: "tween", duration: 0.2 }}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
                whileTap={{ scale: prefersReducedMotion ? 0.95 : 0.9 }}
                transition={{ type: "tween", duration: 0.2 }}
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
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ delay: prefersReducedMotion ? 0.2 : 1 }}
              aria-hidden="true"
            >
              {swipeInstructions}
            </motion.p>
          </div>
        </MotionConfig>
      </div>
    </section>
  );
}
