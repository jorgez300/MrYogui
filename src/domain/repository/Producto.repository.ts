import { PrismaClient, Producto } from '@prisma/client'

const prisma = new PrismaClient();

export class ProductoRepository {
  async findAll(): Promise<Producto[]> {
    return prisma.producto.findMany({
      include: { categoria: true }, // Incluye la categoría relacionada
      orderBy: {
        prod_nombre: "asc", // o 'desc' para descendente
      },
    });
  }

  async findById(prod_id: string): Promise<Producto | null> {
    return prisma.producto.findUnique({
      where: { prod_id },
      include: { categoria: true },
    });
  }

  async findByNombre(prod_nombre: string): Promise<Producto | null> {
    return prisma.producto.findUnique({
      where: { prod_nombre },
      include: { categoria: true },
    });
  }


  async create(input: Producto): Promise<Producto> {
    return prisma.producto.create({
      data: {
        prod_nombre: input.prod_nombre,
        prod_desc: input.prod_desc ?? null,
        prod_precio: input.prod_precio,
        prod_vigencia: input.prod_vigencia,
        prod_img: input.prod_img ?? null,
        cat_id: input.cat_id,
      },
    });
  }

  async update(input: Producto): Promise<Producto> {
    return prisma.producto.update({
      where: { prod_id: input.prod_id },
      data: {
        prod_nombre: input.prod_nombre,
        prod_desc: input.prod_desc ?? null,
        prod_precio: input.prod_precio,
        prod_vigencia: input.prod_vigencia,
        prod_img: input.prod_img ?? null,
        cat_id: input.cat_id,
      },
    });
  }

  async delete(prod_id: string): Promise<Producto> {
    return prisma.producto.delete({
      where: { prod_id },
    });
  }

  async findByCategoria(cat_id: string): Promise<Producto[]> {
    return prisma.producto.findMany({
      where: { cat_id },
      include: { categoria: true },
    });
  }
}
