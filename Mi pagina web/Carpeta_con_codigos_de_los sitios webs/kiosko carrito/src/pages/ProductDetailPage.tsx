import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { categoryProducts } from "@/data/categoryProducts";
import PeyaHeader from "@/components/PeyaHeader";

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const productName = decodeURIComponent(slug || "");
  const category = searchParams.get("cat") || "";

  // Find product across all categories
  let product: { name: string; image: string; price: string; agotado?: boolean; stock?: number } | null = null;
  let foundCategory = category;

  for (const [catName, products] of Object.entries(categoryProducts)) {
    const found = products.find(
      (p) => p.name.toLowerCase() === productName.toLowerCase()
    );
    if (found) {
      product = found;
      foundCategory = catName;
      break;
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <PeyaHeader />
        <div className="container py-12 text-center">
          <p className="text-muted-foreground">Producto no encontrado.</p>
          <button onClick={() => navigate(-1)} className="mt-4 text-primary font-medium">
            Volver
          </button>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(
      { name: product!.name, image: product!.image, price: product!.price, category: foundCategory },
      quantity
    );
    navigate(-1);
  };

  // Find related products from same category
  const related = (categoryProducts[foundCategory] || [])
    .filter((p) => p.name !== product!.name && !p.agotado);

  return (
    <div className="min-h-screen bg-background">
      <PeyaHeader />
      <div className="container max-w-lg mx-auto py-4">
        {/* Back button */}
        <button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </button>

        {/* Product image */}
        <div className="bg-secondary/30 rounded-2xl flex items-center justify-center p-8 mb-6 relative">
          <img
            src={product.image}
            alt={product.name}
            className="h-56 w-auto object-contain"
          />
          {product.agotado && (
            <div className="absolute bottom-4 left-4 bg-destructive/90 text-destructive-foreground text-sm font-bold px-3 py-1 rounded">
              AGOTADO
            </div>
          )}
        </div>

        {/* Product info */}
        <h1 className="text-2xl font-bold text-foreground mb-1">{product.name}</h1>
        <p className="text-sm text-muted-foreground mb-2">{foundCategory}</p>
        <p className="text-3xl font-bold text-foreground mb-1">{product.price}</p>
        {product.stock !== undefined && !product.agotado && (
          <p className="text-xs text-muted-foreground mb-4">
            Disponible: {product.stock} unidades
          </p>
        )}

        {/* Related products - all from same category */}
        {related.length > 0 && (
          <div className="mb-6 mt-6">
            <h3 className="text-lg font-bold text-foreground mb-3">Opciones para combinar</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {related.map((r, i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/producto/${encodeURIComponent(r.name)}?cat=${encodeURIComponent(foundCategory)}`)}
                  className="min-w-[140px] max-w-[160px] cursor-pointer bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="bg-secondary/30 flex items-center justify-center p-3 h-32">
                    <img src={r.image} alt={r.name} className="h-24 w-auto object-contain" />
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium text-foreground line-clamp-2">{r.name}</p>
                    <p className="text-sm font-bold text-foreground">{r.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom bar - Add to cart */}
        {!product.agotado && (
          <div className="sticky bottom-0 bg-background border-t border-border py-4 mt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-bold text-foreground">Tu producto</span>
              <span className="text-lg font-bold text-foreground">{product.price}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 border border-border rounded-full px-3 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Minus className="h-4 w-4 text-foreground" />
                </button>
                <span className="text-lg font-bold text-foreground w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Plus className="h-4 w-4 text-foreground" />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-full text-base hover:bg-primary/90 transition-colors"
              >
                Agregar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
