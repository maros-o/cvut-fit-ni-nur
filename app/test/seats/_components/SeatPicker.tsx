import { useContext } from "react";
import TestSessionContext, {
  SelectSeat,
  TicketType,
} from "@/app/_contexts/TestSessionContext";
import {
  SEAT_COLS,
  SEAT_SIZE_PX,
  seatTypeToBgColor,
} from "@/app/_constats/seats";
import { MAX_TICKETS, ticketTypeToIcon } from "@/app/_constats/ticket";
import { useToast } from "@/hooks/use-toast";

export const SeatPicker = ({}: {}) => {
  const { selectedTicketType, updateSeat, selectedSeats, tickets } =
    useContext(TestSessionContext);
  const { toast } = useToast();

  const toggleSeatSelection = (seat: SelectSeat) => {
    if (seat.type === "reserved") return;
    if (seat.type === "empty" && tickets.length === MAX_TICKETS) {
      toast({
        title: "Nelze vybrat",
        description: `Maximální počet vstupenek je ${MAX_TICKETS}`,
        duration: 5000,
      });
      return;
    }
    updateSeat(
      seat.row,
      seat.col,
      seat.type === selectedTicketType ? "empty" : selectedTicketType
    );
  };

  return (
    <div className="rounded-md bg-gray-100 py-3 w-[424px] flex flex-col flex-shrink-0">
      <div className={`flex justify-center w-full`}>
        <div
          className={`h-5 w-[90%] bg-gray-300 rounded-sm text-xs flex items-center justify-center`}
        >
          Plátno
        </div>
      </div>
      <div className="flex flex-col items-start">
        <div
          className={`grid gap-1 mt-0.5`}
          style={{
            gridTemplateColumns: `repeat(${SEAT_COLS + 1}, ${SEAT_SIZE_PX})`,
          }}
        >
          <div style={{ width: SEAT_SIZE_PX }} />
          {Array.from({ length: SEAT_COLS }).map((_, colIndex) => (
            <div
              key={`col-${colIndex}`}
              className={`flex items-center justify-center font-bold`}
              style={{ width: SEAT_SIZE_PX, height: SEAT_SIZE_PX }}
            >
              {colIndex + 1}
            </div>
          ))}
        </div>
        {selectedSeats.map((row, rowIdx) => (
          <div key={`row-${rowIdx}`} className="flex items-center mb-1 gap-1">
            <div
              className={`flex items-center justify-center font-bold`}
              style={{ width: SEAT_SIZE_PX, height: SEAT_SIZE_PX }}
            >
              {String.fromCharCode(65 + rowIdx)}
            </div>
            <div
              className={`grid gap-1`}
              style={{
                gridTemplateColumns: `repeat(${SEAT_COLS}, ${SEAT_SIZE_PX})`,
              }}
            >
              {row.map((seat) => {
                if (seat.type === "reserved") {
                  return (
                    <div
                      key={`${rowIdx}-${seat.col}`}
                      className={`select-none drop-shadow rounded-sm flex items-center justify-center bg-white relative ${
                        seatTypeToBgColor[seat.type]
                      }`}
                      style={{ width: SEAT_SIZE_PX, height: SEAT_SIZE_PX }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center select-none">
                        <span className="text-3xl font-thin text-gray-300 transform rotate-45 pb-0.5">
                          |
                        </span>
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={`${rowIdx}-${seat.col}`}
                    onClick={() => toggleSeatSelection(seat)}
                    className={`rounded-sm flex items-center justify-center cursor-pointer drop-shadow text-black/80 ${
                      seatTypeToBgColor[seat.type]
                    }`}
                    style={{ width: SEAT_SIZE_PX, height: SEAT_SIZE_PX }}
                  >
                    {ticketTypeToIcon[seat.type as TicketType]}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
