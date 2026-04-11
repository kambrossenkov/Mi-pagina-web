import comboRasta from "@/assets/combo-rasta.png";
import comboJorgito from "@/assets/combo-jorgito.png";
import comboPalitos from "@/assets/combo-palitos.png";
import { useNavigate } from "react-router-dom";

const combos = [
  {
    title: "2x1",
    price: "$ 2.300",
    product: comboRasta,
    productName: "Alfajor Rasta",
    gradient: "from-emerald-700 to-emerald-900",
    badge: "🔥 PROMO",
  },
  {
    title: "3x2",
    price: "$ 2.100",
    product: comboJorgito,
    productName: "Alfajor Jorgito",
    gradient: "from-amber-600 to-amber-800",
    badge: "⭐ OFERTA",
  },
  {
    title: "Bolsitas 100g",
    price: "$ 1.000",
    product: comboPalitos,
    productName: "Palitos de la Selva",
    gradient: "from-pink-500 to-fuchsia-700",
    badge: "🍬 COMBOS",
  },
];

const PromoBanners = () => {
  const navigate = useNavigate();

  return (
    <section className="pb-6">
      <div className="container">
        <h2 className="text-xl font-bold text-foreground mb-4">🎉 Combos y Promociones</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {combos.map((combo) => (
            <div
              key={combo.title}
              onClick={() => navigate(`/producto/${encodeURIComponent(combo.productName)}?cat=Alfajores`)}
              className={`relative h-52 rounded-2xl overflow-hidden cursor-pointer group bg-gradient-to-br ${combo.gradient}`}
            >
              <span className="absolute top-3 left-3 z-20 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
                {combo.badge}
              </span>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
                <img
                  src={combo.product}
                  alt={combo.productName}
                  loading="lazy"
                  className="h-40 w-40 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="relative z-10 p-5 flex flex-col justify-end h-full">
                <span className="text-primary-foreground/80 text-xs font-medium uppercase tracking-wider">
                  {combo.productName}
                </span>
                <h3 className="text-3xl font-extrabold text-primary-foreground leading-none mt-1">
                  {combo.title}
                </h3>
                <p className="text-xl font-bold text-primary-foreground mt-1">
                  {combo.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
