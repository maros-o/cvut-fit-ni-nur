import { useContext } from "react";
import TestSessionContext, {
  SelectSeat,
} from "@/app/_contexts/TestSessionContext";
import {
  SEAT_COLS,
  SEAT_SIZE_PX,
  seatTypeToBgColor,
} from "@/app/_constats/seats";

export const SeatPicker = ({}: {}) => {
  const { selectedTicketType, updateSeat, selectedSeats } =
    useContext(TestSessionContext);

  const toggleSeatSelection = (seat: SelectSeat) => {
    if (seat.type === "reserved") return;
    const newType =
      seat.type === selectedTicketType ? "empty" : selectedTicketType;
    updateSeat(seat.row, seat.col, newType);
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
      <div className="flex flex-col items-start mt-4">
        <div
          className={`grid gap-1 mb-1`}
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
                      className={`select-none outline outline-1 outline-gray-300 rounded-sm flex items-center justify-center bg-white relative`}
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
                    className={`rounded-sm flex items-center justify-center cursor-pointer ${
                      seatTypeToBgColor[seat.type]
                    }`}
                    style={{ width: SEAT_SIZE_PX, height: SEAT_SIZE_PX }}
                  ></div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
