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

import Image from "next/image";

interface ProductCardProps {
  index: number;
  src: string;
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
            src={props.src}
            alt={`Gallery ${props.index}`}
            width={300}
            height={300}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-xl font-bold">
            Yogui Burger {props.index}
          </CardTitle>
          <CardDescription className="">
            <p>Esta es una descripción breve del contenido.</p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="align-content-start flex justify-start items-center">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button>Detalle</Button>
                  </SheetTrigger>
                  <SheetContent className="w-[1500px]">
                    <SheetHeader className="h-full">
                      <SheetTitle></SheetTitle>
                      <SheetDescription asChild>
                        <div className="h-full flex flex-col justify-center items-center gap-4 py-5 px-2">
                          <div>
                            <Image
                              key={props.index}
                              src={props.src}
                              alt={`Gallery ${props.index}`}
                              width={300}
                              height={300}
                              className="w-full h-auto rounded-lg shadow-md"
                            />
                          </div>
                          <div>
                            <h1 className="text-2xl font-bold">
                              Yogui Burger {props.index}
                            </h1>
                          </div>
                          <div>
                            <p>Esta es una descripción breve del contenido.</p>
                          </div>
                          <div>
                            <p className="text-end font-semibold text-lg">
                              Precio: 10$
                            </p>
                          </div>
                        </div>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
              <div className="align-content-end flex justify-end items-center">
                <p className="text-end font-semibold text-lg">Precio: 10$</p>
              </div>
            </div>
          </CardDescription>
        </CardContent>
      </Card>
    </>
  );
};
