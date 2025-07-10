import { Producto } from "./Producto";

export interface Categoria {
  cat_id: string;
  cat_nombre: string;
  cat_orden: number;
  cat_vigencia: boolean;
  productos?: Producto[]; // Relación uno-a-muchos, opcional para evitar cargar productos si no es necesario
}

// Tipos para crear nuevos registros
export interface CategoriaCreateInput {
  cat_nombre: string;
  cat_vigencia?: boolean; // Opcional, ya que tiene un valor por defecto en Prisma
}

// Tipos para actualizar registros (campos parciales)
export interface CategoriaUpdateInput {
  cat_nombre?: string;
  cat_vigencia?: boolean;
}
