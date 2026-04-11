import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  name: string;
  image: string;
  price: string;
  originalPrice?: string;
  category?: string;
  promoTag?: string;
}

const ProductCard = ({ name, image, price, originalPrice, category, promoTag }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/producto/${encodeURIComponent(name)}?cat=${encodeURIComponent(category || "")}`)}
      className="min-w-[180px] max-w-[200px] cursor-pointer group bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative bg-secondary/30 flex items-center justify-center p-4 h-44">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
        />
        {promoTag && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
            {promoTag}
          </span>
        )}
      </div>
      <div className="p-3 space-y-1">
        <h4 className="font-semibold text-foreground text-xs leading-tight line-clamp-2">{name}</h4>
        {category && (
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{category}</span>
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-foreground">{price}</span>
          {originalPrice && (
            <span className="text-xs line-through text-muted-foreground">{originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
