"use server";

import BackendClient from "../clients/Backend.client";
import { Product } from "../models/Product";


export const GetProducts = async (groupId: string) => {
  const client = new BackendClient();
  await client.Init();

  let result = null;

  result = await client.get("products.json");


  return result.filter((product: Product) => product.group === groupId);


};
