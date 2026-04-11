import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const allProducts = [
  { name: "Omeprazol Por Tira", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/04/Diseno-sin-titulo_20260402_195145_0000-300x300.png", price: "$ 1.300,00", category: "Analgésicos" },
  { name: "Azufres x5 Uni", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/04/20260402_195015_0000-300x300.png", price: "$ 1.300,00", category: "Analgésicos" },
  { name: "Bon O Bon Supreme Avellanas x2", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/04/20260402_153534_0000-300x300.png", price: "$ 1.900,00", category: "Chocolates" },
  { name: "Barra Chocolinas 40g", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260330_191739_0000-300x300.png", price: "$ 1.500,00", category: "Chocolates" },
  { name: "Gio Frutillas American Cookies", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260330_191700_0000-300x300.png", price: "$ 7.000,00", category: "Helados" },
  { name: "Oreos 118g", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260327_163323_0000-300x300.png", price: "$ 2.000,00", category: "Galletitas" },
  { name: "Lata Dr Lemon Black Cherry 473ml", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260327_163238_0000-300x300.png", price: "$ 2.600,00", category: "Bebidas" },
  { name: "Juaninno Blanco", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260326_180026_0000-300x300.png", price: "$ 1.700,00", category: "Alfajores" },
  { name: "Juaninno Membrillo", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260326_180114_0000-300x300.png", price: "$ 1.700,00", category: "Alfajores" },
  { name: "Juaninno Negro", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260326_180133_0000-300x300.png", price: "$ 1.700,00", category: "Alfajores" },
  { name: "Gordon's Mango y Maracuyá + 2 Sprite 2.25L", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260326_180444_0000-300x300.png", price: "$ 32.500,00", category: "Bebidas" },
  { name: "Alfachurro Maixanas", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260325_195926_0000-300x300.png", price: "$ 2.100,00", category: "Alfajores" },
  { name: "Dubai Pistacho Blanco Maixanas", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260325_195938_0000-300x300.png", price: "$ 2.100,00", category: "Alfajores" },
  { name: "Dubai Pistacho Negro Maixanas", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260325_195949_0000-300x300.png", price: "$ 2.100,00", category: "Alfajores" },
  { name: "Red Velvet Maixanas", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260325_200000_0000-300x300.png", price: "$ 2.100,00", category: "Alfajores" },
  { name: "Nutella B-Ready", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260324_203620_0000-300x300.png", price: "$ 1.800,00", category: "Chocolates" },
  { name: "Medialunas de Jamón y Queso x2", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260321_165006_0000-300x300.png", price: "$ 3.000,00", category: "Comidas" },
  { name: "Sanguchitos de Miga Jamón y Queso x3", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260321_165034_0000-300x300.png", price: "$ 3.000,00", category: "Comidas" },
  { name: "Lluvia de Doritos", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260321_161831_0000-300x300.png", price: "$ 500,00", category: "Comidas" },
  { name: "Super Pancho con Cheddar y Doritos", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260320_151952_0000-300x300.png", price: "$ 2.800,00", category: "Comidas" },
  { name: "Super Pancho", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260320_151929_0000-300x300.png", price: "$ 2.300,00", category: "Comidas" },
  { name: "Fantoche Red Velvet Triple", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260319_162528_0000-300x300.png", price: "$ 1.100,00", category: "Alfajores" },
  { name: "Fantoche Pescado Raúl Blanco", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260319_162737_0000-300x300.png", price: "$ 800,00", category: "Alfajores" },
  { name: "Fantoche Pescado Raúl Negro", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260319_162549_0000-300x300.png", price: "$ 800,00", category: "Alfajores" },
  { name: "Fantoche Súper Triple", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260319_162508_0000-300x300.png", price: "$ 1.100,00", category: "Alfajores" },
  { name: "Aquarius Zero Ananá y Jengibre 600ml", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260318_194858_0000-300x300.png", price: "$ 1.300,00", category: "Bebidas" },
  { name: "Aquarius Zero Ananá y Jengibre 1.5L", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260318_194834_0000-300x300.png", price: "$ 2.200,00", category: "Bebidas" },
  { name: "Alikal", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260316_224002_0000-300x300.png", price: "$ 1.000,00", category: "Analgésicos" },
  { name: "Actron 600", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260316_221853_0000-300x300.png", price: "$ 900,00", category: "Analgésicos" },
  { name: "Migral 500", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260316_223226_0000-300x300.png", price: "$ 600,00", category: "Analgésicos" },
  { name: "Ibuevanol", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260316_221727_0000-300x300.png", price: "$ 600,00", category: "Analgésicos" },
  { name: "Cafiaspirina", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260316_223030_0000-300x300.png", price: "$ 300,00", category: "Analgésicos" },
  { name: "Qura Plus", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260316_222047_0000-300x300.png", price: "$ 700,00", category: "Analgésicos" },
  { name: "Tafirol", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260316_222944_0000-300x300.png", price: "$ 400,00", category: "Analgésicos" },
  { name: "Vivita Forte Antigripal", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260316_222741_0000-300x300.png", price: "$ 2.000,00", category: "Analgésicos" },
  { name: "Next", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260316_221650_0000-300x300.png", price: "$ 600,00", category: "Analgésicos" },
  { name: "Bayaspirina", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260316_223100_0000-300x300.png", price: "$ 300,00", category: "Analgésicos" },
  { name: "Ketorolac 20mg", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260316_223525_0000-300x300.png", price: "$ 300,00", category: "Analgésicos" },
  { name: "Sertal Compuesto", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260316_224035_0000-300x300.png", price: "$ 1.000,00", category: "Analgésicos" },
  { name: "Ibuprofeno 600mg", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260316_221813_0000-300x300.png", price: "$ 300,00", category: "Analgésicos" },
  { name: "Buscapina Duo", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260316_221927_0000-300x300.png", price: "$ 900,00", category: "Analgésicos" },
  { name: "Marroc Cric Felfort", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260314_162214_0000-300x300.png", price: "$ 1.000,00", category: "Chocolates" },
  { name: "Mogul Arañitas Pinta Lengua 30g", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260313_153550_0000-300x300.png", price: "$ 700,00", category: "Gomitas" },
  { name: "Mogul Cerebritos Pinta Lengua 30g", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260313_153608_0000-300x300.png", price: "$ 700,00", category: "Gomitas" },
  { name: "Milka Relleno Dulce de Leche 135g", image: "https://kioskoboxoeste.com.ar/wp-content/uploads/2026/03/20260311_203337_0000-300x300.png", price: "$ 8.700,00", category: "Chocolates" },
];

const AllProductsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
    }
  };

  return (
    <section className="pb-8">
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">💰 Precios a menos de $1500</h2>
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
          {allProducts.map((p, i) => (
            <div
              key={i}
              onClick={() => navigate(`/producto/${encodeURIComponent(p.name)}?cat=${encodeURIComponent(p.category)}`)}
              className="min-w-[180px] max-w-[200px] cursor-pointer group bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative bg-secondary/30 flex items-center justify-center p-4 h-44">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 space-y-1">
                <h4 className="font-semibold text-foreground text-xs leading-tight line-clamp-2">{p.name}</h4>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{p.category}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">{p.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProductsSection;
