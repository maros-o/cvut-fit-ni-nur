"use client";

import TestSessionContext from "@/app/_contexts/TestSessionContext";
import { useContext } from "react";

export const MovieHeader = () => {
  const { movie } = useContext(TestSessionContext);

  return (
    <header className="flex flex-col py-2.5 px-3 gap-0.5 bg-gray-100 sticky top-0 z-50 drop-shadow">
      <h1 className="text-xl font-bold truncate">{movie.title}</h1>
      <div className="flex justify-between w-full gap-2 items-center">
        <div className="flex-shrink-0 text-md">
          {movie.day} <span className="font-bold">{movie.datetime}</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {movie.tags.map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-1 bg-white rounded-md text-xs drop-shadow"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
};
