import { SelectSeatType } from "../_contexts/TestSessionContext";

export const SEAT_ROWS = 8;
export const SEAT_COLS = 10;
export const SEAT_SIZE = 8;
export const SEAT_SIZE_PX = 4 * SEAT_SIZE + "px";

export const seatTypeToBgColor: Record<SelectSeatType, string> = {
  reserved: "bg-gradient-to-r from-gray-600 to-gray-500",
  empty: "bg-white",
  senior: "bg-gradient-to-r from-red-400 to-red-300",
  adult: "bg-gradient-to-r from-green-400 to-green-300",
  student: "bg-gradient-to-r from-blue-400 to-blue-300",
  child: "bg-gradient-to-r from-yellow-400 to-yellow-300",
  ztp: "bg-gradient-to-r from-purple-400 to-purple-300",
};
