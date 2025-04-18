import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { MAIN_NAV } from '@/constants/navigation';
import ThemeSwitcher from './ThemeSwitcher';
import UserDropdownMenu from './UserDropdownMenu';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '@/store/cartSlice';
import { selectFavoriteItemCount } from '@/store/favoritesSlice';

export default function MobileMenu() {
  const cartItemCount = useSelector(selectCartItemCount);
  const favoriteItemCount = useSelector(selectFavoriteItemCount);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px]">
        <SheetTitle>Menu</SheetTitle>
        <SheetDescription className="sr-only">Navigation menu for mobile devices</SheetDescription>
        <div className="flex justify-end items-center space-x-2 mb-4">
          <UserDropdownMenu />

          <SheetClose asChild>
            <Link href="/favorites" className="relative">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                {favoriteItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {favoriteItemCount}
                  </span>
                )}
              </Button>
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
          </SheetClose>

          <ThemeSwitcher />
        </div>

        <nav className="flex flex-col space-y-4">
          {MAIN_NAV.map(item => (
            <SheetClose asChild key={item.href}>
              <Link href={item.href} className="text-gray-600 hover:text-primary">
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
