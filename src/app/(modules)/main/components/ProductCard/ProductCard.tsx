import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Product } from "@/domain/models/Product";
import { MoveUpRight } from "lucide-react";

import Image from "next/image";

interface ProductCardProps {
  index: number;
  product: Product;
}

export const ProductCard = (props: ProductCardProps) => {
  return (
    <>
      <Card
        key={props.index}
        className="shadow-md hover:shadow-xl transition-shadow duration-300"
      >
        <CardHeader>
          <Image
            key={props.index}
            src={props.product.src}
            alt={`Gallery ${props.product.title}`}
            width={300}
            height={300}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-xl font-bold">
            {props.product.title}
          </CardTitle>
          <CardDescription className="">
            <p>{props.product.dsc ?? ""}</p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="align-content-start flex justify-start items-center">
                <p className="text-end font-semibold text-lg">
                  Precio: {props.product.price}$
                </p>
              </div>
              <div className="align-content-end flex justify-end items-center">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-10 shadow-md"
                    >
                      <MoveUpRight />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[85vw] md:w-[50vw]">
                    <SheetHeader className="h-full">
                      <SheetTitle></SheetTitle>
                      <SheetDescription asChild>
                        <div className="h-full flex flex-col justify-center items-center gap-4 py-5 px-2">
                          <div>
                            <Image
                              key={props.index}
                              src={props.product.src}
                              alt={`Gallery ${props.index}`}
                              width={300}
                              height={300}
                              className="w-full h-auto rounded-lg shadow-md"
                            />
                          </div>
                          <div>
                            <h1 className="text-2xl font-bold">
                              {props.product.title}
                            </h1>
                          </div>
                          <div>
                            <p>{props.product.dsc ?? ""}</p>
                          </div>
                          <div>
                            <p className="text-end font-semibold text-lg">
                              Precio: {props.product.price}$
                            </p>
                          </div>
                        </div>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </CardDescription>
        </CardContent>
      </Card>
    </>
  );
};
