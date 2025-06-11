"use client";

import { useEffect, useState } from "react";
import { Navbar } from "./(modules)/main/components/NavBar/NavBar";
import { ProductGroup } from "./(modules)/main/components/ProductGroup/ProductGroup";
import { GetProductGroups } from "@/domain/services/ProductGroup.service";
import { ProductGroups } from "@/domain/models/ProductGroup";
import { OptionBar } from "./(modules)/main/components/OptionBar/OptionBar";

export default function Home() {
  const [groups, setgroups] = useState<ProductGroups[]>([]);

  useEffect(() => {
    GetProductGroups()
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
            id={group.id}
            dsc={group.dsc}
          />
        ))}
      </div>
      <OptionBar/>
    </>
  );
}
