import { PrismaClient, Categoria } from "@/generated/prisma";

const prisma = new PrismaClient();

export class CategoriaRepository {
  async findAll(): Promise<Categoria[]> {
    return prisma.categoria.findMany({
      orderBy: [{ cat_orden: "asc" }, { cat_nombre: "asc" }],
    });
  }

  async findById(cat_id: string): Promise<Categoria | null> {
    return prisma.categoria.findUnique({
      where: { cat_id },
    });
  }

  async findByNombre(cat_nombre: string): Promise<Categoria | null> {
    return prisma.categoria.findUnique({
      where: { cat_nombre },
    });
  }

  async findAllVigentes(): Promise<Categoria[]> {
    return prisma.categoria.findMany({
      where: { cat_vigencia: true },
      orderBy: [{ cat_orden: "asc" }, { cat_nombre: "asc" }],
    });
  }

  async findAllVigentesConProductos(): Promise<Categoria[]> {
    return prisma.categoria.findMany({
      where: {
        cat_vigencia: true,
        productos: {
          some: {}, // Verifica que haya al menos un producto asociado
        },
      },
      orderBy: [{ cat_orden: "asc" }, { cat_nombre: "asc" }],
      include: {
        productos: true, // Opcional: incluye los productos si necesitas sus datos
      },
    });
  }

  async create(input: Categoria): Promise<Categoria> {
    return prisma.categoria.create({
      data: {
        cat_nombre: input.cat_nombre,
        cat_orden: input.cat_orden,
        cat_vigencia: input.cat_vigencia,
      },
    });
  }

  async update(input: Categoria): Promise<Categoria> {
    return prisma.categoria.update({
      where: { cat_id: input.cat_id },
      data: {
        cat_nombre: input.cat_nombre,
        cat_orden: input.cat_orden,
        cat_vigencia: input.cat_vigencia,
      },
    });
  }

  async delete(cat_id: string): Promise<Categoria> {
    return prisma.categoria.delete({
      where: { cat_id },
    });
  }
}
