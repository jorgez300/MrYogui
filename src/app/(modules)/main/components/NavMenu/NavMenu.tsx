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


export const NavMenu = () => {

  const groups = [
    {
      id: "Combo",
      dsc: "Combos",
    },
    {
      id: "Oferta",
      dsc: "Ofertas",
    },
    {
      id: "Hamburguesa",
      dsc: "Hamburguesas",
    },
    {
      id: "HotDog",
      dsc: "Hot Dogs",
    },
    {
      id: "Pizza",
      dsc: "Pizzas",
    },
  ];

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="w-[600px] h-fit text-xl font-bold">Menu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[600px] gap-4 align-content-center flex justify-center">
              <li className="w-full">
                {groups.map((group, index) => (
                  <NavigationMenuLink key={index} asChild>
                    <Link href={`#productGrupo${group.id}`}>
                      <div className="text-xl font-bold py-4">{group.id}</div>
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
