import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PhoneOutgoing } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export const ContactModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-13 shadow-md rounded-full"
        >
          <PhoneOutgoing />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contacto</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Card className="@container/card">
          <CardHeader>
            <CardTitle className="text-lg font-bold tabular-nums @[250px]/card:text-xl">
              Telefonos
            </CardTitle>

            <div className="line-clamp-1 flex gap-2 font-medium ml-2">
              Telefono 1: <span className="font-normal">12345678</span>
            </div>
            <div className="line-clamp-1 flex gap-2 font-medium ml-2">
              Telefono 2: <span className="font-normal">12345678</span>
            </div>
            <div className="line-clamp-1 flex gap-2 font-medium ml-2">
              Telefono 3: <span className="font-normal">12345678</span>
            </div>
          </CardHeader>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardTitle className="text-lg font-bold tabular-nums @[250px]/card:text-xl">
              Direccion
            </CardTitle>

            <div className="line-clamp-1 flex gap-2 font-medium ml-2">
              3801 University Lake Dr, Anchorage, Alaska
            </div>
          </CardHeader>
        </Card>
        <Card className="@container/card" onClick={() => {
            console.log('first')
            window.open(
              "https://maps.app.goo.gl/vshzbSy8jFmF1NgW7",
              "_blank",
              "noopener,noreferrer"
            );
          }}>
          <CardHeader>
            <Image
              src={`/Mapa.png`}
              alt={`Gallery`}
              width={300}
              height={300}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </CardHeader>
        </Card>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
