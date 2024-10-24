"use client";
import { useContext } from "react";
import TestSessionContext from "@/app/_contexts/TestSessionContext";
import { MovieHeader } from "../_components/MovieHeader";
import { NextButton, BackButton } from "../_components/Navigation";
import { BsQuestionCircle } from "react-icons/bs";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { PaletteItem } from "./_components/PaletteItem";
import { TicketTypeItem } from "./_components/TicketTypeItem";
import { SeatPicker } from "./_components/SeatPicker";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function SeatsPage() {
  const {} = useContext(TestSessionContext);

  return (
    <div className="flex flex-col h-full">
      <MovieHeader />
      <article className="flex flex-col h-full p-3 pe-0 relative">
        <Popover>
          <PopoverTrigger className="absolute top-4 right-4 z-10 text-black/60">
            <BsQuestionCircle size={20} />
          </PopoverTrigger>
          <PopoverContent className="text-sm p-2  w-fit max-w-[300px]">
            Vyberte barvu na paletě a poté klikněte na sedadlo, které chcete
            zakoupit.
          </PopoverContent>
        </Popover>
        <div className="flex">
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
          <div className="flex justify-center items-center w-full">
            <div className="flex relative">
              <img
                className="h-[236px] drop-shadow-lg"
                src="https://raw.githubusercontent.com/maros-o/cvut-fit-ni-nur-public-res/refs/heads/main/empty_palette.png"
              />
              <PaletteItem className="top-[46px] left-[46px]" type="adult" />
              <PaletteItem className="top-[90px] left-[22px]" type="student" />
              <PaletteItem className="top-[136px] left-[36px]" type="child" />
              <PaletteItem className="top-[170px] left-[76px]" type="senior" />
              <PaletteItem className="top-[160px] left-[126px]" type="ztp" />
            </div>
          </div>
        </div>
        <div className="pe-3">
          <div
            className="w-full border rounded-md"
            style={{
              height: Math.min(window.innerWidth / 424, 1) * 396 + "px",
            }}
          >
            <TransformWrapper
              initialScale={Math.min(window.innerWidth / 424, 1) * 0.9}
              minScale={Math.min(window.innerWidth / 424, 1) * 0.9}
              centerOnInit
            >
              <TransformComponent
                wrapperStyle={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <SeatPicker />
              </TransformComponent>
            </TransformWrapper>
          </div>
        </div>
      </article>
      <nav className="flex justify-center items-center gap-4 p-2 w-full border-t sticky bottom-0 bg-white">
        <BackButton href="/" />
        <div className="flex justify-center items-center w-full">
          Výběr míst
        </div>
        <NextButton href="./contact" disabled />
      </nav>
    </div>
  );
}
