"use server";

import AzureStorageClient from "../clients/AzureStorage.client";
import { Producto } from "../models/Producto";
import { ProductoRepository } from "../repository/Producto.repository";

export const GetListaProductos = async () => {
  const repo = new ProductoRepository();

  return await repo.findAll();
};
export const GetListaProductosByCategoria = async (cat_id: string) => {
  const repo = new ProductoRepository();

  return await repo.findByCategoria(cat_id);
};

export const GetProductoById = async (
  prod_id: string
): Promise<Producto | null> => {
  const repo = new ProductoRepository();
  return await repo.findById(prod_id);
};

export const GuardaProducto = async (data: Producto) => {
  const repo = new ProductoRepository();
  const storageClient = new AzureStorageClient();
  const existingProduct = await repo.findById(data.prod_id);

  //await storageClient.uploadImage(data.prod_img, "image/png");
  //await storageClient.deleteImage(existingProduct.prod_img);

  if (data.prod_img) {
    if (data.prod_img.includes("base64")) {
      data.prod_img = await storageClient.uploadImage(
        data.prod_img,
        "image/png"
      );
    }
  }

  if (existingProduct) {
    if (existingProduct.prod_img) {
      if (existingProduct.prod_img != data.prod_img) {
        await storageClient.deleteImage(existingProduct.prod_img);
      }
    }

    return await repo.update(data);
  } else {
    // Create new category
    return await repo.create(data);
  }
};

export const EliminaProducto = async (data: Producto) => {
  const repo = new ProductoRepository();
  const storageClient = new AzureStorageClient();

  if (data.prod_img && data.prod_img.length > 0) {
    storageClient.deleteImage(data.prod_img);
  }

  await repo.delete(data.prod_id);
};

export const CambiarVigencia = async (data: Producto) => {
  const repo = new ProductoRepository();

  const existingProduct = await repo.findById(data.prod_id);

  if (existingProduct) {
    data.prod_vigencia = !existingProduct.prod_vigencia;
    await repo.update(data);
  } else {
    return;
  }
};
