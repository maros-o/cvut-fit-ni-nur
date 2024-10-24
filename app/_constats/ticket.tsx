import { TicketType } from "../_contexts/TestSessionContext";
import { MdElderly } from "react-icons/md";
import { FaChild } from "react-icons/fa6";
import { PiStudent } from "react-icons/pi";
import { MdAccessible } from "react-icons/md";
import { MdDirectionsWalk } from "react-icons/md";

export const MAX_TICKETS = 10;

export const ticketTypeToLabel: Record<TicketType, string> = {
  senior: "Senior",
  adult: "Základní",
  student: "Student",
  child: "Dítě",
  ztp: "ZTP",
};

export const ticketTypeToIcon: Record<TicketType, JSX.Element> = {
  senior: <MdElderly size={22} />,
  adult: <MdDirectionsWalk size={22} />,
  student: <PiStudent size={22} />,
  child: <FaChild size={18} />,
  ztp: <MdAccessible size={22} />,
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
