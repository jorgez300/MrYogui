import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";

interface ProductCardProps {
  index: number;
  src: string;
}

export const ProductCard = (props: ProductCardProps) => {
  return (
    <Card
      key={props.index}
      className="shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <CardHeader>
        <Image
          key={props.index}
          src={props.src}
          alt={`Gallery ${props.index}`}
          width={300}
          height={300}
          className="w-full h-auto rounded-lg shadow-md"
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-xl font-bold">
          Yogui Burger {props.index}
        </CardTitle>
        <CardDescription className="">
          <p>Esta es una descripción breve del contenido.</p>

          <p className="mt-1 text-end font-semibold text-lg">Precio: 10$</p>
        </CardDescription>
      </CardContent>
    </Card>
  );
};
