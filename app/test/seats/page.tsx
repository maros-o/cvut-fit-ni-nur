"use client";
import { useContext } from "react";
import TestSessionContext from "@/app/_contexts/TestSessionContext";
import { MovieHeader } from "../_components/MovieHeader";
import { NextButton, BackButton } from "../_components/Navigation";

export default function SeatsPage() {
  return (
    <div className="flex flex-col h-full">
      <MovieHeader />
      <article className="flex flex-col h-full">main</article>
      <nav className="flex justify-center items-center gap-4 p-4 w-full ">
        <BackButton href="/" />
        <div className="flex justify-center items-center w-full">
          Výběr míst
        </div>
        <NextButton href="./contact" disabled />
      </nav>
    </div>
  );
}
