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
  text?: string;
  onDisabledClick?: () => void;
  fullWidth?: boolean;
};

const NavigationButton = ({
  href,
  disabled,
  icon,
  className,
  disabledInfo,
  onDisabledClick,
  text,
  fullWidth,
}: NavigationButtonProps) => {
  if (!disabled) {
    return (
      <Button
        className={`${className} ${
          fullWidth ? "" : "max-w-[120px]"
        } p-0 m-0 w-full h-[46px] rounded-xl drop-shadow`}
        aria-disabled={disabled}
        disabled={disabled}
        asChild
      >
        <Link href={href} shallow={true}>
          {icon}
          {text}
        </Link>
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger
        onClick={onDisabledClick}
        className={`${className} ${
          fullWidth ? "" : "max-w-[120px]"
        } flex justify-center items-center text-white w-full h-[46px] rounded-xl drop-shadow opacity-50 cursor-not-allowed`}
      >
        {icon}
        {text}
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

export const NextButton = (
  props: NavigationButtonProps & { hideIcon?: boolean }
) => (
  <NavigationButton
    {...props}
    icon={props.hideIcon ? undefined : <IoMdArrowRoundForward />}
    className="bg-green-400 hover:bg-green-500"
  />
);
