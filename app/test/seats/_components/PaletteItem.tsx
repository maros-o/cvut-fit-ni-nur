import { ticketTypeToBgColor } from "@/app/_constats/ticket";
import TestSessionContext, {
  TicketType,
} from "@/app/_contexts/TestSessionContext";
import { useContext } from "react";

export const PaletteItem = ({
  type,
  className,
}: {
  type: TicketType;
  className: string;
}) => {
  const { selectedTicketType, setSelectedTicketType } =
    useContext(TestSessionContext);

  return (
    <div
      className={`${className} ${
        ticketTypeToBgColor[type]
      } absolute w-10 h-10 rounded-full drop-shadow cursor-pointer transition-transform duration-200 ${
        selectedTicketType === type
          ? "outline outline-2 outline-gray-600 scale-105"
          : ""
      }`}
      onClick={() => setSelectedTicketType(type)}
    >
      <div className="absolute w-4 h-4 top-2 right-2 rounded-full bg-white/30"></div>
    </div>
  );
};
