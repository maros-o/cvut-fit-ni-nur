import { flagsAndPhonePrefix } from "../_constats/contact";

export const defaultContact = {
  name: "",
  surname: "",
  email: "",
  phonePrefix: flagsAndPhonePrefix["cz"].code,
  phoneNumber: "",
};

export const mockContact = {
  name: "Maroš",
  surname: "Mečiar",
  email: "maros.mec@seznam.cz",
  phonePrefix: flagsAndPhonePrefix["cz"].code,
  phoneNumber: "604117785",
};
