import { ModeToggle } from "@/components/ThemeToggleButton/ThemeToggle";
import Image from "next/image";
import { NavMenu } from "../NavMenu/NavMenu";

export const Navbar = () => {
  return (
    <div className="sticky top-0 p-4 mb-4 h-fit grid grid-cols-12 gap-4 bg-white dark:bg-gray-600 shadow-md z-50">
      <div className="col-span-2 align-content-start flex justify-start items-center">
        <Image
          src={`/next.svg`}
          alt={`Gallery`}
          width={150}
          height={150}
          className="p-4"
        />
      </div>
      <div className="col-span-8 align-content-center flex justify-center  items-center">
        <NavMenu />
      </div>
      <div className="col-span-2 align-content-end flex justify-end items-center">
        <ModeToggle />
      </div>
    </div>
  );
};
