"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { Product } from "@/types/product";
import { useInView } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectIsInCart } from "@/store/cartSlice";
import { toggleFavorite, selectIsFavorite } from "@/store/favoritesSlice";

interface TrendingProductsProps {
  products: Product[];
}

export default function TrendingProducts({ products }: TrendingProductsProps) {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  // Auto scroll when not hovering
  useEffect(() => {
    if (!containerRef.current || isHovering) return;

    let animationId: number;
    let startTime: number;

    const scroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      if (containerRef.current) {
        containerRef.current.scrollLeft += 0.5; // Slow scroll speed

        // Reset scroll position when reaching the end
        if (
          containerRef.current.scrollLeft >=
          containerRef.current.scrollWidth - containerRef.current.clientWidth
        ) {
          containerRef.current.scrollLeft = 0;
        }
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isHovering]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            Trending Now
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto mt-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <motion.p
            className="text-muted-foreground mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Discover our most popular products that everyone&apos;s talking
            about
          </motion.p>
        </div>

        <div
          ref={containerRef}
          className="flex overflow-x-auto pb-8 no-scrollbar"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="flex gap-6 pl-4">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="shrink-0 w-[280px]"
                initial={{ opacity: 0, x: 50 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
                }
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "tween",
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4"
        />

        {/* Quick actions */}
        <AnimatedActions isVisible={isHovered} productId={product.id} />

        {/* Price badge */}
        <div className="absolute top-3 left-3 bg-accent text-accent-foreground py-1 px-3 rounded-full text-sm font-semibold">
          ${product.price.toFixed(2)}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-base line-clamp-1">{product.title}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4">
          <Link href={`/products/${product.id}`}>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedActions({
  isVisible,
  productId,
}: {
  isVisible: boolean;
  productId: number;
}) {
  return (
    <motion.div
      className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <CartActionButton productId={productId} delay={0} />
      <FavoriteActionButton productId={productId} delay={0.1} />
      <Link href={`/products/${productId}`}>
        <ActionButton icon={<Eye className="w-4 h-4" />} delay={0.2} />
      </Link>
    </motion.div>
  );
}

function CartActionButton({
  productId,
  delay,
}: {
  productId: number;
  delay: number;
}) {
  const dispatch = useDispatch();
  const isInCart = useSelector(selectIsInCart(productId));

  return (
    <motion.button
      className={`rounded-full p-2 transition-colors ${
        isInCart
          ? "bg-green-500 text-white hover:bg-green-600"
          : "bg-white text-gray-900 hover:bg-primary hover:text-white"
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "tween",
        duration: 0.3,
        delay: delay,
      }}
      onClick={() => dispatch(addToCart(productId))}
    >
      <ShoppingCart className="w-4 h-4" />
    </motion.button>
  );
}

function FavoriteActionButton({
  productId,
  delay,
}: {
  productId: number;
  delay: number;
}) {
  const dispatch = useDispatch();
  const isFavorite = useSelector(selectIsFavorite(productId));

  return (
    <motion.button
      className={`rounded-full p-2 transition-colors ${
        isFavorite
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-white text-gray-900 hover:bg-primary hover:text-white"
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "tween",
        duration: 0.3,
        delay: delay,
      }}
      onClick={() => dispatch(toggleFavorite(productId))}
    >
      <Heart className="w-4 h-4" />
    </motion.button>
  );
}

function ActionButton({
  icon,
  delay,
}: {
  icon: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.button
      className="bg-white text-gray-900 rounded-full p-2 hover:bg-primary hover:text-white transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "tween",
        duration: 0.3,
        delay: delay,
      }}
    >
      {icon}
    </motion.button>
  );
}
