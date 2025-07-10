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
import { Producto } from "@/domain/models/Producto";
import { MoveUpRight } from "lucide-react";

import Image from "next/image";

interface ProductCardProps {
  index: number;
  product: Producto;
}

export const ProductCard = (props: ProductCardProps) => {
  function ObtieneImagen(src: string | null | undefined): string {
    if (src === null || src === undefined || src === "" || src === "null") {
      return "https://compartidosstorage1.blob.core.windows.net/mryogui/base2.png";
    } else {
      if (src?.includes("base64")) {
        return src;
      }
      return `https://compartidosstorage1.blob.core.windows.net/mryogui/${src}`;
    }
  }

  return (
    <>
      <Card
        key={props.index}
        className="shadow-md hover:shadow-xl transition-shadow duration-300"
      >
        <CardHeader>
          <Image
            key={props.index}
            src={ObtieneImagen(props.product.prod_img)}
            alt={`Gallery ${props.product.prod_nombre}`}
            width={300}
            height={300}
            className="w-full h-auto rounded-lg shadow-md mb-1"
          />
        </CardHeader>
        <CardContent className="flex flex-col h-full">
          <CardTitle className="text-xl font-bold">
            {props.product.prod_nombre}
          </CardTitle>
          <CardDescription>
            <p>{props.product.prod_desc ?? ""}</p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="align-content-start flex justify-start items-center">
                <p className="text-end font-semibold text-lg">
                  Precio: {props.product.prod_precio}$
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
                              src={ObtieneImagen(props.product.prod_img)}
                              alt={`Gallery ${props.product.prod_nombre}`}
                              width={300}
                              height={300}
                              className="w-full h-auto rounded-lg shadow-md"
                            />
                          </div>
                          <div>
                            <h1 className="text-2xl font-bold">
                              {props.product.prod_nombre}
                            </h1>
                          </div>
                          <div className="">
                            <p>{props.product.prod_desc ?? ""}</p>
                          </div>
                          <div>
                            <p className="self-end text-end font-semibold text-lg">
                              Precio: {props.product.prod_precio}$
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
