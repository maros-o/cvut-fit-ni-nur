"use client";

import { useCallback, useContext, useState } from "react";
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
import { Navbar } from "../_components/Navbar";

export default function ContactPage() {
  const { contact, setContact } = useContext(TestSessionContext);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof Contact>>(
    new Set()
  );

  const validateForm = useCallback((data: Contact): boolean => {
    try {
      contactSchema.parse(data);
      return true;
    } catch (err) {
      return false;
    }
  }, []);

  const [isValid, setIsValid] = useState(validateForm(contact));

  const validateField = useCallback(
    (field: keyof Contact, value: string): string | undefined => {
      try {
        const fieldSchema = contactSchema.shape[field];
        fieldSchema.parse(value);
      } catch (err) {
        if (err instanceof z.ZodError) {
          return err.errors[0].message;
        }
      }
    },
    []
  );

  const validateAllFields = useCallback(() => {
    setTouchedFields(new Set(Object.keys(contact) as (keyof Contact)[]));
    const newErrors: ContactErrors = {};
    for (const field in contact) {
      const fieldError = validateField(
        field as keyof Contact,
        contact[field as keyof Contact]
      );
      if (fieldError) {
        newErrors[field as keyof Contact] = fieldError;
      }
    }
    setErrors(newErrors);
  }, [contact, validateField]);

  const debouncedValidation = useCallback(
    debounce((field: keyof Contact, value: string, newFormData: Contact) => {
      const fieldError = validateField(field, value);
      setErrors((prev) => ({
        ...prev,
        [field]: fieldError,
      }));
      setIsValid(validateForm(newFormData));
    }, 500),
    []
  );

  const handleInputChange = useCallback(
    (field: keyof Contact, value: string) => {
      setTouchedFields((prev) => new Set(prev).add(field));
      setContact((prev) => ({
        ...prev,
        [field]: value,
      }));
      debouncedValidation(field, value, {
        ...contact,
        [field]: value,
      });
    },
    [contact]
  );

  return (
    <div className="flex flex-col h-full">
      <MovieHeader />
      <article className="flex flex-col h-full p-4 gap-6">
        <div className={inputContainer}>
          <Label>Jméno</Label>
          <Input
            type="text"
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
                          svg
                          style={{
                            width: "1.2rem",
                            height: "1.2rem",
                          }}
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
      <Navbar>
        <BackButton href="./seats" />
        <div className="flex justify-center items-center w-full">
          Kontaktní údaje
        </div>
        <NextButton
          href="./confirmation"
          disabledInfo={"Nejprve správně vyplňte všechny kontaktní údaje"}
          disabled={!isValid}
          onDisabledClick={() => validateAllFields()}
        />
      </Navbar>
    </div>
  );
}
