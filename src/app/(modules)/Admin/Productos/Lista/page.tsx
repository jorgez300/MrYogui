"use client";

import {
  CambiarVigencia,
  EliminaProducto,
  GetListaProductos,
} from "@/domain/services/Producto.service";

import { useEffect, useState } from "react";
import TablaProductos from "./componentes/TablaProductos";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Producto } from "@/domain/models/Producto";

export default function ProductosListaPage() {
  const [data, setData] = useState<Producto[]>([]);
  const router = useRouter();

  useEffect(() => {}, []);

  useEffect(() => {
    OnBuscar();
  }, []);

  const OnBuscar = async () => {
    const fetchData = async () => {
      const productos = await GetListaProductos();
      setData(productos);
    };
    fetchData();
  };

  const onEliminaProducto = async (data: Producto) => {
    await EliminaProducto(data);
    await OnBuscar();
  };

  const onCambiarVigencia = async (data: Producto) => {
    await CambiarVigencia(data);
    await OnBuscar();
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <div className="w-full">
        <h1 className="text-2xl font-bold">Lista de Productos</h1>
        <p className="text-gray-600">
          Aquí puedes ver y gestionar todas las productos disponibles.
        </p>
      </div>
      <div className="flex justify-end">
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            className="btn btn-primary col-start-3 col-end-5"
            onClick={() => router.push("/Admin/")}
          >
            Volver
          </Button>
          <Button
            variant="default"
            className="btn btn-primary"
            onClick={OnBuscar}
          >
            Actualizar
          </Button>
          <Button
            variant="default"
            className="btn btn-primary"
            onClick={() => router.push("/Admin/Productos/Mantenedor")}
          >
            Nuevo Producto
          </Button>
        </div>
      </div>
      <div className="w-full">
        <TablaProductos
          data={data}
          EliminaProducto={onEliminaProducto}
          CambiarVigencia={onCambiarVigencia}
        />
      </div>
    </div>
  );
}
