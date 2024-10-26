export const formatPhoneNumber = (phoneNumber: string) => {
  if (/^\d{3} \d{3} \d{3}$/.test(phoneNumber)) {
    return phoneNumber;
  }
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
};
