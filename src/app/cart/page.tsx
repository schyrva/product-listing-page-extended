'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Trash, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { selectCartItems, updateQuantity, removeFromCart, clearCart } from '@/store/cartSlice';
import { Product } from '@/types/product';

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        setIsLoading(true);
        const productIds = Object.keys(cartItems).map(Number);

        if (productIds.length === 0) {
          setProducts([]);
          setIsLoading(false);
          return;
        }

        const productsData = await Promise.all(
          productIds.map(id =>
            fetch(`https://fakestoreapi.com/products/${id}`).then(res => res.json())
          )
        );

        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching cart products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartProducts();
  }, [cartItems]);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const calculateSubtotal = () => {
    return products.reduce((total, product) => {
      const quantity = cartItems[product.id] || 0;
      return total + product.price * quantity;
    }, 0);
  };

  if (isLoading && products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (Object.keys(cartItems).length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="text-muted-foreground">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link href="/products">
              <Button className="mt-4">Start Shopping</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {products.map(product => {
              const quantity = cartItems[product.id] || 0;
              return (
                <Card key={product.id} className="p-4">
                  <div className="flex flex-col sm:flex-row items-center">
                    <div className="relative w-24 h-24 flex-shrink-0 mr-4">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="flex-grow">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-medium hover:text-primary truncate">{product.title}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(product.id, quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>

                        <Input
                          type="number"
                          value={quantity}
                          onChange={e => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value)) {
                              handleQuantityChange(product.id, value);
                            }
                          }}
                          className="h-8 w-14 mx-1 text-center"
                          min="1"
                        />

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(product.id, quantity + 1)}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(product.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="mt-4 flex justify-between">
            <Link href="/products">
              <Button variant="outline" className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>

            <Button
              variant="outline"
              className="text-red-500"
              onClick={() => {
                dispatch(clearCart());
              }}
            >
              Clear Cart
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-500">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Free shipping on orders over $100
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between mb-4">
              <p className="text-md text-gray-600 dark:text-gray-300">
                We don&apos;t process payment yet
              </p>
            </div>

            <Button className="w-full mt-6">Proceed to Checkout</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
