"use client";

import SettingsContext from "../_contexts/SettingsContext";
import { useContext } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SettingsPage() {
  const {
    maxSessionTime,
    sessionTimeWarningLimit,
    showEraser,
    setSetting,
    resetSettings,
    numberOfReservedSeatsOnStart,
  } = useContext(SettingsContext);

  return (
    <div className="flex flex-col p-6 justify-between h-full">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-extrabold tracking-tight mb-2">
          Nastavení
        </h1>
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            className="w-20"
            value={maxSessionTime}
            onChange={(e) =>
              setSetting("maxSessionTime", Number(e.target.value))
            }
          />
          <Label>
            Maximální délka objednávky{" "}
            <span className="text-black/60">(min)</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            className="w-20"
            value={sessionTimeWarningLimit}
            onChange={(e) =>
              setSetting("sessionTimeWarningLimit", Number(e.target.value))
            }
          />
          <Label>
            Časový limit pro upozornění na dokončení objednávky{" "}
            <span className="text-black/60">(min)</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            className="w-20"
            value={numberOfReservedSeatsOnStart}
            onChange={(e) =>
              setSetting("numberOfReservedSeatsOnStart", Number(e.target.value))
            }
          />
          <Label>Počet rezervovaných sedadel na začátku</Label>
        </div>
        <div className="flex items-center space-x-2 ps-9">
          <Switch
            onCheckedChange={() => {
              console.log("value");
              setSetting("showEraser", !showEraser);
            }}
            checked={showEraser}
          />
          <Label>Zobrazovat gumu</Label>
        </div>
      </div>
      <div className="flex gap-6">
        <Button
          variant={"destructive"}
          className="w-full"
          onClick={resetSettings}
        >
          Resetovat nastavení
        </Button>
        <Button asChild className="w-full">
          <Link href="/">Zpět do menu</Link>
        </Button>
      </div>
    </div>
  );
}
