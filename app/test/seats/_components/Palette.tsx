import { ticketTypeToBgColor, ticketTypeToIcon } from "@/app/_constats/ticket";
import SettingsContext from "@/app/_contexts/SettingsContext";
import TestSessionContext, {
  PaletteSelectType,
  TicketType,
} from "@/app/_contexts/TestSessionContext";
import Image from "next/image";
import { useContext } from "react";
import { BsFillEraserFill } from "react-icons/bs";

export const Palette = () => {
  const { showEraser } = useContext(SettingsContext);

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
        {showEraser && (
          <Eraser className="top-[106px] left-[86px]" type="eraser" />
        )}
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
  const { selectedPaletteType, setSelectedPaletterType } =
    useContext(TestSessionContext);
  const { showTube } = useContext(SettingsContext);

  return (
    <div
      className={`${className} ${
        ticketTypeToBgColor[type]
      } absolute flex items-center justify-center w-10 h-10 rounded-full drop-shadow cursor-pointer transition-transform duration-200 ${
        selectedPaletteType === type
          ? "outline outline-3 outline-gray-600 scale-110"
          : ""
      }`}
      onClick={() => setSelectedPaletterType(type)}
    >
      {showTube ? (
        <div
          className={`w-[24px] h-[24px] flex items-center justify-center`}
          onClick={() => setSelectedPaletterType(type)}
        >
          {ticketTypeToIcon[type]}
        </div>
      ) : (
        <div className="absolute w-4 h-4 top-2 right-2 rounded-full bg-white/30"></div>
      )}
    </div>
  );
};

const Eraser = ({
  type,
  className,
}: {
  type: PaletteSelectType;
  className: string;
}) => {
  const { selectedPaletteType, setSelectedPaletterType } =
    useContext(TestSessionContext);

  return (
    <div
      className={`${className} bg-white/80 flex justify-center items-center absolute w-10 h-10 rounded-full drop-shadow cursor-pointer transition-transform duration-200 ${
        selectedPaletteType === type
          ? "outline outline-2 outline-gray-600 scale-105"
          : ""
      }`}
      onClick={() => setSelectedPaletterType(type)}
    >
      <BsFillEraserFill size={28} className="text-red-700" />
    </div>
  );
};
