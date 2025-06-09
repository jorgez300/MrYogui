"use server";

import BackendClient from "../clients/Backend.client";
import { ProductGroups } from "../models/ProductGroup";


export const GetProductGroups = async (): Promise<ProductGroups[]> => {
  const client = new BackendClient();
  await client.Init();

  let result = null;

  result = await client.get("productgroups.json");

  return result as ProductGroups[];
};
