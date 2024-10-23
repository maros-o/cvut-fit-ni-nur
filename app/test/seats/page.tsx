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
import { BsQuestionCircle } from "react-icons/bs";
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
      <article className="flex flex-col h-full p-3 relative">
        <Popover>
          <PopoverTrigger className="absolute top-4 right-4 z-50">
            <BsQuestionCircle size={16} />
          </PopoverTrigger>
          <PopoverContent className="text-sm p-2  w-fit max-w-[300px]">
            Vyberte barvu na paletě a poté klikněte na sedadlo, které chcete
            zakoupit.
          </PopoverContent>
        </Popover>
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
          <div className="w-full relative">
            <img
              className="max-h-[236px] ml-6 drop-shadow-lg"
              src="https://raw.githubusercontent.com/maros-o/cvut-fit-ni-nur-public-res/refs/heads/main/empty_palette.png"
            />
            <PaletteItem className="top-[50px] left-[70px]" type="adult" />
            <PaletteItem className="top-[95px] left-[50px]" type="student" />
            <PaletteItem className="top-[142px] left-[65px]" type="child" />
            <PaletteItem className="top-[170px] left-[105px]" type="senior" />
            <PaletteItem className="top-[160px] left-[155px]" type="ztp" />
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
        className={`flex items-center gap-2 px-2 py-1 rounded-sm pe-[18px] text-left ${
          selectedTicketType === type
            ? " outline outline-gray-500 outline-2"
            : ""
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
        <PopoverContent className="text-sm p-2 w-fit max-w-[300px]">
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
  const { selectedTicketType, setSelectedTicketType } =
    useContext(TestSessionContext);

  return (
    <div
      className={`${className} ${
        ticketTypeToBgColor[type]
      } absolute w-10 h-10 rounded-full drop-shadow cursor-pointer outline transition-transform duration-200 ${
        selectedTicketType === type
          ? "outline-gray-600 scale-105"
          : "outline-transparent"
      }`}
      onClick={() => setSelectedTicketType(type)}
    >
      <div className="absolute w-4 h-4 top-2 right-2 rounded-full bg-white/30"></div>
    </div>
  );
};
