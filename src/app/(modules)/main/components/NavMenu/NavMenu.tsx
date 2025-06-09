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
import { ProductGroups } from "@/domain/models/ProductGroup";
import { GetProductGroups } from "@/domain/services/ProductGroup.service";

export const NavMenu = () => {
  const [groups, setgroups] = React.useState<ProductGroups[]>([]);

  React.useEffect(() => {
    GetProductGroups()
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
