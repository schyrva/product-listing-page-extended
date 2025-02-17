import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";

const FavouriteButton = () => {
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <Button variant="outline" onClick={() => setIsFavourite((prev) => !prev)}>
      <Heart
        className={isFavourite ? "text-red-700 fill-red-700" : "text-gray-500"}
      />
    </Button>
  );
};

export default FavouriteButton;
