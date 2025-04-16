"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { MAIN_NAV } from "@/constants/navigation";
import MobileMenu from "./MobileMenu";
import ThemeSwitcher from "./ThemeSwitcher";
import UserDropdownMenu from "./UserDropdownMenu";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "@/store/cartSlice";
import { selectFavoriteItemCount } from "@/store/favoritesSlice";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const cartItemCount = useSelector(selectCartItemCount);
  const favoriteItemCount = useSelector(selectFavoriteItemCount);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <motion.header
      className={`bg-background text-foreground sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-md py-2" : "shadow-sm py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-3xl font-bold text-primary hover:opacity-90 transition-opacity"
        >
          BestShop
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {MAIN_NAV.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <UserDropdownMenu />

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link href="/favorites">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-background hover:bg-muted"
              >
                <Heart className="h-5 w-5" />
                {favoriteItemCount > 0 && (
                  <motion.span
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 15,
                    }}
                  >
                    {favoriteItemCount}
                  </motion.span>
                )}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-background hover:bg-muted"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <motion.span
                    className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 15,
                    }}
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </Button>
            </Link>
          </motion.div>

          <ThemeSwitcher />
        </div>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}
