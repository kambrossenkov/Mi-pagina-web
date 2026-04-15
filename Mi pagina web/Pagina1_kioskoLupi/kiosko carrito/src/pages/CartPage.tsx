import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import PeyaHeader from "@/components/PeyaHeader";

// Best sellers for suggestions
const bestSellers = [
  { name: "Crudda Bar Avellana y Chocolate x 40gr", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260311_203337_0000-300x300.png", price: "$ 2.109,00", category: "Barras" },
  { name: "Coca Cola 2.25L", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260327_163238_0000-300x300.png", price: "$ 5.000,00", category: "Bebidas" },
  { name: "Bon O Bon Supreme Avellanas x2", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/04/20260402_153534_0000-300x300.png", price: "$ 1.900,00", category: "Chocolates" },
  { name: "Oreos 118g", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260327_163323_0000-300x300.png", price: "$ 2.000,00", category: "Galletitas" },
  { name: "Nutella B-Ready", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260324_203620_0000-300x300.png", price: "$ 1.800,00", category: "Chocolates" },
  { name: "Super Pancho", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260320_151929_0000-300x300.png", price: "$ 2.300,00", category: "Comidas" },
  { name: "Alfachurro Maixanas", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260325_195926_0000-300x300.png", price: "$ 2.100,00", category: "Alfajores" },
  { name: "Lata Dr Lemon Black Cherry 473ml", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260327_163238_0000-300x300.png", price: "$ 2.600,00", category: "Bebidas" },
];

const CartPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, updateQuantity, removeFromCart, addToCart } = useCart();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container flex items-center gap-3 py-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="h-6 w-6 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Tu carrito</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="container max-w-lg mx-auto py-4 space-y-4">
          {/* Cart items */}
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Tu carrito está vacío</p>
              <button onClick={() => navigate("/")} className="mt-4 text-primary font-medium">
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
                    className="h-16 w-16 object-contain rounded-lg bg-secondary/30 p-1 cursor-pointer"
                    onClick={() => navigate(`/producto/${encodeURIComponent(item.name)}?cat=${encodeURIComponent(item.category)}`)}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-2">{item.name}</p>
                    <p className="text-base font-bold text-foreground mt-1">{item.price}</p>
                    <button className="text-xs text-primary font-medium mt-1">Editar</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(item.name)}
                      className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-bold w-5 text-center text-foreground">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.name, item.quantity + 1)}
                      className="h-8 w-8 flex items-center justify-center text-foreground hover:text-primary transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Suggestion section */}
              <div className="pt-4">
                <h3 className="text-lg font-bold text-foreground mb-1">Más productos</h3>
                <p className="text-sm text-muted-foreground mb-4">Los más vendidos para agregar a tu pedido</p>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {bestSellers
                    .filter((bs) => !items.some((i) => i.name === bs.name))
                    .map((p, i) => (
                      <div key={i} className="min-w-[150px] max-w-[170px] flex-shrink-0">
                        <div className="bg-secondary/30 rounded-xl flex items-center justify-center p-3 h-36 relative">
                          <img src={p.image} alt={p.name} className="h-28 w-auto object-contain" />
                          <button
                            onClick={() => addToCart({ name: p.name, image: p.image, price: p.price, category: p.category }, 1)}
                            className="absolute bottom-2 right-2 h-8 w-8 bg-background border border-border rounded-full flex items-center justify-center shadow-sm hover:bg-secondary transition-colors"
                          >
                            <Plus className="h-4 w-4 text-foreground" />
                          </button>
                        </div>
                        <p className="text-base font-bold text-foreground mt-2">{p.price}</p>
                        <p className="text-xs text-foreground line-clamp-2">{p.name}</p>
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
            <button className="w-full bg-[#E4004B] text-white font-bold py-4 rounded-full text-lg hover:bg-[#C9003F] transition-colors">
              Ir a pagar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
