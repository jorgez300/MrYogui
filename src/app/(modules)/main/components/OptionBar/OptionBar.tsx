import { Separator } from "@/components/ui/separator";
import { ContactModal } from "./ContactModal";
import { PaymentMethodsModal } from "./PaymentMethodsModal";

export const OptionBar = () => {
  return (
    <div className="sticky bottom-0 p-4 mb-4 h-[100px] grid grid-cols-1 gap-4 bg-none z-50">
      <div className="align-content-end flex justify-end items-center gap-3">
        <div className="w-fit align-content-center flex justify-center items-center gap-3 border shadow-md rounded-full p-3 bg-gray-200 dark:bg-gray-500">
          <div>
            <PaymentMethodsModal />
          </div>
          <Separator orientation="vertical" />
          <div>
            <ContactModal />
          </div>
        </div>
      </div>
    </div>
  );
};
