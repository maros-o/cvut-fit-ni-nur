import {
  ticketTypeToBgColor,
  ticketTypeToIcon,
  ticketTypeToLabel,
  ticketTypeToPrice,
} from "@/app/_constats/ticket";
import TestSessionContext, {
  TicketType,
} from "@/app/_contexts/TestSessionContext";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useContext } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

export const TicketTypeList = () => {
  return (
    <div className="flex flex-col gap-0.5 pt-1.5">
      <TicketTypeItem type="adult" />
      <TicketTypeItem
        type="student"
        info="S platným studentským průkazem do 26 let včetně"
      />
      <TicketTypeItem
        type="child"
        info="Do 12 let včetně. Dítě do 3 let nemusí platit vstupné, nemá ale nárok na vlastní sedačku."
      />
      <TicketTypeItem type="senior" info="Nad 60 let včetně" />
      <TicketTypeItem
        type="ztp"
        info="Doprovod (jedna osoba) pro ZTP/P má vstupenku zdarma. Pro slevu ZTP nebo ZTP/P musíte předložit platný průkaz."
      />
    </div>
  );
};

const TicketTypeItem = ({
  type,
  info,
}: {
  type: TicketType;
  info?: string;
}) => {
  const { selectedTicketType, setSelectedTicketType } =
    useContext(TestSessionContext);

  return (
    <Popover>
      <div
        className={`flex items-center gap-2 px-2 py-1 rounded-sm pe-[20px] text-left ${
          selectedTicketType === type
            ? " outline outline-gray-500 outline-2"
            : ""
        }`}
      >
        <div
          className={`${ticketTypeToBgColor[type]} w-[30px] h-[30px] rounded-sm drop-shadow-sm cursor-pointer flex items-center justify-center`}
          onClick={() => setSelectedTicketType(type)}
        >
          {ticketTypeToIcon[type]}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-[500] relative">
            {ticketTypeToLabel[type]}
            {info && (
              <PopoverTrigger className="absolute right-[-20px] top-0 text-black/60 z-10">
                <IoMdInformationCircleOutline size={18} />
              </PopoverTrigger>
            )}
          </span>{" "}
          <span className="text-xs">{ticketTypeToPrice[type]},-</span>
        </div>
      </div>
      <PopoverContent className="text-sm p-2 w-fit max-w-[300px]">
        <span className="font-semibold">{ticketTypeToLabel[type]}</span>: {info}
      </PopoverContent>
    </Popover>
  );
};
