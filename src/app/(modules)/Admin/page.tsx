'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-6 gap-4 p-4 ">
      <Button
        variant="default"
        className="btn btn-primary col-start-3 col-end-5"
        onClick={() => router.push("/Admin/Categorias/Lista")}
      >
       Categorias
      </Button>

      <Button
        variant="default"
        className="btn btn-primary col-start-3 col-end-5"
        onClick={() => router.push("/Admin/Productos/Lista")}
      >
        Productos
      </Button>
    </div>
  );
}
