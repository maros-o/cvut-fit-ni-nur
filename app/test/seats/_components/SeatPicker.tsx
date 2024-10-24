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
import { motion, AnimatePresence } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  const seatVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 200 },
    },
  };

  return (
    <motion.div
      className="rounded-md bg-gray-100 py-3 w-[424px] flex flex-col flex-shrink-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex justify-center w-full"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="h-5 w-[90%] bg-gray-300 rounded-sm text-xs flex items-center justify-center">
          Plátno
        </div>
      </motion.div>
      <div className="flex flex-col items-start">
        <div
          className="grid gap-1 mt-0.5"
          style={{
            gridTemplateColumns: `repeat(${SEAT_COLS + 1}, ${SEAT_SIZE_PX})`,
          }}
        >
          <div style={{ width: SEAT_SIZE_PX }} />
          {Array.from({ length: SEAT_COLS }).map((_, colIndex) => (
            <motion.div
              key={`col-${colIndex}`}
              className="flex items-center justify-center font-bold"
              style={{ width: SEAT_SIZE_PX, height: SEAT_SIZE_PX }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: colIndex * 0.05 }}
            >
              {colIndex + 1}
            </motion.div>
          ))}
        </div>
        {selectedSeats.map((row, rowIdx) => (
          <motion.div
            key={`row-${rowIdx}`}
            className="flex items-center mb-1 gap-1"
            variants={rowVariants}
          >
            <motion.div
              className="flex items-center justify-center font-bold"
              style={{ width: SEAT_SIZE_PX, height: SEAT_SIZE_PX }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: rowIdx * 0.1 }}
            >
              {String.fromCharCode(65 + rowIdx)}
            </motion.div>

            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${SEAT_COLS}, ${SEAT_SIZE_PX})`,
              }}
            >
              {row.map((seat) => {
                if (seat.type === "reserved") {
                  return (
                    <motion.div
                      key={`${rowIdx}-${seat.col}`}
                      className={`select-none drop-shadow rounded-sm flex items-center justify-center bg-white relative ${
                        seatTypeToBgColor[seat.type]
                      }`}
                      style={{ width: SEAT_SIZE_PX, height: SEAT_SIZE_PX }}
                      variants={seatVariants}
                    >
                      <div className="absolute inset-0 flex items-center justify-center select-none">
                        <span className="text-3xl font-thin text-gray-300 transform rotate-45 pb-0.5">
                          |
                        </span>
                      </div>
                    </motion.div>
                  );
                }
                return (
                  <motion.div
                    key={`${rowIdx}-${seat.col}`}
                    onClick={() => toggleSeatSelection(seat)}
                    className={`rounded-sm flex items-center justify-center cursor-pointer drop-shadow text-black/80 ${
                      seatTypeToBgColor[seat.type]
                    }`}
                    style={{ width: SEAT_SIZE_PX, height: SEAT_SIZE_PX }}
                    variants={seatVariants}
                  >
                    {ticketTypeToIcon[seat.type as TicketType]}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
