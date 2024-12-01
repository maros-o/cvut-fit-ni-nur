"use client";

import { useContext } from "react";
import { BackButton } from "../_components/Navigation";
import TestSessionContext from "@/app/_contexts/TestSessionContext";

export default function VopPage() {
  const { orderCode } = useContext(TestSessionContext);

  return (
    <div className="flex flex-col h-full">
      <article className="flex flex-col h-full items-center p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          Zákaznická podpora
        </h1>
        <p className="text-gray-600 mb-4">
          Pokud potřebujete pomoc s vaší objednávkou nebo máte jakékoli dotazy,
          kontaktujte nás.
        </p>

        <p className="text-lg font-medium text-gray-700 mb-2">
          Číslo transakce
        </p>
        <p className="text-blue-600 text-lg font-semibold mb-4">{orderCode}</p>

        <p className="text-lg font-medium text-gray-700 mb-2">
          Telefonická podpora
        </p>
        <p className="text-blue-600 text-lg font-semibold mb-4">
          <a href="tel:+420123456789" className="hover:underline">
            +420 123 456 789
          </a>
        </p>

        <p className="text-lg font-medium text-gray-700 mb-2">
          E-mailová podpora
        </p>
        <p className="text-blue-600 text-lg font-semibold mb-4">
          <a href="mailto:support@example.com" className="hover:underline">
            support@example.com
          </a>
        </p>

        <p className="text-sm text-gray-500 mt-4">
          Uveďte prosím své <strong>číslo transakce</strong>, abychom mohli vaši
          žádost rychleji vyřídit.
        </p>
      </article>

      <div className="flex justify-center items-center gap-4 p-2 w-full border-t sticky bottom-0 bg-white">
        <BackButton href="./overview" />
      </div>
    </div>
  );
}
