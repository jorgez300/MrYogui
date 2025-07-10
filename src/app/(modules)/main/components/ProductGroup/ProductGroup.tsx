"use client";
import { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";
import { ProductCard } from "../ProductCard/ProductCard";
import { Producto } from "@/domain/models/Producto";
import {
  GetListaProductos,
  GetListaProductosByCategoria,
} from "@/domain/services/Producto.service";

interface ProductGroupProps {
  index: number;
  id: string;
  dsc: string;
}

export const ProductGroup = (props: ProductGroupProps) => {
  const [products, setproducts] = useState<Producto[]>([]);

  useEffect(() => {
    GetListaProductosByCategoria(props.id)
      .then((data) => {
        setproducts(data);
      })
      .catch((error) => {
        console.error("Error fetching product groups:", error);
      });
  }, []);

  return (
    <section id={`productGrupo${props.id}`} className="mb-8 scroll-mt-22">
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
        {products.map((product, index) => (
          <ProductCard key={index} index={index} product={product} />
        ))}
      </div>
    </section>
  );
};
