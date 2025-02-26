const prefix = "+964";
export function phoneSummation(phoneNumber: string, increaseBy = 1) {
  const numberPart = phoneNumber.slice(prefix.length);

  return prefix + (BigInt(numberPart) + BigInt(increaseBy)).toString();
}

// console.log(phoneSummation("+9647701234567", 1)); // "+9647701234568"
// console.log(phoneSummation("+9647719876543", 5)); // "+9647719876548"
// console.log(phoneSummation("+9647505551234", 10)); // "+9647505551244"
// console.log(phoneSummation("+9647809998888", 20)); // "+9647809998908"
// console.log(phoneSummation("+9647810000000", 100)); // "+9647810000100"
