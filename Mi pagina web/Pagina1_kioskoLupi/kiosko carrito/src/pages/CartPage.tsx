import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

const cheapProducts = [
  { name: "Bon O Bon Supreme Avellanas x2", image: "https://wsrv.nl/?url=https://kioskoboxoeste.com.ar/wp-content/uploads/2026/04/20260402_153534_0000-300x300.png&w=300&output=webp", price: "$ 1.900,00", category: "Chocolates" },
  { name: "Oreos 118g", image: "https://wsrv.nl/?url=https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260327_163323_0000-300x300.png&w=300&output=webp", price: "$ 2.000,00", category: "Galletitas" },
  { name: "Nutella B-Ready", image: "https://wsrv.nl/?url=https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260324_203620_0000-300x300.png&w=300&output=webp", price: "$ 1.800,00", category: "Chocolates" },
  { name: "Super Pancho", image: "https://wsrv.nl/?url=https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260320_151929_0000-300x300.png&w=300&output=webp", price: "$ 2.300,00", category: "Comidas" },
  { name: "Alfachurro Maixanas", image: "https://wsrv.nl/?url=https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260325_195926_0000-300x300.png&w=300&output=webp", price: "$ 2.100,00", category: "Alfajores" },
  { name: "Monster Pipeline Punch", image: "https://wsrv.nl/?url=https://kioskoboxoeste.com.ar/wp-content/uploads/2025/08/20250916_015918_0000-300x300.png&w=300&output=webp", price: "$ 3.300,00", category: "Bebidas" },
];

const CartPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, updateQuantity, removeFromCart, addToCart } = useCart();
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: "left" | "right") => {
    carouselRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container flex items-center gap-3 py-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="h-6 w-6 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Kiosco Casa Lupi</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-36">
        <div className="container max-w-lg mx-auto py-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-muted-foreground text-lg mb-4">Tu carrito está vacío</p>
              <button onClick={() => navigate("/")} className="text-primary font-bold text-sm">
                Volver a la tienda
              </button>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.name} className="flex gap-3 items-start py-3 border-b border-border">
                  <img
                    src={item.image}
                    alt={item.name}
                    onClick={() => navigate(`/producto/${encodeURIComponent(item.name)}?cat=${encodeURIComponent(item.category)}`)}
                    className="h-16 w-16 object-contain rounded-lg bg-secondary/30 p-1 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground line-clamp-2">{item.name}</p>
                    <p className="text-base font-bold text-foreground mt-1">{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => removeFromCart(item.name)}
                      className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-bold w-5 text-center text-foreground">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.name, item.quantity + 1)}
                      className="h-8 w-8 flex items-center justify-center bg-secondary rounded-full hover:bg-secondary/80 transition-colors"
                    >
                      <Plus className="h-4 w-4 text-foreground" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Suggestions carousel */}
              <div className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-foreground">Más productos por menos de $1500</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => scrollCarousel("left")}
                      className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => scrollCarousel("right")}
                      className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                    >
                      ›
                    </button>
                  </div>
                </div>
                <div
                  ref={carouselRef}
                  className="flex gap-4 overflow-x-auto pb-2"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {cheapProducts
                    .filter((p) => !items.some((i) => i.name === p.name))
                    .map((p, i) => (
                      <div key={i} className="min-w-[140px] max-w-[160px] flex-shrink-0 rounded-xl border border-border overflow-hidden bg-card cursor-pointer"
                        onClick={() => navigate(`/producto/${encodeURIComponent(p.name)}?cat=${encodeURIComponent(p.category)}`)}>
                        <div className="bg-secondary/30 flex items-center justify-center p-3 h-32">
                          <img src={p.image} alt={p.name} className="h-24 w-auto object-contain" />
                        </div>
                        <div className="p-2">
                          <p className="text-xs font-semibold text-foreground line-clamp-2">{p.name}</p>
                          <p className="text-sm font-bold text-foreground mt-1">{p.price}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-50">
          <div className="container max-w-lg mx-auto">
            <div className="flex justify-between mb-3">
              <span className="text-xl font-bold text-foreground">Subtotal</span>
              <span className="text-xl font-bold text-foreground">
                $ {totalPrice.toLocaleString("es-AR", { minimumFractionDigits: 0 })}
              </span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-[#E4004B] text-white font-bold py-4 rounded-full text-lg hover:bg-[#C9003F] transition-colors"
            >
              Ir a pagar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
