"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { GetCategoriasVigentesConProductos } from "@/domain/services/Categoria.service";
import { Categoria } from "@/domain/models/Categoria";


export const NavMenu = () => {
  const [groups, setgroups] = React.useState<Categoria[]>([]);

  React.useEffect(() => {
    GetCategoriasVigentesConProductos()
      .then((data) => {
        setgroups(data);
      })
      .catch((error) => {
        console.error("Error fetching product groups:", error);
      });
  }, []);


  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-xl font-bold">
            Menu
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="">
              <li className="w-full">
                {groups.map((group, index) => (
                  <NavigationMenuLink key={index} asChild>
                    <Link href={`#productGrupo${group.cat_id}`}>
                      <div className="text-xl font-bold py-4">{group.cat_nombre}</div>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
