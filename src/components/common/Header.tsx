"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart, Heart } from "lucide-react";
import { MAIN_NAV } from "@/constants/navigation";

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 hover:text-primary"
        >
          ShopNest
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-600 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-end">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}

const MobileMenu = () => (
  <Sheet>
    <SheetTrigger asChild className="md:hidden">
      <Button variant="ghost" size="icon">
        <Menu className="h-5 w-5" />
      </Button>
    </SheetTrigger>
    <SheetContent side="right" className="w-[300px]">
      <nav className="flex flex-col space-y-4 mt-8">
        {MAIN_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-gray-600 hover:text-primary"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </SheetContent>
  </Sheet>
);
