import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

const CartButton = () => {
  const [isInCart, setIsInCart] = useState(false);

  return (
    <Button
      variant="outline"
      onClick={() => setIsInCart((prev) => !prev)}
    >
      <ShoppingCart className={isInCart ? "text-green-700 fill-green-700" : "text-gray-500"} />
    </Button>
  );
};

export default CartButton;
