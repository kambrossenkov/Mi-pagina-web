import { Star, Clock, Bike } from "lucide-react";

interface RestaurantCardProps {
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryPrice: string;
  originalPrice?: string;
  discount?: string;
  badge?: string;
}

const RestaurantCard = ({
  name,
  image,
  rating,
  deliveryTime,
  deliveryPrice,
  originalPrice,
  discount,
  badge,
}: RestaurantCardProps) => {
  return (
    <div className="min-w-[260px] max-w-[300px] cursor-pointer group">
      <div className="relative rounded-xl overflow-hidden h-40">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-md">
            {discount}
          </span>
        )}
        {badge && (
          <span className="absolute top-3 left-3 mt-7 bg-peya-green text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-md">
            {badge}
          </span>
        )}
      </div>
      <div className="pt-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-foreground text-sm truncate">{name}</h4>
          <div className="flex items-center gap-0.5 shrink-0">
            <Star className="h-3.5 w-3.5 fill-peya-orange text-peya-orange" />
            <span className="text-xs font-semibold text-foreground">{rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {deliveryTime}
          </span>
          <span className="flex items-center gap-1">
            <Bike className="h-3 w-3" /> $ {deliveryPrice}
            {originalPrice && (
              <span className="line-through text-muted-foreground/60">$ {originalPrice}</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
