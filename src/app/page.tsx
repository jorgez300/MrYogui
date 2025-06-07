import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { ModeToggle } from "./components/ThemeToggleButton/ThemeToggle";

export default function Home() {
  const images = [
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
    "/burger.png",
  ];

  return (
    <>
      <div className="p-4 mb-4 h-5 align-content-end flex justify-end">
        <ModeToggle />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {images.map((src, index) => (
          <Card
            key={index}
            className="shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <CardHeader>
              <Image
                key={index}
                src={`/burger.png`}
                alt={`Gallery ${index}`}
                width={300}
                height={300}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-xl font-bold">
                Yogui Burger {index}
              </CardTitle>
              <CardDescription className="">
                <p>Esta es una descripción breve del contenido.</p>

                <p className="mt-1 text-end font-semibold text-lg">
                  Precio: 10$
                </p>
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
