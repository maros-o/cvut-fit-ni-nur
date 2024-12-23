import {
  ticketTypeToBgColor,
  ticketTypeToIcon,
  ticketTypeToInfoText,
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
      <TicketTypeItem type="student" info={ticketTypeToInfoText["student"]} />
      <TicketTypeItem type="child" info={ticketTypeToInfoText["child"]} />
      <TicketTypeItem type="senior" info={ticketTypeToInfoText["senior"]} />
      <TicketTypeItem type="ztp" info={ticketTypeToInfoText["ztp"]} />
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
  const { selectedPaletteType, setSelectedPaletterType } =
    useContext(TestSessionContext);

  return (
    <Popover>
      <div
        className={`flex items-center gap-2 px-2 py-1 rounded-sm pe-[20px] text-left cursor-pointer ${
          selectedPaletteType === type
            ? " outline outline-gray-500 outline-2"
            : ""
        }`}
        onClick={() => setSelectedPaletterType(type)}
      >
        <div
          className={`${ticketTypeToBgColor[type]} w-[30px] h-[30px] rounded-sm drop-shadow-sm flex items-center justify-center`}
        >
          {ticketTypeToIcon[type]}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-[500] relative">
            {ticketTypeToLabel[type]}
            {info && (
              <PopoverTrigger
                className="absolute right-[-20px] top-0 text-black/60 z-10"
                onClick={(e) => e.stopPropagation()}
              >
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
