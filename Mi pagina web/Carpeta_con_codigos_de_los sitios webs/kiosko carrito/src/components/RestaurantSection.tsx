import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import RestaurantCard from "./RestaurantCard";
import foodBurger from "@/assets/food-burger.jpg";
import foodSushi from "@/assets/food-sushi.jpg";
import foodPizza from "@/assets/food-pizza.jpg";
import foodSalad from "@/assets/food-salad.jpg";
import foodTacos from "@/assets/food-tacos.jpg";

const restaurants = [
  { name: "Kansas Palermo", image: foodBurger, rating: 4.6, deliveryTime: "35-55 min", deliveryPrice: "1.459", originalPrice: "2.919", discount: "Hasta 50% OFF", badge: "Mismo precio que en local" },
  { name: "Sushi Master", image: foodSushi, rating: 4.7, deliveryTime: "25-40 min", deliveryPrice: "1.899", discount: "Hasta 30% OFF" },
  { name: "Pizzería Don Mario", image: foodPizza, rating: 4.5, deliveryTime: "20-35 min", deliveryPrice: "999", discount: "Hasta 23% OFF" },
  { name: "Green Bowl", image: foodSalad, rating: 4.4, deliveryTime: "15-30 min", deliveryPrice: "1.729", badge: "Mismo precio que en local" },
  { name: "Taquería El Pastor", image: foodTacos, rating: 4.8, deliveryTime: "30-45 min", deliveryPrice: "1.299", discount: "Hasta 38% OFF" },
];

interface Props {
  title: string;
  subtitle?: string;
  showPromoTag?: boolean;
}

const RestaurantSection = ({ title, subtitle, showPromoTag }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
    }
  };

  return (
    <section className="pb-8">
      <div className="container">
        {showPromoTag && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-accent px-2 py-1 rounded-full mb-2">
            🏷️ Promociones
          </span>
        )}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">{title}</h2>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll("left")} className="h-8 w-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <ChevronLeft className="h-4 w-4 text-foreground" />
            </button>
            <button onClick={() => scroll("right")} className="h-8 w-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <ChevronRight className="h-4 w-4 text-foreground" />
            </button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {restaurants.map((r, i) => (
            <RestaurantCard key={i} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestaurantSection;
