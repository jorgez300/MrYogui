import { Navbar } from "./(modules)/main/components/NavBar/NavBar";
import { ProductGroup } from "./(modules)/main/components/ProductGroup/ProductGroup";

export default function Home() {
  const groups = [
    {
      id: "Combo",
      dsc: "Combos",
    },
    {
      id: "Oferta",
      dsc: "Ofertas",
    },
    {
      id: "Hamburguesa",
      dsc: "Hamburguesas",
    },
    {
      id: "HotDog",
      dsc: "Hot Dogs",
    },
    {
      id: "Pizza",
      dsc: "Pizzas",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 gap-4 p-4">
        {groups.map((group, index) => (
          <ProductGroup key={index} index={index} id={group.id} dsc={group.dsc} />
        ))}
      </div>
    </>
  );
}
