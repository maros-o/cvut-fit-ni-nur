"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

type NavigationButtonProps = {
  href: string;
  disabled?: boolean;
  disabledInfo?: string;
  icon?: React.ReactNode;
  className?: string;
  onDisabledClick?: () => void;
};

const NavigationButton = ({
  href,
  disabled,
  icon,
  className,
  disabledInfo,
  onDisabledClick,
}: NavigationButtonProps) => {
  if (!disabled) {
    return (
      <Button
        className={`${className} p-0 m-0 max-w-[120px] w-full h-[46px] rounded-xl drop-shadow`}
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
        onClick={onDisabledClick}
        className={`${className} flex justify-center items-center text-white w-[220px] h-[46px] rounded-xl drop-shadow opacity-50 cursor-not-allowed`}
      >
        {icon}
      </PopoverTrigger>
      <PopoverContent>{disabledInfo}</PopoverContent>
    </Popover>
  );
};

export const BackButton = (props: NavigationButtonProps) => (
  <NavigationButton
    {...props}
    icon={<IoMdArrowRoundBack />}
    className="bg-red-400 hover:bg-red-500"
  />
);

export const NextButton = (props: NavigationButtonProps) => (
  <NavigationButton
    {...props}
    icon={<IoMdArrowRoundForward />}
    className="bg-green-400 hover:bg-green-500"
  />
);
