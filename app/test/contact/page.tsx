"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { MovieHeader } from "../_components/MovieHeader";
import { NextButton, BackButton } from "../_components/Navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TestSessionContext, {
  Contact,
} from "@/app/_contexts/TestSessionContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import ReactCountryFlag from "react-country-flag";
import debounce from "lodash/debounce";
import {
  ContactErrors,
  contactSchema,
  flagsAndPhonePrefix,
  inputContainer,
} from "@/app/_constats/contact";
import { Emoji } from "./_components/Emoji";
import { useRouter } from "next/navigation";

const useContactPage = () => {
  const { contact, setContact, seats } = useContext(TestSessionContext);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof Contact>>(
    new Set()
  );

  const router = useRouter();
  if (seats.length === 0) router.replace("/");

  const validateForm = useCallback((data: Contact): boolean => {
    try {
      contactSchema.parse(data);
      return true;
    } catch (err) {
      return false;
    }
  }, []);

  const [isValid, setIsValid] = useState(validateForm(contact));

  const validateAllFields = useCallback(
    (
      newFormData: Contact,
      newTouchedFields: Set<keyof Contact> = new Set()
    ) => {
      const newErrors: ContactErrors = {};
      for (const field in newFormData) {
        const f = field as keyof Contact;
        if (!newTouchedFields.has(f)) continue;
        try {
          const fieldSchema = contactSchema.shape[f];
          fieldSchema.parse(newFormData[f]);
        } catch (err) {
          if (err instanceof z.ZodError) {
            newErrors[f] = err.errors[0].message;
          }
        }
      }
      setErrors(newErrors);
    },
    []
  );

  const debouncedValidation = useCallback(
    debounce((newFormData: Contact, newTouchedFields: Set<keyof Contact>) => {
      validateAllFields(newFormData, newTouchedFields);
    }, 700),
    []
  );

  const handleInputChange = useCallback(
    (field: keyof Contact, value: string) => {
      setTouchedFields((prev) => new Set(prev).add(field));
      if (field === "phoneNumber") {
        const prefix = Object.values(flagsAndPhonePrefix).find((prefix) =>
          value.startsWith(prefix.prefix)
        );
        if (prefix) {
          setContact((prev) => ({
            ...prev,
            phonePrefix: prefix.code,
            phoneNumber: value.replace(prefix.prefix, "").trim(),
          }));
          return;
        }
      }
      setContact((prev) => ({
        ...prev,
        [field]: value.trim(),
      }));
    },
    []
  );

  useEffect(() => {
    const newValid = validateForm(contact);
    if (isValid && !newValid) {
      validateAllFields(contact, touchedFields);
    }
    setIsValid(newValid);
    debouncedValidation(contact, touchedFields);
  }, [contact, touchedFields]);

  return {
    contact,
    errors,
    touchedFields,
    setTouchedFields,
    handleInputChange,
    validateAllFields,
    isValid,
  };
};

export default function ContactPage() {
  const {
    contact,
    errors,
    touchedFields,
    setTouchedFields,
    handleInputChange,
    validateAllFields,
    isValid,
  } = useContactPage();

  return (
    <div className="flex flex-col h-full">
      <MovieHeader />
      <article className="flex flex-col h-full p-4 gap-6">
        <div className={inputContainer}>
          <Label>Jméno</Label>
          <Input
            type="text"
            name="given-name"
            autoComplete="given-name"
            placeholder="Karel"
            value={contact.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={
              touchedFields.has("name") && errors.name ? "border-red-500" : ""
            }
          />
          {touchedFields.has("name") && errors.name && (
            <span className="text-sm text-red-500">{errors.name}</span>
          )}
        </div>
        <div className={inputContainer}>
          <Label>Příjmení</Label>
          <Input
            type="text"
            name="family-name"
            autoComplete="family-name"
            placeholder="Novák"
            value={contact.surname}
            onChange={(e) => handleInputChange("surname", e.target.value)}
            className={
              touchedFields.has("surname") && errors.surname
                ? "border-red-500"
                : ""
            }
          />
          {touchedFields.has("surname") && errors.surname && (
            <span className="text-sm text-red-500">{errors.surname}</span>
          )}
        </div>
        <div className={inputContainer}>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="karel.novak@gmail.com"
            value={contact.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={
              touchedFields.has("email") && errors.email ? "border-red-500" : ""
            }
          />
          {touchedFields.has("email") && errors.email && (
            <span className="text-sm text-red-500">{errors.email}</span>
          )}
        </div>
        <div className={inputContainer}>
          <Label>Telefon</Label>
          <div className="flex gap-2">
            <Select
              value={contact.phonePrefix}
              onValueChange={(value) =>
                handleInputChange(
                  "phonePrefix",
                  value as Contact["phonePrefix"]
                )
              }
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(flagsAndPhonePrefix).map(
                  ([key, { code, prefix }]) => (
                    <SelectItem key={key} value={key}>
                      <span className="flex items-center gap-2">
                        <ReactCountryFlag
                          countryCode={code}
                          style={{
                            width: "1.2rem",
                            height: "1.2rem",
                          }}
                          svg
                        />
                        {prefix}
                      </span>
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            <Input
              type="tel"
              name="tel"
              autoComplete="tel"
              placeholder="123456789"
              value={contact.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className={`tracking-wide  ${
                touchedFields.has("phoneNumber") && errors.phoneNumber
                  ? "border-red-500"
                  : ""
              }`}
            />
          </div>
          {touchedFields.has("phoneNumber") && errors.phoneNumber && (
            <span className="text-sm text-red-500">{errors.phoneNumber}</span>
          )}
        </div>
        <div className="flex w-full">
          <Emoji errors={errors} isDone={isValid} />
        </div>
      </article>
      <div className="flex justify-center items-center gap-4 p-2 w-full border-t sticky bottom-0 bg-white">
        <BackButton href="./seats" />
        <div className="flex justify-center items-center w-full">Kontakt</div>
        <NextButton
          href="./confirmation"
          disabledInfo={"Nejprve správně vyplňte všechny kontaktní údaje"}
          disabled={!isValid}
          onDisabledClick={() => {
            const newTouched = new Set(
              Object.keys(contact) as (keyof Contact)[]
            );
            setTouchedFields(newTouched);
            validateAllFields(contact, newTouched);
          }}
        />
      </div>
    </div>
  );
}
