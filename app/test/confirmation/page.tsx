"use client";

import { MovieHeader } from "../_components/MovieHeader";
import { BackButton } from "../_components/Navigation";
import { useContext } from "react";
import TestSessionContext, { Ticket } from "@/app/_contexts/TestSessionContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getTicketTotalPrice, ticketsToTypeCount } from "../../_utils/tickets";
import {
  ticketTypeToLabel,
  ticketTypeToTextColor,
} from "@/app/_constats/ticket";
import { Checkbox } from "@/components/ui/checkbox";
import { flagsAndPhonePrefix } from "@/app/_constats/contact";
import { formatPhoneNumber } from "@/app/_utils/format";

export default function OverviewPage() {
  const { tickets, contact } = useContext(TestSessionContext);
  const typesCount = ticketsToTypeCount(tickets);
  const totalPrice = getTicketTotalPrice(tickets);

  return (
    <div className="flex flex-col h-full">
      <MovieHeader />
      <article className="flex flex-col h-full p-4 gap-6">
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Vstupenky</h2>
          <div className="pe-3 w-full mb-2">
            <div className="flex flex-col items-center w-full">
              <div className="flex justify-center items-center gap-2.5 flex-wrap mt-2 text-sm font-semibold w-full">
                {Object.entries(typesCount).map(([type, count]) => {
                  if (count === 0) return null;
                  const t = type as Ticket["type"];
                  return (
                    <div className="flex items-center gap-1">
                      <span>{count}x </span>
                      <span
                        className={`${ticketTypeToTextColor[t]} font-[500]`}
                      >
                        {ticketTypeToLabel[t]}
                      </span>
                    </div>
                  );
                })}
              </div>
              {tickets.length > 0 && (
                <hr className="my-2 border-t border-black/50 w-[90%]" />
              )}
              <div className="flex w-full text-sm text-center justify-center items-center gap-1">
                <div className="flex items-center gap-1">
                  <span>Celkem </span>
                  <span className="font-semibold">{tickets.length ?? 0} </span>
                  vstupenek za{" "}
                  <span className="font-semibold">{totalPrice},-</span>
                </div>
              </div>
            </div>
          </div>
          <Button variant="outline" className="mt-2" asChild>
            <Link href="./seats">Upravit</Link>
          </Button>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Kontakt</h2>
          <div className="flex flex-col gap-2">
            <span>
              {contact.name} {contact.surname}
            </span>
            <span>{contact.email}</span>
            <span className="tracking-wide">
              {
                flagsAndPhonePrefix[
                  contact.phonePrefix as keyof typeof flagsAndPhonePrefix
                ].prefix
              }{" "}
              {formatPhoneNumber(contact.phoneNumber)}
            </span>
          </div>
          <Button variant="outline" className="mt-2" asChild>
            <Link href="./contact">Upravit</Link>
          </Button>
        </div>
        <div className="items-top flex space-x-2 items-center">
          <Checkbox className="w-[22px] h-[22px]" />
          <div className="grid gap-1.5 leading-none">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Souhlasím s{" "}
              <Link className="underline font-semibold" href={""}>
                VOP
              </Link>
            </label>
          </div>
        </div>
      </article>
      <div className="flex items-center gap-6 p-2 w-full border-t sticky bottom-0 bg-white">
        <BackButton href="./contact" />
        <Button
          className={`p-0 m-0 w-full h-[46px] rounded-xl drop-shadow bg-green-400 hover:bg-green-500 tracking-wide`}
          asChild
        >
          <Link href={"./payment"} shallow={true}>
            Zaplatit
          </Link>
        </Button>
      </div>
    </div>
  );
}
