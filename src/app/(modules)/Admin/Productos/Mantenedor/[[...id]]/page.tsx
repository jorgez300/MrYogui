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
  GetProductoById,
  GuardaProducto,
} from "@/domain/services/Producto.service";
import { Producto } from "@/domain/models/Producto";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Categoria } from "@/domain/models/Categoria";
import { GetListaCategorias } from "@/domain/services/Categoria.service";
import { ImagenProducto } from "@/domain/models/ImagenProducto";
import { ProductCard } from "@/app/(modules)/main/components/ProductCard/ProductCard";

const caracteresEspecialesRegex = /^[a-zA-Z0-9ÑñáéíóúÁÉÍÓÚ \-\*\.,()]*$/i;
const SoloNumerosRegex = /^[0-9]+$/;

const FormSchema = z.object({
  prod_nombre: z
    .string()
    .min(5, {
      message: "Nombre de producto debe tener al menos 5 caracteres.",
    })
    .max(20, {
      message: "Nombre de producto debe tener maximo 20 caracteres.",
    })
    .refine((value) => caracteresEspecialesRegex.test(value), {
      message: "Contiene caracteres especiales no admitidos",
    }),
  prod_desc: z
    .string()
    .min(5, {
      message: "Descripcion de producto debe tener al menos 5 caracteres.",
    })
    .max(20, {
      message: "Descripcion de producto debe tener maximo 50 caracteres.",
    })
    .refine((value) => caracteresEspecialesRegex.test(value), {
      message: "Contiene caracteres especiales no admitidos",
    }),
  prod_precio: z
    .number({
      required_error: "El precio es obligatorio",
      invalid_type_error: "El precio debe ser un número",
    })
    .min(0.01, { message: "El precio debe ser al menos 0.01" })
    .max(1000, { message: "El precio no puede ser mayor a 1000" })
    .refine((value) => Number(value.toFixed(1)) === value, {
      message: "El precio debe tener máximo 1 decimal",
    }),
  prod_vigencia: z.boolean(),
  prod_img: z
    .string()
    .max(1024 * 200, {
      message: "La imagen no puede ser mayor a 200KB",
    })
    .optional(),
  cat_id: z.string(),
});

export default function ProductosMantenedorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string | undefined>();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [imagenProducto, setImagenProducto] = useState<ImagenProducto>({
    src: "https://compartidosstorage1.blob.core.windows.net/mryogui/base2.png",
    mimeType: "image/png",
  });

  const [cardProducto, setCardProducto] = useState<Producto>({
    prod_id: "",
    prod_nombre: "",
    prod_desc: "",
    prod_precio: 0,
    prod_vigencia: true,
    prod_img: "",
    cat_id: "",
  });
  const router = useRouter();
  useEffect(() => {
    GetListaCategorias().then((data) => {
      if (data) {
        setCategorias(data);
      }
    });

    params.then((p) => {
      if (!p.id) return;
      if (p.id.length > 0) {
        setId(p.id[0]);
      }
    });
  }, []);

  useEffect(() => {
    if (id) {
      GetProductoById(id).then((data) => {
        if (data) {
          form.setValue("prod_nombre", data.prod_nombre);
          form.setValue("prod_desc", data.prod_desc ?? "");
          form.setValue("prod_precio", data.prod_precio);
          form.setValue("prod_vigencia", data.prod_vigencia);
          form.setValue("prod_img", data.prod_img ?? "");
          form.setValue("cat_id", data.cat_id);

          /*setCardProducto({
            ...data,
            prod_img:
              data.prod_img ||
              data.prod_img == null ||
              data.prod_img?.length == 0
                ? "base2.png"
                : data.prod_img,
          });*/

          setCardProducto(data);

          setImagenProducto({
            src:
              data.prod_img ||
              data.prod_img == null ||
              data.prod_img?.length == 0
                ? `https://compartidosstorage1.blob.core.windows.net/mryogui/${"base2.png"}`
                : `https://compartidosstorage1.blob.core.windows.net/mryogui/${data.prod_img}`,
            mimeType: "image/png",
          });
        }
      });
    }
  }, [id]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prod_nombre: "",
      prod_desc: "",
      prod_precio: 1,
      prod_vigencia: true,
      cat_id: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const input: Producto = {
      prod_id: id ?? "",
      prod_nombre: data.prod_nombre,
      prod_desc: data.prod_desc ?? null,
      prod_precio: data.prod_precio,
      prod_vigencia: data.prod_vigencia,
      prod_img: data.prod_img ?? "",
      cat_id: data.cat_id,
    };

    GuardaProducto(input)
      .then(() => {
        Volver();
      })
      .catch((error) => {
        console.error("Error al guardar la producto:", error);
      });
  }

  function updatePreview() {
    const input: Producto = {
      prod_id: "",
      prod_nombre: form.getValues("prod_nombre"),
      prod_desc: form.getValues("prod_desc"),
      prod_precio: form.getValues("prod_precio"),
      prod_vigencia: form.getValues("prod_vigencia"),
      prod_img: form.getValues("prod_img") ?? "",
      cat_id: form.getValues("cat_id"),
    };

    setCardProducto(input);
  }

  function Volver() {
    router.push("/Admin/Productos/Lista");
  }

  function Limpiar() {
    if (id) {
      setId(undefined);
      router.push("/Admin/Productos/Mantenedor");
    } else {
      form.reset();
      updatePreview();
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <div className="w-full">
        <h1 className="text-2xl font-bold">Lista de Productos</h1>
        <p className="text-gray-600">
          Aquí puedes ver y gestionar todas las productos disponibles.
        </p>
      </div>

      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-4 gap-4 p-4"
          >
            <FormField
              control={form.control}
              name="prod_nombre"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;

                        field.onChange(value);

                        updatePreview();
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Ingresar nombre del producto.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prod_desc"
              render={({ field }) => (
                <FormItem className="col-start-1 col-end-3">
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder=""
                      className="resize-none"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;

                        field.onChange(value);

                        updatePreview();
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Ingresar resumen descriptivo del producto.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prod_precio"
              render={({ field }) => (
                <FormItem className="col-start-1 col-end-3">
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Convierte el valor a número decimal
                        const parsed = value ? parseFloat(value) : undefined;
                        field.onChange(parsed);

                        updatePreview();
                      }}
                    />
                  </FormControl>
                  <FormDescription>Ingresar precio</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cat_id"
              render={({ field }) => (
                <FormItem className="col-start-1 col-end-3">
                  <FormLabel>Categoria</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem
                          key={categoria.cat_id}
                          value={categoria.cat_id}
                        >
                          {categoria.cat_nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prod_vigencia"
              render={({ field }) => (
                <FormItem className="col-start-1 col-end-3 flex flex-row items-center gap-2">
                  <FormControl>
                    <Checkbox
                      className="me-4 h-8 w-8"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>
                    Indique si el producto debe ser mostrado a los usuarios
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prod_img"
              render={({ field }) => (
                <FormItem className="col-start-1 col-end-3">
                  <FormLabel>Imagen</FormLabel>
                  <FormControl>
                    <Input
                      accept="image/png"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setImagenProducto({
                              src: reader.result as string,
                              mimeType: file.type,
                            });

                            field.onChange(reader.result as string);

                            updatePreview();
                          };
                          reader.readAsDataURL(file);
                        } else {
                          field.onChange("");
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Ingresar imagen del producto.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-start-1 col-end-2">
              <ProductCard index={0} product={cardProducto} />
            </div>
            <div className="col-start-1 col-end-3">
              <Button type="submit" className="mx-2">
                Guardar
              </Button>
              <Button type="button" className="mx-2" onClick={Volver}>
                Volver
              </Button>
              <Button type="button" className="mx-2" onClick={Limpiar}>
                Limpiar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
