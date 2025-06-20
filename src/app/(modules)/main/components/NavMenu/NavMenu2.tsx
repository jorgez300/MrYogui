"use client";

import * as React from "react";
import Link from "next/link";

import { ProductGroups } from "@/domain/models/ProductGroup";
import { GetProductGroups } from "@/domain/services/ProductGroup.service";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SquareMenu } from "lucide-react";

export const NavMenu = () => {
  const [groups, setgroups] = React.useState<ProductGroups[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

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
    <Sheet
      open={isOpen}
      onOpenChange={(newValue) => {
        if (!newValue) setIsOpen(false); // Cierra el Sheet cuando el evento lo requiera
      }}
    >
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="size-10 shadow-md"  onClick={() => setIsOpen(true)}>
          <SquareMenu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[400px] sm:w-[540px]">
        <SheetHeader className="h-full">
          <SheetTitle></SheetTitle>
          <SheetDescription asChild>
            <div className="h-full flex flex-col justify-evenly items-center gap-4 py-5 px-2">
              {groups.map((group, index) => (
                <div key={index} className="w-full">
                  <h1 key={index} className="text-2xl font-bold">
                    <Link
                      key={index}
                      href={`#productGrupo${group.id}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="text-xl font-bold py-4">{group.dsc}</div>
                    </Link>
                  </h1>
                </div>
              ))}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
