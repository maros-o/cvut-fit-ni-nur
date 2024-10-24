import { TicketType } from "../_contexts/TestSessionContext";

export const ticketTypeToLabel: Record<TicketType, string> = {
  senior: "Senior",
  adult: "Základní",
  student: "Student",
  child: "Dítě",
  ztp: "ZTP",
};

export const ticketTypeToPrice: Record<TicketType, number> = {
  senior: 129,
  adult: 149,
  student: 129,
  child: 109,
  ztp: 109,
};

export const ticketTypeToBgColor: Record<TicketType, string> = {
  senior: "bg-red-400",
  adult: "bg-green-400",
  student: "bg-blue-400",
  child: "bg-yellow-400",
  ztp: "bg-purple-400",
};

export const ticketTypeToTextColor: Record<TicketType, string> = {
  senior: "text-red-500",
  adult: "text-green-500",
  student: "text-blue-500",
  child: "text-yellow-500",
  ztp: "text-purple-500",
};
