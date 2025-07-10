"use server";

import { Categoria } from "../models/Categoria";
import { CategoriaRepository } from "../repository/Categoria.repository";
import {
  EliminaProducto,
  GetListaProductosByCategoria,
} from "./Producto.service";

export const GetListaCategorias = async (): Promise<Categoria[]> => {
  const repo = new CategoriaRepository();

  return await repo.findAll();
};

export const GetCategoriasVigentes = async (): Promise<Categoria[]> => {
  const repo = new CategoriaRepository();

  return await repo.findAllVigentes();
};

export const GetCategoriasVigentesConProductos = async (): Promise<
  Categoria[]
> => {
  const repo = new CategoriaRepository();

  return await repo.findAllVigentesConProductos();
};

export const GetCategoriaById = async (
  cat_id: string
): Promise<Categoria | null> => {
  const repo = new CategoriaRepository();
  return await repo.findById(cat_id);
};

export const GuardaCategoria = async (data: Categoria) => {
  const repo = new CategoriaRepository();

  const existingCategory = await repo.findById(data.cat_id);

  if (existingCategory) {
    // Update existing category
    return await repo.update(data);
  } else {
    // Create new category
    return await repo.create(data);
  }
};

export const EliminaCategoria = async (data: Categoria) => {
  const repo = new CategoriaRepository();

  const productos = await GetListaProductosByCategoria(data.cat_id);

  if (productos.length > 0) {
    productos.forEach(async (item) => {
      await EliminaProducto(item);
    });
  }

  await repo.delete(data.cat_id);
};

export const CambiarVigencia = async (data: Categoria) => {
  const repo = new CategoriaRepository();

  const existingCategory = await repo.findById(data.cat_id);

  if (existingCategory) {
    existingCategory.cat_vigencia = !existingCategory.cat_vigencia;
    await repo.update(existingCategory);
  } else {
    return;
  }
};
