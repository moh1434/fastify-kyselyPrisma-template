const prefix = "+964";

const phones = {
  zain: "+9647880000000",
  asia: "+9647770000000",
  korek: "+9647550000000",
};

export function getZainPhone() {
  phones.zain = phoneSummation(phones.zain);
  return phones.zain;
}
export const getPhone = getZainPhone;

export function getAsiaPhone() {
  phones.asia = phoneSummation(phones.asia);
  return phones.asia;
}

export function getKorekPhone() {
  phones.korek = phoneSummation(phones.korek);
  return phones.korek;
}

//
function phoneSummation(phoneNumber: string, increaseBy = 1) {
  const numberPart = phoneNumber.slice(prefix.length);

  return prefix + (BigInt(numberPart) + BigInt(increaseBy)).toString();
}
