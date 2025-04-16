import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { toggleFavorite, selectIsFavorite } from "@/store/favoritesSlice";

interface FavouriteButtonProps {
  productId?: number;
}

const FavouriteButton = ({ productId }: FavouriteButtonProps) => {
  const dispatch = useDispatch();
  const isFavourite = useSelector(
    productId ? selectIsFavorite(productId) : () => false
  );

  const handleToggleFavorite = () => {
    if (!productId) return;
    dispatch(toggleFavorite(productId));
  };

  return (
    <Button
      variant="outline"
      onClick={handleToggleFavorite}
      disabled={!productId}
      className="group"
    >
      <Heart
        className={
          isFavourite
            ? "text-red-700 fill-red-700"
            : "text-gray-700 group-hover:text-red-600 transition-colors"
        }
      />
    </Button>
  );
};

export default FavouriteButton;
