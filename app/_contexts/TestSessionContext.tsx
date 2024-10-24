"use client";

import {
  useState,
  createContext,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { getRandomMovie, Movie } from "../_mock_data/movies";
import { SEAT_COLS, SEAT_ROWS } from "../_constats/seats";
import SettingsContext from "./SettingsContext";

type ContextData = {
  movie: Movie;
  contact: Contact;
  agreeToTerms: boolean;
  tickets: Ticket[];
  selectedTicketType: TicketType;
  setSelectedTicketType: (type: TicketType) => void;
  selectedSeats: SelectSeat[][];
  updateSeat: (row: number, col: number, type: SelectSeatType) => void;
};

export type Contact = {
  name: string;
  surname: string;
  email: string;
  phonePrefix: string;
  phoneNumber: string;
};

export type TicketType = "senior" | "adult" | "student" | "child" | "ztp";

export type Seat = {
  row: number;
  col: number;
};

export type SelectSeatType = "reserved" | "empty" | TicketType;

export type SelectSeat = Seat & {
  type: SelectSeatType;
};

export type Ticket = {
  seat: Seat;
  type: TicketType;
};

const reserveSeats = (numberOfSeats: number, selectedSeats: SelectSeat[][]) => {
  for (let i = 0; i < numberOfSeats; i++) {
    const row = Math.floor(Math.random() * SEAT_ROWS);
    const col = Math.floor(Math.random() * SEAT_COLS);
    if (selectedSeats[row][col].type === "empty") {
      selectedSeats[row][col].type = "reserved";
    } else {
      i--;
    }
  }
  return selectedSeats;
};

export const TestSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [movie, setMovie] = useState<Movie>({
    title: "",
    datetime: "",
    day: "",
    tags: [],
    thumbnail_url: "",
  });
  const [contact, setContact] = useState<Contact>({
    name: "",
    surname: "",
    email: "",
    phonePrefix: "420",
    phoneNumber: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicketType, setSelectedTicketType] =
    useState<TicketType>("adult");
  const [selectedSeats, setSelectedSeats] = useState<SelectSeat[][]>([]);

  const { numberOfReservedSeatsOnStart } = useContext(SettingsContext);

  useEffect(() => {
    setMovie(getRandomMovie());
    setSelectedSeats(
      reserveSeats(
        numberOfReservedSeatsOnStart,
        Array.from({ length: SEAT_ROWS }).map((_, row) =>
          Array.from({ length: SEAT_COLS }).map((_, col) => ({
            row,
            col,
            type: "empty",
          }))
        )
      )
    );
  }, []);

  const updateSeat = useCallback(
    (row: number, col: number, type: SelectSeatType) =>
      setSelectedSeats((prev) =>
        prev.map((prevRow) =>
          prevRow.map((prevCol) =>
            prevCol.row === row && prevCol.col === col
              ? { row, col, type }
              : prevCol
          )
        )
      ),
    []
  );

  return (
    <TestSessionContext.Provider
      value={{
        movie,
        contact,
        agreeToTerms,
        tickets,
        selectedTicketType,
        setSelectedTicketType,
        selectedSeats,
        updateSeat,
      }}
    >
      {children}
    </TestSessionContext.Provider>
  );
};

const TestSessionContext = createContext<ContextData>({} as ContextData);

export default TestSessionContext;
