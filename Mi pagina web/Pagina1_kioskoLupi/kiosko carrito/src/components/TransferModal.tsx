import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

interface TransferModalProps {
  onClose: () => void;
}

const ALIAS = "MI.ALIAS.KIOSCO";
const CBU = "0000000000000000000000";
const WA_NUMBER = "0000000000";

const TransferModal = ({ onClose }: TransferModalProps) => {
  const [copiedAlias, setCopiedAlias] = useState(false);
  const [copiedCbu, setCopiedCbu] = useState(false);
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCopy = (text: string, type: "alias" | "cbu") => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === "alias") {
        setCopiedAlias(true);
        setTimeout(() => setCopiedAlias(false), 2000);
      } else {
        setCopiedCbu(true);
        setTimeout(() => setCopiedCbu(false), 2000);
      }
    });
  };

  const handleTransferDone = () => {
    let msg = "Hola, ya te transferí el dinero. Te adjunto el comprobante. Mi pedido es el siguiente:\n\n";
    items.forEach((item) => {
      msg += `- ${item.quantity}x ${item.name} (${item.price})\n`;
    });
    msg += `\nTotal: $ ${totalPrice.toLocaleString("es-AR", { minimumFractionDigits: 0 })}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    clearCart();
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-[90%] max-w-sm bg-background rounded-3xl p-6 flex flex-col gap-4 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-secondary border-none rounded-full h-8 w-8 flex items-center justify-center text-base cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-xl font-extrabold text-center mt-2">Datos para transferir</h2>
        <p className="text-sm text-muted-foreground text-center">
          Copiá los datos y hacé la transferencia desde tu cuenta bancaria o billetera virtual.
        </p>

        {/* Alias */}
        <div className="bg-secondary rounded-2xl p-4 flex justify-between items-center">
          <div>
            <span className="text-xs text-muted-foreground uppercase font-bold tracking-wide">Alias</span>
            <p className="text-base font-extrabold text-foreground mt-1">{ALIAS}</p>
          </div>
          <button
            onClick={() => handleCopy(ALIAS, "alias")}
            className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm font-semibold cursor-pointer min-w-[80px]"
          >
            {copiedAlias ? "¡Copiado!" : "Copiar"}
          </button>
        </div>

        {/* CBU */}
        <div className="bg-secondary rounded-2xl p-4 flex justify-between items-center">
          <div>
            <span className="text-xs text-muted-foreground uppercase font-bold tracking-wide">CVU / CBU</span>
            <p className="text-base font-extrabold text-foreground mt-1">{CBU}</p>
          </div>
          <button
            onClick={() => handleCopy(CBU, "cbu")}
            className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm font-semibold cursor-pointer min-w-[80px]"
          >
            {copiedCbu ? "¡Copiado!" : "Copiar"}
          </button>
        </div>

        <button
          onClick={handleTransferDone}
          className="w-full bg-[#25D366] text-white font-extrabold py-4 rounded-full border-none cursor-pointer text-base mt-2"
        >
          Ya transferí - Enviar comprobante
        </button>
      </div>
    </div>
  );
};

export default TransferModal;
