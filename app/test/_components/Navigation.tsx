"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

const NavigationButton = ({
  href,
  disabled,
  icon,
  className,
}: {
  href: string;
  disabled?: boolean;
  icon: React.ReactNode;
  className?: string;
}) => (
  <Button
    className={`${className} w-[220px] h-[46px] rounded-xl drop-shadow ${
      disabled ? "opacity-50 cursor-not-allowed " : ""
    }`}
    aria-disabled={disabled}
    disabled={disabled}
    onClick={(e) => {
      if (disabled) {
        e.preventDefault();
      }
    }}
    asChild
  >
    {!disabled ? (
      <Link href={href} shallow={true}>
        {icon}
      </Link>
    ) : (
      <span>{icon}</span>
    )}
  </Button>
);

export const BackButton = ({
  href,
  disabled,
}: {
  href: string;
  disabled?: boolean;
}) => (
  <NavigationButton
    href={href}
    disabled={disabled}
    icon={<IoMdArrowRoundBack />}
    className="bg-red-400 hover:bg-red-500"
  />
);

export const NextButton = ({
  href,
  disabled,
}: {
  href: string;
  disabled?: boolean;
}) => (
  <NavigationButton
    href={href}
    disabled={disabled}
    icon={<IoMdArrowRoundForward />}
    className="bg-green-400 hover:bg-green-500"
  />
);
