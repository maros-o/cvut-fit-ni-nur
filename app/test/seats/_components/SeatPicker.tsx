import { useContext } from "react";
import TestSessionContext, {
  SelectSeat,
} from "@/app/_contexts/TestSessionContext";
import { SEAT_COLS, SEAT_SIZE, seatTypeToBgColor } from "@/app/_constats/seats";

export const SeatPicker = ({}: {}) => {
  const {
    selectedTicketType,
    setSelectedTicketType,
    updateSeat,
    selectedSeats,
  } = useContext(TestSessionContext);

  const toggleSeatSelection = (seat: SelectSeat) => {
    if (seat.type === "reserved") return;
    const newType =
      seat.type === selectedTicketType ? "empty" : selectedTicketType;
    updateSeat(seat.row, seat.col, newType);
  };

  return (
    <div className="w-full py-3 pe-3">
      <div className="w-full p-2 ps-2 rounded-md bg-gray-100">
        <div className={`flex justify-center my-4 ps-${SEAT_SIZE} pe-3`}>
          <div
            className={`w-full h-5 bg-gray-300 rounded-sm text-xs flex items-center justify-center`}
          >
            Plátno
          </div>
        </div>
        <div className="flex flex-col items-start mt-4">
          <div className={`grid grid-cols-${SEAT_COLS + 1} gap-1 mb-1`}>
            <div className={`w-${SEAT_SIZE}`} />
            {Array.from({ length: SEAT_COLS }).map((_, colIndex) => (
              <div
                key={`col-${colIndex}`}
                className={`w-${SEAT_SIZE} h-${SEAT_SIZE} flex items-center justify-center font-bold`}
              >
                {colIndex + 1}
              </div>
            ))}
          </div>
          {selectedSeats.map((row, rowIdx) => (
            <div key={`row-${rowIdx}`} className="flex items-center mb-1 gap-1">
              <div
                className={`w-${SEAT_SIZE} h-${SEAT_SIZE} flex items-center justify-center font-bold`}
              >
                {String.fromCharCode(65 + rowIdx)}
              </div>
              <div className={`grid grid-cols-${SEAT_COLS} gap-1`}>
                {row.map((seat) => {
                  if (seat.type === "reserved") {
                    return (
                      <div
                        key={`${rowIdx}-${seat.col}`}
                        className={`w-${SEAT_SIZE} h-${SEAT_SIZE} select-none outline outline-1 outline-gray-300 rounded-sm flex items-center justify-center bg-transparent relative`}
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
                      className={`w-${SEAT_SIZE} h-${SEAT_SIZE} rounded-sm flex items-center justify-center cursor-pointer ${
                        seatTypeToBgColor[seat.type]
                      }`}
                    ></div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
