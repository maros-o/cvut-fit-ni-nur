import { ticketTypeToPrice } from "@/app/_constats/ticket";
import { Ticket } from "@/app/_contexts/TestSessionContext";

export const ticketsToTypeCount = (tickets: Ticket[]) => {
  const result = {
    adult: 0,
    student: 0,
    child: 0,
    senior: 0,
    ztp: 0,
  };
  tickets.forEach((ticket) => {
    result[ticket.type]++;
  });
  return result;
};

export const getTicketTotalPrice = (tickets: Ticket[]) =>
  tickets.reduce((acc, ticket) => acc + ticketTypeToPrice[ticket.type], 0);
