"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { ShoppingBag, X, Bell } from "lucide-react";
import Image from "next/image";

const recentPurchases = [
  {
    id: 1,
    name: "Alex from New York",
    product: "Premium Headphones",
    time: "2 minutes ago",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
  },
  {
    id: 2,
    name: "Sarah from London",
    product: "Casual T-Shirt",
    time: "5 minutes ago",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  },
  {
    id: 3,
    name: "Michael from Toronto",
    product: "Smart Watch",
    time: "12 minutes ago",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
  },
  {
    id: 4,
    name: "Ella from Sydney",
    product: "Designer Bag",
    time: "15 minutes ago",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  },
];

export default function FloatingNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [scope, animate] = useAnimate();
  const bellRef = useRef(null);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      if (!dismissed) {
        setIsVisible(true);
      }
    }, 3000);

    const rotationTimer = setInterval(() => {
      if (isVisible && !dismissed) {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentNotification((prev) => (prev + 1) % recentPurchases.length);
          setIsVisible(true);
        }, 500);
      }
    }, 8000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(rotationTimer);
    };
  }, [isVisible, dismissed]);

  useEffect(() => {
    if (isVisible && bellRef.current) {
      animate(
        bellRef.current,
        { rotate: [0, 15, -15, 10, -10, 5, -5, 0] },
        { duration: 0.8, ease: "easeInOut" }
      );
    }
  }, [isVisible, animate]);

  const handleDismiss = () => {
    if (scope.current) {
      animate(
        scope.current,
        { x: -100, opacity: 0 },
        { type: "tween", duration: 0.3 }
      ).then(() => {
        setIsVisible(false);
        setDismissed(true);
      });
    } else {
      setIsVisible(false);
      setDismissed(true);
    }
  };

  const notification = recentPurchases[currentNotification];

  const containerVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      x: -100,
      opacity: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -10, opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isVisible && !dismissed && (
        <motion.div
          ref={scope}
          className="fixed bottom-6 left-6 z-50 max-w-xs w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="relative">
            <motion.div
              className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "tween", duration: 0.3 }}
              ref={bellRef}
            >
              <Bell className="w-4 h-4" />
            </motion.div>

            <div className="bg-card rounded-lg shadow-lg overflow-hidden border border-muted">
              <div className="flex items-start p-4">
                <motion.div
                  className="relative w-12 h-12 mr-3 rounded overflow-hidden flex-shrink-0"
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                >
                  <Image
                    src={notification.image}
                    alt={notification.product}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  />
                </motion.div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <motion.p
                      className="text-sm font-medium"
                      variants={itemVariants}
                    >
                      {notification.name}
                    </motion.p>
                    <motion.button
                      onClick={handleDismiss}
                      className="text-muted-foreground hover:text-foreground"
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "tween", duration: 0.2 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <motion.p
                    className="text-sm text-muted-foreground mb-1"
                    variants={itemVariants}
                  >
                    purchased{" "}
                    <motion.span
                      className="font-medium"
                      initial={{ color: "hsl(var(--muted-foreground))" }}
                      animate={{ color: "hsl(var(--primary))" }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      {notification.product}
                    </motion.span>
                  </motion.p>
                  <motion.div
                    className="flex items-center"
                    variants={itemVariants}
                  >
                    <ShoppingBag className="w-3 h-3 text-primary mr-1" />
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </motion.div>
                </div>
              </div>
              <motion.div
                className="h-1 bg-primary"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 8, ease: "linear" }}
                onAnimationComplete={() => {
                  if (isVisible && scope.current) {
                    animate(
                      scope.current,
                      { x: [0, 5, -5, 5, -5, 0] },
                      { duration: 0.5, ease: "easeInOut" }
                    );
                  }
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
