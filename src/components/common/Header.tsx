"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { MAIN_NAV } from "@/constants/navigation";
import MobileMenu from "./MobileMenu";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  return (
    <header className="bg-background text-foreground shadow-sm sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-4xl italic font-bold hover:text-primary"
        >
          BestShop
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <ThemeSwitcher />
          </div>
        </nav>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
