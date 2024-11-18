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
import { defaultContact, mockContact } from "../_mock_data/contact";

type ContextData = {
  movie: Movie;
  contact: Contact;
  agreeToTerms: boolean;
  tickets: Ticket[];
  selectedPaletteType: PaletteSelectType;
  seats: SelectSeat[][];
  orderCode: number;
  updateSeat: (row: number, col: number, type: SeatType) => void;
  setSelectedPaletterType: React.Dispatch<
    React.SetStateAction<PaletteSelectType>
  >;
  setAgreeToTerms: React.Dispatch<React.SetStateAction<boolean>>;
  setContact: React.Dispatch<React.SetStateAction<Contact>>;
};

export type Contact = {
  name: string;
  surname: string;
  email: string;
  phonePrefix: string;
  phoneNumber: string;
};

export type TicketType = "senior" | "adult" | "student" | "child" | "ztp";

export type PaletteSelectType = TicketType | "eraser";

export type SeatType = TicketType | "reserved" | "empty";

type Seat = {
  row: number;
  col: number;
};

export type SelectSeat = Seat & {
  type: SeatType;
};

export type Ticket = Seat & {
  type: TicketType;
};

const reserveSeats = (numberOfSeats: number, seats: SelectSeat[][]) => {
  for (let i = 0; i < numberOfSeats; i++) {
    const row = Math.floor(Math.random() * SEAT_ROWS);
    const col = Math.floor(Math.random() * SEAT_COLS);
    if (seats[row][col].type === "empty") {
      seats[row][col].type = "reserved";
    } else {
      i--;
    }
  }
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
  const [contact, setContact] = useState<Contact>(defaultContact);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedPaletteType, setSelectedPaletterType] =
    useState<PaletteSelectType>("adult");
  const [seats, setSeats] = useState<SelectSeat[][]>([]);
  const [orderCode] = useState(Math.floor(Math.random() * 100000));

  const { numberOfReservedSeatsOnStart } = useContext(SettingsContext);

  useEffect(() => {
    setMovie(getRandomMovie());
  }, []);

  useEffect(() => {
    const newSeats: SelectSeat[][] = Array.from({ length: SEAT_ROWS }).map(
      (_, row) =>
        Array.from({ length: SEAT_COLS }).map((_, col) => ({
          row,
          col,
          type: "empty",
        }))
    );
    reserveSeats(numberOfReservedSeatsOnStart, newSeats);
    setSeats(newSeats);
  }, [numberOfReservedSeatsOnStart]);

  useEffect(() => {
    setTickets(
      seats
        .flat()
        .filter((seat) => seat.type !== "empty" && seat.type !== "reserved")
        .map((seat) => ({
          ...seat,
          type: seat.type as TicketType,
        }))
    );
  }, [seats]);

  const updateSeat = useCallback(
    (row: number, col: number, type: SeatType) =>
      setSeats((prev) =>
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
        selectedPaletteType,
        seats,
        orderCode,
        updateSeat,
        setSelectedPaletterType,
        setAgreeToTerms,
        setContact,
      }}
    >
      {children}
    </TestSessionContext.Provider>
  );
};

const TestSessionContext = createContext<ContextData>({} as ContextData);

export default TestSessionContext;
