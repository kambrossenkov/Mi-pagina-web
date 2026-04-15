import { useState } from "react";
import { Search, ChevronDown, ChevronRight, MapPin, ChevronLeft, LocateFixed } from "lucide-react";
import logo from "@/assets/kiosco-logo.png";
import profileImg from "../../imagen de loteria.jpg";

const PeyaHeader = () => {
  const [showAddressPanel, setShowAddressPanel] = useState(false);
  const [address, setAddress] = useState("Salcedo 3924");
  const [inputAddress, setInputAddress] = useState("");

  const handleSaveAddress = () => {
    if (inputAddress.trim()) {
      setAddress(inputAddress.trim());
    }
    setShowAddressPanel(false);
    setInputAddress("");
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-6 shrink-0">
            <img src={logo} alt="Kiosco" className="h-10 w-auto rounded" />
            <button
              onClick={() => setShowAddressPanel(true)}
              className="flex items-center gap-1 text-sm hover:opacity-80 transition-opacity"
            >
              <MapPin className="h-4 w-4 text-primary" />
              <div className="text-left">
                <span className="text-xs text-muted-foreground block leading-none">Enviar a</span>
                <span className="font-semibold text-foreground flex items-center gap-0.5">
                  {address} <ChevronDown className="h-3 w-3" />
                </span>
              </div>
            </button>
          </div>

          <div className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar locales"
                className="w-full h-10 pl-4 pr-12 rounded-full border border-border bg-secondary text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary flex items-center justify-center hover:opacity-90 transition-opacity">
                <Search className="h-4 w-4 text-primary-foreground" />
              </button>
            </div>
          </div>

          <button className="flex items-center gap-3 text-sm font-medium text-foreground hover:opacity-80 transition-opacity shrink-0 border border-border rounded-full px-3 py-1.5">
            <img src={profileImg} alt="Casa Lupi" className="h-7 w-auto rounded" />
            <span className="font-semibold">Lotería</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Address Panel Overlay */}
      {showAddressPanel && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowAddressPanel(false)}
          />
          <div className="relative w-full max-w-md bg-background h-full shadow-xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="p-4">
              <button
                onClick={() => setShowAddressPanel(false)}
                className="mb-4 hover:opacity-70 transition-opacity"
              >
                <ChevronLeft className="h-6 w-6 text-foreground" />
              </button>
              <h2 className="text-xl font-bold text-foreground mb-6">Ingresá tu dirección</h2>
              <div className="relative mb-4">
                <input
                  type="text"
                  value={inputAddress}
                  onChange={(e) => setInputAddress(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveAddress()}
                  placeholder="Dirección o punto de referencia"
                  className="w-full h-12 pl-4 pr-12 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  autoFocus
                />
                <Search className="absolute right-4 top-3.5 h-5 w-5 text-muted-foreground" />
              </div>
              <button
                onClick={() => {
                  setAddress("Mi ubicación actual");
                  setShowAddressPanel(false);
                }}
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-secondary transition-colors"
              >
                <LocateFixed className="h-5 w-5 text-foreground" />
                <span className="text-sm font-medium text-foreground">Mi ubicación actual</span>
              </button>

              {/* Direcciones ficticias guardadas */}
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">Direcciones guardadas</p>
                {["Salcedo 3924", "Av. Corrientes 1234", "Cabildo 500"].map((dir) => (
                  <button
                    key={dir}
                    onClick={() => {
                      setAddress(dir);
                      setShowAddressPanel(false);
                    }}
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground">{dir}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PeyaHeader;
