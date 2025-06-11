import { Button } from "@/components/ui/button";

import { DollarSign } from "lucide-react";

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
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export const PaymentMethodsModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-13 shadow-md rounded-full"
        >
          <DollarSign className="" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Metodos de Pago</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Card className="@container/card">
          <CardHeader>
            <CardTitle className="text-lg font-bold tabular-nums @[250px]/card:text-xl">
              Pago Movil
            </CardTitle>

            <div className="line-clamp-1 flex gap-2 font-medium ml-2">
              Telefono: <span className="font-normal">12345678</span>
            </div>
            <div className="line-clamp-1 flex gap-2 font-medium ml-2">
              Cedula: <span className="font-normal">12345678</span>
            </div>
            <div className="line-clamp-1 flex gap-2 font-medium ml-2">
              Banco: <span className="font-normal">1234566</span>
            </div>
          </CardHeader>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardTitle className="text-lg font-bold tabular-nums @[250px]/card:text-xl">
              Pago Movil
            </CardTitle>

            <div className="line-clamp-1 flex gap-2 font-medium ml-2">
              Telefono: <span className="font-normal">12345678</span>
            </div>
            <div className="line-clamp-1 flex gap-2 font-medium ml-2">
              Cedula: <span className="font-normal">12345678</span>
            </div>
            <div className="line-clamp-1 flex gap-2 font-medium ml-2">
              Banco: <span className="font-normal">1234566</span>
            </div>
          </CardHeader>
        </Card>
                <Card className="@container/card">
          <CardHeader>
            <CardTitle className="text-lg font-bold tabular-nums @[250px]/card:text-xl">
              Pago Movil
            </CardTitle>

            <div className="line-clamp-1 flex gap-2 font-medium ml-2">
              Telefono: <span className="font-normal">12345678</span>
            </div>
            <div className="line-clamp-1 flex gap-2 font-medium ml-2">
              Cedula: <span className="font-normal">12345678</span>
            </div>
            <div className="line-clamp-1 flex gap-2 font-medium ml-2">
              Banco: <span className="font-normal">1234566</span>
            </div>
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
