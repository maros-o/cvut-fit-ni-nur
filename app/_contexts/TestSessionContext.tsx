"use client";

import { useState, createContext, useEffect, useCallback } from "react";
import { getRandomMovie, Movie } from "../_mock_data/movies";

type ContextData = {
  movie: Movie;
  contact: Contact;
  agreeToTerms: boolean;
  tickets: Ticket[];
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

export type Ticket = {
  seat: Seat;
  type: TicketType;
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

  useEffect(() => {
    setMovie(getRandomMovie());
  }, []);

  return (
    <TestSessionContext.Provider
      value={{
        movie,
        contact,
        agreeToTerms,
        tickets,
      }}
    >
      {children}
    </TestSessionContext.Provider>
  );
};

const TestSessionContext = createContext<ContextData>({} as ContextData);

export default TestSessionContext;
