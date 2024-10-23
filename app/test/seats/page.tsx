"use client";
import { useContext } from "react";
import TestSessionContext from "@/app/_contexts/TestSessionContext";
import { MovieHeader } from "../_components/MovieHeader";

export default function SeatsPage() {
  const { movie } = useContext(TestSessionContext);

  return (
    <>
      <MovieHeader movie={movie} />
    </>
  );
}
