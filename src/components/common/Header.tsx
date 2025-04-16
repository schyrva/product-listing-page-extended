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
        <Link href="/" className="text-4xl italic font-bold hover:text-primary">
          BestShop
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {MAIN_NAV.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="hover:text-primary relative group"
              >
                {item.label}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full"
                  transition={{ duration: 0.3 }}
                  whileHover={{ width: "100%" }}
                />
              </Link>
            </motion.div>
          ))}
          <div className="flex items-center gap-2">
            <UserDropdownMenu />

            <motion.div whileTap={{ scale: 0.9 }} className="relative">
              <Link href="/favorites">
                <Button variant="ghost" size="icon">
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

            <motion.div whileTap={{ scale: 0.9 }} className="relative">
              <Link href="/cart">
                <Button variant="ghost" size="icon">
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
        </nav>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}
