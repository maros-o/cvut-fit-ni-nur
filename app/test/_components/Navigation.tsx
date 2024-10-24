"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const NavigationButton = ({
  href,
  disabled,
  icon,
  className,
  disabledInfo,
}: {
  href: string;
  disabled?: boolean;
  disabledInfo?: string;
  icon: React.ReactNode;
  className?: string;
}) => {
  if (!disabled) {
    return (
      <Button
        className={`${className} p-0 m-0 w-[220px] h-[46px] rounded-xl drop-shadow`}
        aria-disabled={disabled}
        disabled={disabled}
        asChild
      >
        <Link href={href} shallow={true}>
          {icon}
        </Link>
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger
        className={`${className} flex justify-center items-center text-white w-[220px] h-[46px] rounded-xl drop-shadow opacity-50 cursor-not-allowed`}
      >
        {icon}
      </PopoverTrigger>
      <PopoverContent>{disabledInfo}</PopoverContent>
    </Popover>
  );
};

export const BackButton = ({
  href,
  disabled,
  disabledInfo,
}: {
  href: string;
  disabled?: boolean;
  disabledInfo?: string;
}) => (
  <NavigationButton
    href={href}
    disabled={disabled}
    disabledInfo={disabledInfo}
    icon={<IoMdArrowRoundBack />}
    className="bg-red-400 hover:bg-red-500"
  />
);

export const NextButton = ({
  href,
  disabled,
  disabledInfo,
}: {
  href: string;
  disabled?: boolean;
  disabledInfo?: string;
}) => (
  <NavigationButton
    href={href}
    disabled={disabled}
    disabledInfo={disabledInfo}
    icon={<IoMdArrowRoundForward />}
    className="bg-green-400 hover:bg-green-500"
  />
);
