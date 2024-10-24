import {
  ticketTypeToBgColor,
  ticketTypeToLabel,
  ticketTypeToPrice,
} from "@/app/_constats/ticket";
import TestSessionContext, {
  TicketType,
} from "@/app/_contexts/TestSessionContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useContext } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

export const TicketTypeItem = ({
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
          className={`${ticketTypeToBgColor[type]} w-[30px] h-[30px] rounded-sm drop-shadow-sm cursor-pointer`}
          onClick={() => setSelectedTicketType(type)}
        />
        <div className="flex flex-col">
          <span className="text-sm font-[500] relative">
            {ticketTypeToLabel[type]}
            {info && (
              <PopoverTrigger className="absolute right-[-20px] top-0 text-black/60">
                <IoMdInformationCircleOutline size={18} />
              </PopoverTrigger>
            )}
          </span>{" "}
          <span className="text-xs">{ticketTypeToPrice[type]},-</span>
        </div>
      </div>
      {info && (
        <PopoverContent className="text-sm p-2 w-fit max-w-[300px]">
          <span className="font-semibold">{ticketTypeToLabel[type]}</span>:{" "}
          {info}
        </PopoverContent>
      )}
    </Popover>
  );
};
