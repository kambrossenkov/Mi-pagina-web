import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { categoryProducts } from "@/data/categoryProducts";
import PeyaHeader from "@/components/PeyaHeader";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const categoryName = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "";

  const products =
    categoryProducts[categoryName] ||
    categoryProducts[
      Object.keys(categoryProducts).find(
        (k) => k.toLowerCase() === categoryName.toLowerCase()
      ) || ""
    ] ||
    [];

  const totalResults = products.length;

  return (
    <div className="min-h-screen bg-background">
      <PeyaHeader />
      <div className="container py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link to="/" className="hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Inicio
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium uppercase">{categoryName}</span>
        </div>

        <h1 className="text-2xl font-bold text-foreground uppercase mb-2">{categoryName}</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Mostrando {totalResults > 0 ? `los ${totalResults}` : "0"} resultados
        </p>

        {products.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">No se encontraron productos en esta categoría.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product, index) => (
              <div
                key={index}
                onClick={() => {
                  if (!product.agotado) {
                    navigate(`/producto/${encodeURIComponent(product.name)}?cat=${encodeURIComponent(categoryName)}`);
                  }
                }}
                style={{ cursor: product.agotado ? 'default' : 'pointer' }}
                className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow group relative"
              >
                <div className="relative bg-secondary/30 flex items-center justify-center p-4 h-48">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-40 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.agotado && (
                    <div className="absolute bottom-2 left-2 bg-destructive/90 text-destructive-foreground text-xs font-bold px-2 py-1 rounded">
                      AGOTADO
                    </div>
                  )}
                </div>
                <div className="p-3 space-y-1">
                  {!product.agotado && product.stock !== undefined && (
                    <span className="text-xs text-primary font-medium">
                      Disponible: {product.stock} unidades
                    </span>
                  )}
                  <h4 className="font-bold text-foreground text-sm leading-tight line-clamp-2">
                    {product.name}
                  </h4>
                  <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">
                    {categoryName}
                  </span>
                  <div className="flex items-center">
                    <span className="text-base font-bold text-foreground">{product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
