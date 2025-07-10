import { Categoria } from "./Categoria";

export interface Producto {
  prod_id: string;
  prod_nombre: string;
  prod_desc: string | null;
  prod_precio: number; // Float en Prisma se mapea a number en TypeScript
  prod_vigencia: boolean;
  prod_img: string | null;
  cat_id: string;
  categoria?: Categoria; // Relación muchos-a-uno, opcional para evitar cargar la categoría si no es necesario
}

export interface ProductoCreateInput {
  prod_nombre: string;
  prod_desc: string | null; // Puede ser null si no se proporciona una descripción  
  prod_precio: number; // Float en Prisma se mapea a number en TypeScript
  prod_vigencia: boolean;
  prod_img: string;
  cat_id: string;
}

export interface ProductoUpdateInput {
  prod_nombre: string;
  prod_desc: string;
  prod_precio: number; // Float en Prisma se mapea a number en TypeScript
  prod_vigencia: boolean;
  prod_img: string;
  cat_id: string;
}
