const prefix = "+964";

const phones = {
  zain: "+9647880000000",
  asia: "+9647770000000",
  korek: "+9647550000000",
};

export function getZainPhone(increaseBy = 0) {
  return phoneSummation(phones.zain, increaseBy);
}
export const getPhone = getZainPhone;

export function getAsiaPhone(increaseBy = 0) {
  return phoneSummation(phones.asia, increaseBy);
}

export function getKorekPhone(increaseBy = 0) {
  return phoneSummation(phones.korek, increaseBy);
}

//
function phoneSummation(phoneNumber: string, increaseBy = 1) {
  const numberPart = phoneNumber.slice(prefix.length);

  return prefix + (BigInt(numberPart) + BigInt(increaseBy)).toString();
}
