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
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export default function SeatsPage() {
  const {} = useContext(TestSessionContext);

  return (
    <div className="flex flex-col h-full">
      <MovieHeader />
      <article className="flex flex-col h-full p-3">
        <div className="flex gap-6">
          <div className="flex flex-col gap-0.5">
            <TicketTypeItem type="adult" />
            <TicketTypeItem
              type="student"
              info="S platným studentským průkazem do 26 let včetně"
            />
            <TicketTypeItem
              type="child"
              info="Do 12 let včetně. Dítě do 3 let nemusí platit vstupné, nemá ale nárok na vlastní sedačku."
            />
            <TicketTypeItem type="senior" info="Nad 60 let včetně" />
            <TicketTypeItem
              type="ztp"
              info="Doprovod (jedna osoba) pro ZTP/P má vstupenku zdarma. Pro slevu ZTP nebo ZTP/P musíte předložit platný průkaz."
            />
          </div>
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
    <Popover>
      <div
        className={`flex items-center gap-2 px-2 py-1 border rounded-sm pe-[20px] text-left ${
          selectedTicketType === type ? "border-gray-500" : "border-transparent"
        }`}
      >
        <div
          className={`${ticketTypeToBgColor[type]} w-[30px] h-[30px] rounded-sm drop-shadow-sm`}
        />
        <div className="flex flex-col">
          <span className="text-sm font-[500] relative">
            {ticketTypeToLabel[type]}
            {info && (
              <PopoverTrigger className="absolute right-[-18px] top-0 text-black/80">
                <IoMdInformationCircleOutline size={16} />
              </PopoverTrigger>
            )}
          </span>{" "}
          <span className="text-xs">{ticketTypeToPrice[type]},-</span>
        </div>
      </div>
      {info && (
        <PopoverContent>
          <span className="font-semibold">{ticketTypeToLabel[type]}</span>:{" "}
          {info}
        </PopoverContent>
      )}
    </Popover>
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
