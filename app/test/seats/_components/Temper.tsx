import {
  ticketTypeToBgColor,
  ticketTypeToInfoText,
  ticketTypeToLabel,
} from "@/app/_constats/ticket";
import TestSessionContext, {
  TicketType,
} from "@/app/_contexts/TestSessionContext";
import { useContext } from "react";

export const Temper = () => {
  const { selectedPaletteType } = useContext(TestSessionContext);

  if (selectedPaletteType === "eraser") return null;

  return (
    <div className="flex flex-col items-center ">
      <div className="flex items-center">
        <div className="w-5 h-6 bg-gray-100 border" />
        <div className="w-1 h-7 bg-gray-400" />
        <div
          className={`w-[220px] h-8 flex items-center justify-center font-semibold text-[14px] ${
            ticketTypeToBgColor[selectedPaletteType as TicketType]
          }`}
        >
          {ticketTypeToLabel[selectedPaletteType as TicketType]}
        </div>
        <div className="w-3 h-9 bg-gray-300" />
      </div>
      <div className="text-xs text-black/80">
        {ticketTypeToInfoText[selectedPaletteType as TicketType]}
      </div>
    </div>
  );
};
