import { ModeToggle } from "@/components/ThemeToggleButton/ThemeToggle";
//import Image from "next/image";
import { NavMenu } from "../NavMenu/NavMenu2";

export const Navbar = () => {

          /*<Image
          src={`/next.svg`}
          alt={`Gallery`}
          width={150}
          height={150}
          className="h-fit p-4"
        />*/


  return (
    <div className="sticky top-0 p-4 mb-4 h-[100px] grid grid-cols-12 gap-4 shadow-md z-50  bg-gray-200 dark:bg-gray-500">
      <div className="col-span-2 align-content-start flex justify-start items-center">
        <NavMenu />
      </div>
      <div className="col-span-8 align-content-center flex justify-center  items-center">

      </div>
      <div className="col-span-2 align-content-end flex justify-end items-center">
        <ModeToggle />
      </div>
    </div>
  );
};
