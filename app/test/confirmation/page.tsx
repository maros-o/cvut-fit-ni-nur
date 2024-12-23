"use client";

import { MovieHeader } from "../_components/MovieHeader";
import { BackButton, NextButton } from "../_components/Navigation";
import { useContext } from "react";
import TestSessionContext from "@/app/_contexts/TestSessionContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { flagsAndPhonePrefix } from "@/app/_constats/contact";
import { formatPhoneNumber } from "@/app/_utils/format";
import { IoTicketOutline } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";
import { Seats } from "./_components/Seats";
import { Tickets } from "./_components/Tickets";
import { useRouter } from "next/navigation";

export default function ConfirmationPage() {
  const { tickets, contact, agreeToTerms, setAgreeToTerms, seats } =
    useContext(TestSessionContext);

  const router = useRouter();
  if (seats.length === 0) router.replace("/");

  return (
    <div className="flex flex-col h-full">
      <MovieHeader />
      <article className="flex flex-col h-full p-3 gap-4">
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">
            Vstupenky{" "}
            <span className="font-normal tracking-wide text-black/70">
              ({tickets.length})
            </span>
          </h2>
          <Seats />
          <Tickets />
          <Button variant="outline" className="mt-2" asChild>
            <Link href="./seats" shallow={true} prefetch={true}>
              Upravit <IoTicketOutline />
            </Link>
          </Button>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Kontakt</h2>
          <div className="flex flex-col gap-2">
            <p>
              {contact.name} {contact.surname}
            </p>
            <p>{contact.email}</p>
            <p className="tracking-wide">
              {
                flagsAndPhonePrefix[
                  contact.phonePrefix as keyof typeof flagsAndPhonePrefix
                ].prefix
              }{" "}
              {formatPhoneNumber(contact.phoneNumber)}
            </p>
          </div>
          <Button variant="outline" className="mt-2" asChild>
            <Link href="./contact" shallow={true} prefetch={true}>
              Upravit <IoPersonSharp />
            </Link>
          </Button>
        </div>
        <div className="items-top flex space-x-2 items-center">
          <Checkbox
            className="w-[22px] h-[22px]"
            onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
            checked={agreeToTerms}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              id="vop"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Souhlasím s{" "}
              <Link href="./vop" className="underline font-semibold">
                VOP
              </Link>
            </label>
          </div>
        </div>
      </article>
      <div className="flex items-center gap-6 p-2 w-full border-t sticky bottom-0 bg-white">
        <BackButton href="./contact" />
        <NextButton
          href={"./overview"}
          disabledInfo={
            "Nejprve souhlaste se všeobecnými obchodními podmínkami (VOP)"
          }
          disabled={!agreeToTerms}
          onDisabledClick={() => router.replace("./confirmation#vop")}
          fullWidth
          hideIcon
          text="Zaplatit"
        />
      </div>
    </div>
  );
}
