import { Contact } from "../_contexts/TestSessionContext";
import { z } from "zod";

export const inputContainer = "grid w-full max-w-xs items-center gap-2";

export const flagsAndPhonePrefix = {
  cz: { code: "cz", prefix: "+420" },
  sk: { code: "sk", prefix: "+421" },
  pl: { code: "pl", prefix: "+48" },
  en: { code: "gb", prefix: "+44" },
  de: { code: "de", prefix: "+49" },
} as const;

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Jméno musí mít alespoň 2 znaky")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/, "Jméno může obsahovat pouze písmena"),
  surname: z
    .string()
    .min(2, "Příjmení musí mít alespoň 2 znaky")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/, "Příjmení může obsahovat pouze písmena"),
  email: z.string().email("Neplatný formát emailu"),
  phonePrefix: z.enum(["cz", "sk", "pl", "en", "de"] as const),
  phoneNumber: z
    .string()
    .regex(/^\d{9}$|^\d{3} \d{3} \d{3}$/, "Telefon musí mít 9 číslic"),
});

export type ContactErrors = {
  [K in keyof Contact]?: string;
};
