"use client";
import { useContext, useState } from "react";
import TestSessionContext, {
  TicketType,
} from "@/app/_contexts/TestSessionContext";
import { MovieHeader } from "../_components/MovieHeader";
import { NextButton, BackButton } from "../_components/Navigation";
import {
  ticketTypeToBgColor,
  ticketTypeToLabel,
  ticketTypeToPrice,
} from "@/app/_constats/ticket";

export default function SeatsPage() {
  const { selectedTicketType } = useContext(TestSessionContext);

  return (
    <div className="flex flex-col h-full">
      <MovieHeader />
      <article className="flex flex-col h-full p-4">
        <div className="flex gap-6">
          <ul className="flex flex-col gap-0.5">
            <TicketTypeItem type="adult" />
            <TicketTypeItem type="student" />
            <TicketTypeItem type="child" />
            <TicketTypeItem type="senior" />
            <TicketTypeItem type="ztp" />
          </ul>
          <div className="w-full bg-orange-200 relative rounded-lg">
            <PaletteItem className="top-[10px] left-[10px]" type="adult" />
            <PaletteItem className="top-[10px] right-[10px]" type="student" />
            <PaletteItem className="bottom-[10px] left-[10px]" type="child" />
            <PaletteItem className="bottom-[10px] right-[10px]" type="senior" />
            <PaletteItem className="top-[40px] left-[60px]" type="ztp" />
          </div>
        </div>
      </article>
      <HoldToDisplayText />
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

const TicketTypeItem = ({ type }: { type: TicketType }) => {
  const { selectedTicketType } = useContext(TestSessionContext);

  return (
    <div
      className={`flex items-center gap-2 px-2 py-1 border rounded-sm ${
        selectedTicketType === type ? "border-gray-500" : "border-transparent"
      }`}
    >
      <div
        className={`${ticketTypeToBgColor[type]} w-[30px] h-[30px] rounded-sm drop-shadow-sm`}
      />
      <div className="flex flex-col">
        <span className="text-sm font-[500]">{ticketTypeToLabel[type]}</span>
        <span className="text-xs">{ticketTypeToPrice[type]},-</span>
      </div>
    </div>
  );
};

const PaletteItem = ({
  type,
  className,
}: {
  type: TicketType;
  className: string;
}) => {
  return (
    <div
      className={`${className} absolute w-8 h-8 ${ticketTypeToBgColor[type]} rounded-full`}
    />
  );
};

const HoldToDisplayText = () => {
  const [isTextVisible, setIsTextVisible] = useState(false);

  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        backgroundColor: "#007BFF",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        position: "relative",
        touchAction: "manipulation",
      }}
      onTouchStart={() => setIsTextVisible(false)}
      onTouchEnd={() => setIsTextVisible(true)}
      onTouchCancel={() => setIsTextVisible(false)}
    >
      Hold Me
      {isTextVisible && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "5px",
            borderRadius: "4px",
          }}
        >
          Hello! You are holding me.
        </div>
      )}
    </div>
  );
};
