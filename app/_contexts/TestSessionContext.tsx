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
import { mockContact } from "../_mock_data/contact";

type ContextData = {
  movie: Movie;
  contact: Contact;
  agreeToTerms: boolean;
  tickets: Ticket[];
  selectedTicketType: TicketType;
  seats: SelectSeat[][];
  setSelectedTicketType: React.Dispatch<React.SetStateAction<TicketType>>;
  updateSeat: (row: number, col: number, type: SelectSeatType) => void;
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

export type SelectSeatType = "reserved" | "empty" | TicketType;

type Seat = {
  row: number;
  col: number;
};

export type SelectSeat = Seat & {
  type: SelectSeatType;
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
  const [contact, setContact] = useState<Contact>(mockContact);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicketType, setSelectedTicketType] =
    useState<TicketType>("adult");
  const [seats, setSeats] = useState<SelectSeat[][]>([]);

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
    // temp
    newSeats[0][0].type = "adult";
    newSeats[1][1].type = "child";
    newSeats[2][2].type = "senior";
    newSeats[3][3].type = "ztp";
    newSeats[6][5].type = "ztp";
    newSeats[4][4].type = "adult";

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
    (row: number, col: number, type: SelectSeatType) =>
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
        selectedTicketType,
        seats,
        updateSeat,
        setSelectedTicketType,
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
