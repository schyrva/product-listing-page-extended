import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { addToCart, removeFromCart, selectIsInCart } from '@/store/cartSlice';

interface CartButtonProps {
  productId?: number;
}

const CartButton = ({ productId }: CartButtonProps) => {
  const dispatch = useDispatch();
  const isInCart = useSelector(productId ? selectIsInCart(productId) : () => false);

  const handleToggleCart = () => {
    if (!productId) return;

    if (isInCart) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(addToCart(productId));
    }
  };

  return (
    <Button variant="outline" onClick={handleToggleCart} disabled={!productId} className="group">
      <ShoppingCart
        className={
          isInCart
            ? 'text-green-700 fill-green-700'
            : 'text-gray-700 group-hover:text-green-600 transition-colors'
        }
      />
    </Button>
  );
};

export default CartButton;
