"use client";

import { MovieHeader } from "../_components/MovieHeader";
import { NextButton, BackButton } from "../_components/Navigation";
import { BsQuestionCircle } from "react-icons/bs";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { SeatPicker } from "./_components/SeatPicker";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { TicketsSummary } from "./_components/TicketsSummary";
import { useContext } from "react";
import TestSessionContext from "@/app/_contexts/TestSessionContext";
import { Palette } from "./_components/Palette";
import { TicketTypeList } from "./_components/TicketTypeList";

export default function SeatsPage() {
  const { tickets } = useContext(TestSessionContext);
  const { showEraser } = useContext(SettingsContext);

  if (typeof window === "undefined") return null;

  const initialScale = Math.min(window.innerWidth / 424, 1) * 0.9;
  const wrapperHeight = Math.min(window.innerWidth / 424, 1) * 344 + "px";

  return (
    <div className="flex flex-col h-full">
      <MovieHeader />
      <article className="flex flex-col h-full p-3 pt-1 pe-0 relative">
        <Popover>
          <PopoverTrigger className="absolute top-3 right-3 z-10 text-black/60">
            <BsQuestionCircle size={20} />
          </PopoverTrigger>
          <PopoverContent className="text-sm p-2 w-fit max-w-[300px] z-10">
            <p>
              Vyberte barvu podle typu vstupenky a klikněte na sedadlo v sále.
            </p>
            <p>Tmavá sedadla jsou již obsazená, světlá sedadla jsou volná.</p>
            <p>
              {showEraser ? "Mazat Vámi vybrané místa lze pomocí gumy nebo opětovným kliknutím na vybrané sedadlo." : "Mazat Vámi vybrané místa lze opětovným kliknutím na vybrané sedadlo." }
            </p>
          </PopoverContent>
        </Popover>
        <div className="flex">
          <TicketTypeList />
          <Palette />
        </div>
        <div className="pe-3 mt-2">
          <div
            className="w-full border rounded-md"
            style={{
              height: wrapperHeight,
            }}
          >
            <TransformWrapper
              initialScale={initialScale}
              minScale={initialScale}
              maxScale={1.2}
              centerOnInit
              doubleClick={{ disabled: true }}
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
        <TicketsSummary />
      </article>
      <div className="flex justify-center items-center gap-4 p-2 w-full border-t sticky bottom-0 bg-white">
        <BackButton href="/" />
        <div className="flex justify-center items-center w-full">
          Výběr míst
        </div>
        <NextButton
          href="./contact"
          disabledInfo={"Nejprve vyberte sedadlo"}
          disabled={tickets.length === 0}
        />
      </div>
    </div>
  );
}
