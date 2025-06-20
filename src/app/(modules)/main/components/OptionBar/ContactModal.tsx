import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  ExternalLink,
  PhoneOutgoing,
} from "lucide-react";

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
import { Card, CardHeader } from "@/components/ui/card";

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
          <CardHeader className="px-1">
            <div className="line-clamp-1 flex gap-2 font-medium ml-2">
              Telefono 1: <span className="font-normal">0424-3708296</span>
            </div>
            <div className="line-clamp-1 flex gap-2 font-medium ml-2">
              Telefono 2: <span className="font-normal">0412-9463878</span>
            </div>
            <div className="line-clamp-1 flex gap-2 font-medium ml-2">
              Instagram:
              <span className="font-normal w-full">
                <a
                  href="https://www.instagram.com/mryoguismokehouse?igsh=MTA2bmlha3ZpZWZycQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  @mryoguismokehouse <ExternalLink className="ms-2" />
                </a>
              </span>
            </div>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader className="px-1">
            <div className="line-clamp-1 flex gap-2 font-medium ml-2">
              Lunes, Martes, Jueves, Viernes, Sabado, Domingo
            </div>
            <div className="line-clamp-1 flex gap-2 font-medium ml-2">
              <span className="font-normal">
                8:00am a 3:00pm - 6:00pm a 11:00pm
              </span>
            </div>
          </CardHeader>
        </Card>
        <Card
          className="@container/card"
          onClick={() => {
            window.open(
              "https://maps.app.goo.gl/vshzbSy8jFmF1NgW7",
              "_blank",
              "noopener,noreferrer"
            );
          }}
        >
          <CardHeader className="px-2">
            <div className="line-clamp-1 flex gap-2 font-normal ml-2">
              Av.Winston Churchill Sur, a 100mts de Semáforo El Vea al lado de
              la antigua Farmacia Francisca Duarte, El Tigre, Edo. Anzoátegui
            </div>
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
