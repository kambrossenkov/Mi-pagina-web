import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import ProductCard from "./ProductCard";
import productCrudda from "@/assets/product-crudda.png";
import productLaddubar from "@/assets/product-laddubar.png";
import productLucky from "@/assets/product-lucky.png";
import productFranui from "@/assets/product-franui.png";
import productCocacola from "@/assets/product-cocacola.png";
import productIntegra from "@/assets/product-integra.png";

const products = [
  {
    name: "Crudda Bar Avellana y Chocolate x 40gr",
    image: productCrudda,
    price: "$ 2.109,56",
    originalPrice: "$ 2.615,53",
    category: "Barras",
    promoTag: "5% EXTRA x10+",
  },
  {
    name: "Laddubar Frutos Rojos x 30gr Sin TACC",
    image: productLaddubar,
    price: "$ 1.562,59",
    originalPrice: "$ 1.736,21",
    category: "Barras",
    promoTag: "5% EXTRA x10+",
  },
  {
    name: "Lucky Strike Original x 12",
    image: productLucky,
    price: "$ 3.600,00",
    category: "Cigarrillos",
  },
  {
    name: "Franui Frambuesas Bañadas en Chocolate",
    image: productFranui,
    price: "$ 7.000,00",
    category: "Helados",
  },
  {
    name: "Coca Cola 2.25L",
    image: productCocacola,
    price: "$ 5.000,00",
    category: "Bebidas",
  },
  {
    name: "Integra Barra Proteica Maní y Arándanos x 43gr",
    image: productIntegra,
    price: "$ 1.890,00",
    category: "Barras",
    promoTag: "5% EXTRA x10+",
  },
];

interface Props {
  title: string;
  showPromoTag?: boolean;
}

const ProductSection = ({ title, showPromoTag }: Props) => {
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
            🏷️ Ofertas
          </span>
        )}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
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
          {products.map((p, i) => (
            <ProductCard key={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
