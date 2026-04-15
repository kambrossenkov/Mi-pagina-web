import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";

const CartFloatingButton = () => {
  const { totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // No mostrar en carrito ni en checkout
  const hiddenRoutes = ["/carrito", "/checkout"];
  if (totalItems === 0 || hiddenRoutes.includes(location.pathname)) return null;

  return (
    <button
      onClick={() => navigate("/carrito")}
      className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-full px-5 py-3 shadow-lg hover:bg-primary/90 transition-colors flex items-center gap-3"
    >
      <ShoppingCart className="h-5 w-5" />
      <span className="font-bold">{totalItems}</span>
      <span className="text-sm">$ {totalPrice.toLocaleString("es-AR", { minimumFractionDigits: 0 })}</span>
    </button>
  );
};

export default CartFloatingButton;
