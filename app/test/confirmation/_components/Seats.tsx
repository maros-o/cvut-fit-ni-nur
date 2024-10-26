import { SEAT_COLS, seatTypeToBgColor } from "@/app/_constats/seats";
import { ticketTypeToIcon } from "@/app/_constats/ticket";
import TestSessionContext, {
  TicketType,
} from "@/app/_contexts/TestSessionContext";
import { getTicketRows } from "@/app/_utils/tickets";
import { useContext } from "react";
import { BsThreeDots } from "react-icons/bs";

export const Seats = () => {
  const { seats, tickets } = useContext(TestSessionContext);

  if (typeof window === "undefined") return null;

  const rows = getTicketRows(tickets);
  const rowsWithGaps = rows.reduce((acc, row, idx) => {
    if (idx === 0) return [];
    if (rows[idx - 1] + 1 < row) {
      return [...acc, row];
    }
    return acc;
  }, [] as number[]);
  const fixedWidth = 3 * 4 + 4 + 3 * 4 + 4 * SEAT_COLS;
  const dynamicSeatSizePx =
    (Math.min(window.innerWidth, 425) - fixedWidth) / (SEAT_COLS + 1.5) + "px";

  return (
    <div className="flex flex-col items-start bg-gray-200 rounded-md pb-2 mb-2 w-fit pe-3 ps-1 opacity-70 ">
      <div
        className={`grid gap-1 mt-0.5`}
        style={{
          gridTemplateColumns: `repeat(${SEAT_COLS + 1}, ${dynamicSeatSizePx})`,
        }}
      >
        <div style={{ width: dynamicSeatSizePx }} />
        {Array.from({ length: SEAT_COLS }).map((_, colIndex) => (
          <div
            key={`col-${colIndex}`}
            className={`flex items-center justify-center font-semibold`}
            style={{ width: dynamicSeatSizePx, height: dynamicSeatSizePx }}
          >
            {colIndex + 1}
          </div>
        ))}
      </div>
      {rows.map((row, rowIdx) => (
        <>
          {rowsWithGaps.includes(row) && (
            <div
              key={`gap-${rowIdx}`}
              className="flex items-center justify-center w-full h-[14px] pb-[4px] gap-1"
            >
              <BsThreeDots />
            </div>
          )}
          <div key={`row-${rowIdx}`} className="flex items-center mb-1 gap-1">
            <div
              className={`flex items-center justify-center font-semibold`}
              style={{ width: dynamicSeatSizePx, height: dynamicSeatSizePx }}
            >
              {String.fromCharCode(65 + rowIdx)}
            </div>
            <div
              className={`grid gap-1`}
              style={{
                gridTemplateColumns: `repeat(${SEAT_COLS}, ${dynamicSeatSizePx})`,
              }}
            >
              {seats[row].map((seat) => {
                if (seat.type === "reserved") {
                  return (
                    <div
                      key={`${rowIdx}-${seat.col}`}
                      className={`select-none drop-shadow rounded-sm flex items-center justify-center bg-white relative ${
                        seatTypeToBgColor[seat.type]
                      }`}
                      style={{
                        width: dynamicSeatSizePx,
                        height: dynamicSeatSizePx,
                      }}
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
                    className={`rounded-sm flex items-center justify-center drop-shadow text-black/80 ${
                      seatTypeToBgColor[seat.type]
                    }`}
                    style={{
                      width: dynamicSeatSizePx,
                      height: dynamicSeatSizePx,
                    }}
                  >
                    {ticketTypeToIcon[seat.type as TicketType]}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};
