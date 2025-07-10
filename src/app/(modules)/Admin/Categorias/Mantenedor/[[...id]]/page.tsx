"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  GetCategoriaById,
  GuardaCategoria,
} from "@/domain/services/Categoria.service";
import { useRouter } from "next/navigation";
import { Categoria } from "@/generated/prisma";

const caracteresEspecialesRegex = /^[a-zA-Z0-9ÑñáéíóúÁÉÍÓÚ \-\*\.,()]*$/i;
const SoloNumerosRegex = /^[0-9]+$/;

const FormSchema = z.object({
  cat_nombre: z
    .string()
    .min(5, {
      message: "Nombre de categoria debe tener al menos 5 caracteres.",
    })
    .max(20, {
      message: "Nombre de categoria debe tener maximo 20 caracteres.",
    })
    .refine((value) => caracteresEspecialesRegex.test(value), {
      message: "Contiene caracteres especiales no admitidos",
    }),
  cat_orden: z.string(),
  cat_vigencia: z.boolean(),
});

export default function CategoriasMantenedorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string | undefined>();
  const router = useRouter();
  const arregloOrden = Array.from({ length: 15 }, (_, index) => index + 1);

  useEffect(() => {
    params.then((p) => {
      if (!p.id) return;
      if (p.id.length > 0) {
        setId(p.id[0]);
      }
    });
  }, []);

  useEffect(() => {
    if (id) {
      GetCategoriaById(id).then((data) => {
        if (data) {
          form.setValue("cat_nombre", data.cat_nombre);
          form.setValue("cat_orden", data.cat_orden.toString());
          form.setValue("cat_vigencia", data.cat_vigencia);
        }
      });
    }
  }, [id]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cat_nombre: "",
      cat_orden: "99",
      cat_vigencia: true,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);

    const input: Categoria = {
      cat_id: id || "",
      cat_nombre: data.cat_nombre,
      cat_orden: parseInt(data.cat_orden),
      cat_vigencia: data.cat_vigencia,
    };

    GuardaCategoria(input)
      .then(() => {
        Volver();
      })
      .catch((error) => {
        alert("Error al guardar la categoría");
      });
  }

  function Volver() {
    router.push("/Admin/Categorias/Lista");
  }

  function Limpiar() {
    if (id) {
      setId(undefined);
      router.push("/Admin/Categorias/Mantenedor");
    } else {
      form.reset();
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <div className="w-full p-2">
        <h1 className="text-2xl font-bold">
          {id ? "Editar" : "Crear"} Categoria
        </h1>
        <p className="text-gray-600">
          Aquí puedes modificar o crear Categorias disponibles.
        </p>
      </div>

      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="cat_nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    Ingresar nombre de la categoría.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cat_orden"
              render={({ field }) => (
                <FormItem className="col-start-1 col-end-3">
                  <FormLabel>Orden</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Indicar orden" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {arregloOrden.map((item) => (
                        <SelectItem key={item} value={item.toString()}>
                          {item.toString()}
                        </SelectItem>
                      ))}
                      <SelectItem key={"99"} value={"99"}>
                        Ultimo
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Esto indica el orden en que apareceran al cliente 1 seran
                    mostrados primero
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cat_vigencia"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2">
                  <FormControl>
                    <Checkbox
                      className="me-4 h-8 w-8"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>
                    Indique si la categoría debe ser mostrada a los usuarios
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mx-2">
              Guardar
            </Button>
            <Button type="button" className="mx-2" onClick={Volver}>
              Volver
            </Button>
            <Button type="button" className="mx-2" onClick={Limpiar}>
              Limpiar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
