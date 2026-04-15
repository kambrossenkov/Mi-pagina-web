import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import TransferModal from "@/components/TransferModal";

const WA_NUMBER = "0000000000";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"transfer" | "cash">("transfer");
  const [showModal, setShowModal] = useState(false);

  const handlePay = () => {
    if (paymentMethod === "cash") {
      let msg = "Voy a venir a pagar estos productos, por favor tenerlos preparados.\n\n";
      items.forEach((item) => {
        msg += `- ${item.quantity}x ${item.name} (${item.price})\n`;
      });
      msg += `\nTotal: $ ${totalPrice.toLocaleString("es-AR", { minimumFractionDigits: 0 })}`;
      window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
      clearCart();
      navigate("/");
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header spacer */}
      <div className="sticky top-0 z-40 bg-background border-b border-border h-12" />

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="container max-w-lg mx-auto pt-6">
          <h1 className="text-3xl font-black text-foreground mb-2 leading-tight">Último paso</h1>
          <h2 className="text-2xl font-bold text-muted-foreground mb-6">¿Cómo querés pagar?</h2>

          {/* Payment method carousel */}
          <div
            className="flex gap-4 overflow-x-auto pb-4"
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Transfer card */}
            <div
              onClick={() => setPaymentMethod("transfer")}
              style={{
                scrollSnapAlign: "start",
                minWidth: 260,
                flexShrink: 0,
                background: "linear-gradient(135deg, #009EE3, #1159BF)",
                color: "#fff",
                borderRadius: 20,
                padding: 24,
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                transform: paymentMethod === "transfer" ? "scale(1)" : "scale(0.95)",
                opacity: paymentMethod === "transfer" ? 1 : 0.6,
                boxShadow: paymentMethod === "transfer" ? "0 8px 24px rgba(0,158,227,0.4)" : "none",
                border: paymentMethod === "transfer" ? "2px solid #fff" : "2px solid transparent",
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-4xl">💳</span>
                {paymentMethod === "transfer" && (
                  <div className="bg-white text-[#009EE3] rounded-full h-6 w-6 flex items-center justify-center text-sm font-extrabold">
                    ✓
                  </div>
                )}
              </div>
              <p className="text-xl font-extrabold leading-tight">Transferencia / Mercado Pago</p>
            </div>

            {/* Cash card */}
            <div
              onClick={() => setPaymentMethod("cash")}
              style={{
                scrollSnapAlign: "start",
                minWidth: 260,
                flexShrink: 0,
                background: "linear-gradient(135deg, #25D366, #00B16A)",
                color: "#fff",
                borderRadius: 20,
                padding: 24,
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                transform: paymentMethod === "cash" ? "scale(1)" : "scale(0.95)",
                opacity: paymentMethod === "cash" ? 1 : 0.6,
                boxShadow: paymentMethod === "cash" ? "0 8px 24px rgba(37,211,102,0.4)" : "none",
                border: paymentMethod === "cash" ? "2px solid #fff" : "2px solid transparent",
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-4xl">💵</span>
                {paymentMethod === "cash" && (
                  <div className="bg-white text-[#00B16A] rounded-full h-6 w-6 flex items-center justify-center text-sm font-extrabold">
                    ✓
                  </div>
                )}
              </div>
              <p className="text-xl font-extrabold leading-tight">Efectivo</p>
            </div>
          </div>

          {/* Total summary */}
          <div className="mt-8 p-4 bg-secondary rounded-2xl">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground font-semibold">Total a pagar</span>
              <span className="text-xl font-black text-foreground">
                $ {totalPrice.toLocaleString("es-AR", { minimumFractionDigits: 0 })}
              </span>
            </div>
            {paymentMethod === "cash" && (
              <p className="text-xs text-muted-foreground mt-2">
                Al confirmar, te enviaremos a WhatsApp para avisarnos que venís a pagar.
              </p>
            )}
            {paymentMethod === "transfer" && (
              <p className="text-xs text-muted-foreground mt-2">
                Te mostraremos los datos para transferir y luego enviar el comprobante.
              </p>
            )}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/carrito")}
              className="text-muted-foreground text-sm font-semibold underline bg-transparent border-none cursor-pointer"
            >
              Volver al carrito
            </button>
          </div>
        </div>
      </div>

      {/* Fixed pay button */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-30">
        <div className="container max-w-lg mx-auto">
          <button
            onClick={handlePay}
            className="w-full font-black py-5 rounded-full border-none cursor-pointer text-lg text-white"
            style={{ background: "#d8315b", boxShadow: "0 4px 16px rgba(216,49,91,0.4)" }}
          >
            Pagar
          </button>
        </div>
      </div>

      {showModal && <TransferModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default CheckoutPage;
