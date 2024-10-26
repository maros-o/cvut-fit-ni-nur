import { ticketTypeToBgColor } from "@/app/_constats/ticket";
import TestSessionContext, {
  TicketType,
} from "@/app/_contexts/TestSessionContext";
import Image from "next/image";
import { useContext } from "react";

export const Palette = ({}: {}) => {
  return (
    <div className="flex justify-center pt-0.5 items-center w-full">
      <div className="flex relative">
        <Image
          className="drop-shadow-lg"
          height={236}
          width={212}
          alt="palette"
          src="https://raw.githubusercontent.com/maros-o/cvut-fit-ni-nur-public-res/refs/heads/main/empty_palette.png"
        />
        <PaletteItem className="top-[46px] left-[46px]" type="adult" />
        <PaletteItem className="top-[90px] left-[22px]" type="student" />
        <PaletteItem className="top-[136px] left-[36px]" type="child" />
        <PaletteItem className="top-[170px] left-[76px]" type="senior" />
        <PaletteItem className="top-[160px] left-[126px]" type="ztp" />
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
  const { selectedTicketType, setSelectedTicketType } =
    useContext(TestSessionContext);

  return (
    <div
      className={`${className} ${
        ticketTypeToBgColor[type]
      } absolute w-10 h-10 rounded-full drop-shadow cursor-pointer transition-transform duration-200 ${
        selectedTicketType === type
          ? "outline outline-2 outline-gray-600 scale-105"
          : ""
      }`}
      onClick={() => setSelectedTicketType(type)}
    >
      <div className="absolute w-4 h-4 top-2 right-2 rounded-full bg-white/30"></div>
    </div>
  );
};
