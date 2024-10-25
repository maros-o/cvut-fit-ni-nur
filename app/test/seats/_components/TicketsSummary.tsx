import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TestSessionContext, { Ticket } from "@/app/_contexts/TestSessionContext";
import { getTicketTotalPrice, ticketsToTypeCount } from "../_utils/tickets";
import {
  ticketTypeToLabel,
  ticketTypeToTextColor,
} from "@/app/_constats/ticket";

export const TicketsSummary = ({}: {}) => {
  const { tickets } = useContext(TestSessionContext);
  const typesCount = ticketsToTypeCount(tickets);

  return (
    <div className="pe-3 w-full mb-2">
      <div className="flex flex-col items-center w-full">
        <AnimatePresence mode="sync">
          <motion.div
            className="flex justify-center items-center gap-2.5 flex-wrap mt-2 text-sm font-semibold w-full"
            layout="position"
          >
            {Object.entries(typesCount).map(([type, count]) => {
              if (count === 0) return null;
              const t = type as Ticket["type"];
              return (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1"
                  layout="position"
                  transition={{ duration: 0.2 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={count}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                    >
                      {count}x{" "}
                    </motion.span>
                  </AnimatePresence>
                  <motion.span
                    className={`${ticketTypeToTextColor[t]} font-[500]`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {ticketTypeToLabel[t]}
                  </motion.span>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="sync">
          {tickets.length > 0 && (
            <motion.hr
              layout="position"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.2 }}
              className="my-2 border-t border-black/50 w-[90%]"
            />
          )}
        </AnimatePresence>
        <motion.div
          layout="position"
          transition={{ duration: 0.2 }}
          className="flex w-full text-sm text-center justify-center items-center gap-1"
        >
          <div className="flex items-center gap-1">
            <span>Celkem </span>
            <span className="font-semibold">{tickets.length ?? 0} </span>
            vstupenek za{" "}
            <span className="font-semibold">
              {getTicketTotalPrice(tickets)},-
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
