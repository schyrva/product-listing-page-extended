"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// Set end date to 7 days from now
const getEndDate = () => {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);
  return endDate;
};

// Initial empty time left to avoid hydration mismatches
const initialTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export default function PromotionBanner() {
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const [animate, setAnimate] = useState(false);

  // Initialize endDate and timeLeft after component mounts
  useEffect(() => {
    setEndDate(getEndDate());
  }, []);

  // Calculate time left
  function calculateTimeLeft() {
    if (!endDate) return initialTimeLeft;

    const difference = endDate.getTime() - new Date().getTime();
    let newTimeLeft = { ...initialTimeLeft };

    if (difference > 0) {
      newTimeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return newTimeLeft;
  }

  // Pulse animation for the second indicator
  useEffect(() => {
    if (!endDate) return; // Only start animation after endDate is set

    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500);
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  // Update countdown
  useEffect(() => {
    if (!endDate) return; // Only start countdown after endDate is set

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, endDate]);

  // Initialize the first calculation after endDate is set
  useEffect(() => {
    if (endDate) {
      setTimeLeft(calculateTimeLeft());
    }
  }, [endDate]);

  return (
    <section className="py-8 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="bg-gradient-to-r from-primary via-primary/80 to-accent rounded-2xl overflow-hidden"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="p-8 md:p-12 lg:p-16 w-full md:w-3/5 text-white">
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Limited Time Offer
              </motion.h2>

              <motion.p
                className="text-lg md:text-xl mb-8"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Get <span className="font-bold text-2xl">25% OFF</span> on all
                products when you shop now. Don't miss this exclusive deal!
              </motion.p>

              <motion.div
                className="flex gap-4 mb-8"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <TimeUnit value={timeLeft.days} label="Days" />
                <TimeUnit value={timeLeft.hours} label="Hours" />
                <TimeUnit value={timeLeft.minutes} label="Minutes" />
                <TimeUnit
                  value={timeLeft.seconds}
                  label="Seconds"
                  animate={animate}
                />
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Link href="/products">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="bg-white text-primary hover:bg-white/90 font-medium px-8 py-7 rounded-full"
                    >
                      Shop Now
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            <motion.div
              className="w-full md:w-2/5 relative h-[300px] md:h-[400px]"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <Image
                src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                alt="Special offer product"
                fill
                className="object-contain"
              />
              <motion.div
                className="absolute top-10 right-10 bg-accent text-white rounded-full px-4 py-2 text-lg font-bold"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                25% OFF
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TimeUnit({
  value,
  label,
  animate = false,
}: {
  value: number;
  label: string;
  animate?: boolean;
}) {
  return (
    <div className="text-center">
      <motion.div
        className="bg-white/20 backdrop-blur-sm rounded-xl p-3 w-16 md:w-20 h-16 md:h-20 flex items-center justify-center"
        animate={animate ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="text-2xl md:text-3xl font-bold">
          {value < 10 ? `0${value}` : value}
        </span>
      </motion.div>
      <p className="text-xs md:text-sm mt-1">{label}</p>
    </div>
  );
}
