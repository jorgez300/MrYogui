import { Separator } from "@/components/ui/separator";
import { ProductCard } from "../ProductCard/ProductCard";

interface ProductGroupProps {
  index: number;
  id: string;
  dsc: string;
}

export const ProductGroup = (props: ProductGroupProps) => {
  const images = [
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
  ];

  return (
    <section id={`productGrupo${props.id}`} className="mt-8">
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-4  align-content-center flex justify-center items-center">
          <Separator />
        </div>
        <div className="col-span-4 align-content-center flex justify-center items-center">
          <h1 className="text-3xl font-bold">{props.dsc}</h1>
        </div>
        <div className="col-span-4  align-content-center flex justify-center items-center">
          <Separator />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {images.map((src, index) => (
          <ProductCard key={index} index={index} src={src} />
        ))}
      </div>
    </section>
  );
};
