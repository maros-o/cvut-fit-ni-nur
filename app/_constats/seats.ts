import { SelectSeatType } from "../_contexts/TestSessionContext";

export const SEAT_ROWS = 9;
export const SEAT_COLS = 10;
export const SEAT_SIZE = 8;

export const seatTypeToBgColor: Record<SelectSeatType, string> = {
  reserved: "bg-gradient-to-r from-gray-500 to-gray-400",
  empty: "bg-gradient-to-r from-gray-300 to-gray-200",
  senior: "bg-gradient-to-r from-red-500 to-red-400",
  adult: "bg-gradient-to-r from-green-500 to-green-400",
  student: "bg-gradient-to-r from-blue-500 to-blue-400",
  child: "bg-gradient-to-r from-yellow-500 to-yellow-400",
  ztp: "bg-gradient-to-r from-purple-500 to-purple-400",
};
