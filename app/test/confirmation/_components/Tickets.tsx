import { seatTypeToBgColor } from "@/app/_constats/seats";
import {
  ticketTypeToIcon,
  ticketTypeToLabel,
  ticketTypeToPrice,
  ticketTypeToTextColor,
} from "@/app/_constats/ticket";
import TestSessionContext, { Ticket } from "@/app/_contexts/TestSessionContext";
import { getTicketTotalPrice, ticketsToTypeCount } from "@/app/_utils/tickets";
import { useContext } from "react";

export const Tickets = () => {
  const { tickets } = useContext(TestSessionContext);

  const typesCount = ticketsToTypeCount(tickets);
  const totalPrice = getTicketTotalPrice(tickets);

  return (
    <div className="flex w-full gap-4">
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-1 flex-wrap w-full">
          {Object.entries(typesCount).map(([type, count]) => {
            if (count === 0) return null;
            const t = type as Ticket["type"];
            return (
              <div
                key={type}
                className="flex items-center justify-between gap-1"
              >
                <div className="flex gap-2">
                  <span className="min-w-[20px] font-[500]">{count}x </span>
                  <span className={`${ticketTypeToTextColor[t]} font-[500]`}>
                    {ticketTypeToLabel[t]}
                  </span>
                </div>
                <span>{ticketTypeToPrice[t] * count},- </span>
              </div>
            );
          })}
        </div>
        {tickets.length > 0 && (
          <hr className="my-2 border-t border-black/50 w-full" />
        )}
        <div className="flex w-full gap-1">
          <div className="flex items-center justify-between w-full gap-1">
            <span className="font-[500]">Celkem </span>
            <span>{totalPrice},-</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[50%] gap-1">
        {Object.entries(typesCount).map(([type, count]) => {
          if (count === 0) return null;
          const t = type as Ticket["type"];
          return (
            <div key={type} className="flex flex-wrap gap-1">
              {Array.from({ length: count }).map((_, i) => (
                <div
                  key={i}
                  className={`w-[24px] h-[24px] rounded-sm flex items-center justify-center drop-shadow text-black/80 ${seatTypeToBgColor[t]}`}
                >
                  {ticketTypeToIcon[t]}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
