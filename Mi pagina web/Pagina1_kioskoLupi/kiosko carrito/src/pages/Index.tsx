import PeyaHeader from "@/components/PeyaHeader";
import CategoryBar from "@/components/CategoryBar";
import PromoBanners from "@/components/PromoBanners";
import ProductSection from "@/components/ProductSection";
import AllProductsSection from "@/components/AllProductsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PeyaHeader />
      <CategoryBar />
      <PromoBanners />
      <ProductSection title="⭐ Más vendidos" />
      <AllProductsSection />
    </div>
  );
};

export default Index;
