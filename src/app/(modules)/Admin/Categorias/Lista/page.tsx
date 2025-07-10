"use client";

import {
  CambiarVigencia,
  EliminaCategoria,
  GetListaCategorias,
} from "@/domain/services/Categoria.service";
import { Categoria } from "@/domain/models/Categoria";
import TablaCategorias from "./componentes/TablaCategorias";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CategoriasListaPage() {
  const [data, setData] = useState<Categoria[]>([]);
  const router = useRouter();

  useEffect(() => {
    OnBuscar();
  }, []);

  const OnBuscar = async () => {
    const fetchData = async () => {
      const categorias = await GetListaCategorias();
      setData(categorias);
    };
    fetchData();
  };

  const onEliminaCategoria = async (categoria: Categoria) => {
    await EliminaCategoria(categoria);
    await OnBuscar();
  };

  const onCambiarVigencia = async (categoria: Categoria) => {
    await CambiarVigencia(categoria);
    await OnBuscar();
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <div className="w-full">
        <h1 className="text-2xl font-bold">Lista de Categorías</h1>
        <p className="text-gray-600">
          Aquí puedes ver y gestionar todas las categorías disponibles.
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
            onClick={() => router.push("/Admin/Categorias/Mantenedor")}
          >
            Nueva Categoría
          </Button>
        </div>
      </div>

      <div className="w-full">
        <TablaCategorias
          data={data}
          EliminaCategoria={onEliminaCategoria}
          CambiarVigencia={onCambiarVigencia}
        />
      </div>
    </div>
  );
}
