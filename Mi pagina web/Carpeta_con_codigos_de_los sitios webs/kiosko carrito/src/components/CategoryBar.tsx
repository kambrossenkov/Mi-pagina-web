import { Cookie, Pill, Wine, Candy, Circle, Dessert, Lollipop, Cigarette, UtensilsCrossed, Tablet, CookingPot, Droplets, IceCreamCone, Blend, Package, CakeSlice, Popcorn } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories: { name: string; icon: LucideIcon; color: string }[] = [
  { name: "Alfajores", icon: Cookie, color: "bg-primary/10 text-primary" },
  { name: "Analgésicos", icon: Pill, color: "bg-peya-green/10 text-peya-green" },
  { name: "Bebidas", icon: Wine, color: "bg-destructive/10 text-destructive" },
  { name: "Caramelos", icon: Candy, color: "bg-peya-orange/10 text-peya-orange" },
  { name: "Chicles", icon: Circle, color: "bg-peya-green/10 text-peya-green" },
  { name: "Chocolates", icon: CookingPot, color: "bg-primary/10 text-primary" },
  { name: "Chupetines", icon: Lollipop, color: "bg-peya-orange/10 text-peya-orange" },
  { name: "Cigarrillos", icon: Cigarette, color: "bg-muted text-muted-foreground" },
  { name: "Comidas", icon: UtensilsCrossed, color: "bg-primary/10 text-primary" },
  { name: "Confites Pastillas", icon: Tablet, color: "bg-peya-yellow/10 text-foreground" },
  { name: "Galletitas", icon: Cookie, color: "bg-peya-orange/10 text-peya-orange" },
  { name: "Gomitas", icon: Droplets, color: "bg-destructive/10 text-destructive" },
  { name: "Helados", icon: IceCreamCone, color: "bg-peya-orange/10 text-peya-orange" },
  { name: "Mix de Gomitas", icon: Blend, color: "bg-peya-green/10 text-peya-green" },
  { name: "Otros", icon: Package, color: "bg-muted text-muted-foreground" },
  { name: "Postres", icon: CakeSlice, color: "bg-primary/10 text-primary" },
  { name: "Salados", icon: Popcorn, color: "bg-peya-yellow/10 text-foreground" },
];

const CategoryBar = () => {
  const navigate = useNavigate();

  const toSlug = (name: string) =>
    name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");

  return (
    <section className="py-6">
      <div className="container">
        <h2 className="text-xl font-bold text-foreground mb-4">Categorías</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate(`/categoria/${toSlug(cat.name)}`)}
              className="flex flex-col items-center gap-2 min-w-[80px] group cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${cat.color} group-hover:scale-105 transition-transform`}>
                <cat.icon className="h-7 w-7" />
              </div>
              <span className="text-xs font-medium text-foreground text-center leading-tight whitespace-nowrap">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBar;
