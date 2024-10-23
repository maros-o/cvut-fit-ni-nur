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
import { IoMdInformationCircleOutline } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SeatsPage() {
  const { selectedTicketType } = useContext(TestSessionContext);

  return (
    <div className="flex flex-col h-full">
      <MovieHeader />
      <article className="flex flex-col h-full p-3">
        <div className="flex gap-6">
          <ul className="flex flex-col gap-0.5">
            <TicketTypeItem type="adult" />
            <TicketTypeItem type="student" info={"Platný průkaz ISIC"} />
            <TicketTypeItem type="child" info="Do 15 let" />
            <TicketTypeItem type="senior" info="Od 65 let" />
            <TicketTypeItem type="ztp" info="ZTP/P průkaz" />
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
      <nav className="flex justify-center items-center gap-4 p-3 w-full ">
        <BackButton href="/" />
        <div className="flex justify-center items-center w-full">
          Výběr míst
        </div>
        <NextButton href="./contact" disabled />
      </nav>
    </div>
  );
}

const TicketTypeItem = ({
  type,
  info,
}: {
  type: TicketType;
  info?: string;
}) => {
  const { selectedTicketType } = useContext(TestSessionContext);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={`flex items-center gap-2 px-2 py-1 border rounded-sm pe-[18px] text-left ${
            selectedTicketType === type
              ? "border-gray-500"
              : "border-transparent"
          }`}
        >
          <div
            className={`${ticketTypeToBgColor[type]} w-[30px] h-[30px] rounded-sm drop-shadow-sm`}
          />
          <div className="flex flex-col">
            <span className="text-sm font-[500] relative">
              {ticketTypeToLabel[type]}
              {info && (
                <div className="absolute right-[-15px] top-0 text-black/80">
                  <IoMdInformationCircleOutline size={14} />
                </div>
              )}
            </span>{" "}
            <span className="text-xs">{ticketTypeToPrice[type]},-</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{info}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
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
