import {
  ticketTypeToBgColor,
  ticketTypeToInfoText,
  ticketTypeToLabel,
  ticketTypeToPrice,
} from "@/app/_constats/ticket";
import TestSessionContext, {
  TicketType,
} from "@/app/_contexts/TestSessionContext";
import { useContext } from "react";

export const Temper = () => {
  const { selectedPaletteType } = useContext(TestSessionContext);

  const ticketType = selectedPaletteType as TicketType;

  if (selectedPaletteType === "eraser")
    return (
      <div className="flex flex-col items-center font-semibold text-[14px]">
        Mazací guma
      </div>
    );

  return (
    <div className="flex flex-col items-center ">
      <div className="flex items-center">
        <div className="w-5 h-6 bg-gray-100 border" />
        <div className="w-1 h-7 bg-gray-400" />
        <div
          className={`w-[220px] h-8 flex gap-1 items-center justify-center font-semibold text-[14px] ${ticketTypeToBgColor[ticketType]}`}
        >
          {ticketTypeToLabel[ticketType]}{" "}
          <span className="font-normal text-black/80">
            {ticketTypeToPrice[ticketType]},-
          </span>
        </div>
        <div className="w-3 h-9 bg-gray-300" />
      </div>
      <div className="text-xs text-black/80">
        {ticketTypeToInfoText[ticketType]}
      </div>
    </div>
  );
};
