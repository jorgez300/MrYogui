"use client";

import { useEffect, useState } from "react";
import { Navbar } from "./(modules)/main/components/NavBar/NavBar";
import { ProductGroup } from "./(modules)/main/components/ProductGroup/ProductGroup";

import { OptionBar } from "./(modules)/main/components/OptionBar/OptionBar";
import { Categoria } from "@/domain/models/Categoria";
import { GetCategoriasVigentesConProductos } from "@/domain/services/Categoria.service";

export default function Home() {
  const [groups, setgroups] = useState<Categoria[]>([]);

  useEffect(() => {
    GetCategoriasVigentesConProductos()
      .then((data) => {
        setgroups(data);
      })
      .catch((error) => {
        console.error("Error fetching product groups:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 gap-4 p-4">
        {groups.map((group, index) => (
          <ProductGroup
            key={index}
            index={index}
            id={group.cat_id}
            dsc={group.cat_nombre}
          />
        ))}
      </div>
      <OptionBar/>
    </>
  );
}
