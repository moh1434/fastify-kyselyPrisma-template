import { phoneSummation } from "./phoneSummation.js";

let phoneZain = "+9647880000000";
let phoneAsia = "+9647770000000";
let phoneKorek = "+9647550000000";
export function getZainPhone() {
  phoneZain = phoneSummation(phoneZain, 1);
  return phoneZain;
}
export const getPhone = getZainPhone;

export function getAsiaPhone() {
  phoneAsia = phoneSummation(phoneAsia, 1);
  return phoneAsia;
}

export function getKorekPhone() {
  phoneKorek = phoneSummation(phoneKorek, 1);
  return phoneKorek;
}
