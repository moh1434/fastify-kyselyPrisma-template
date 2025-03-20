let index = 0;
let iterations = 0;
const _names = [
  { firstName: "Omar", secondName: "Khalid", thirdName: "Hassan" },
  { firstName: "Ali", secondName: "Fahad", thirdName: "Yousef" },
  { firstName: "Zaid", secondName: "Mohammed", thirdName: "Salim" },
  { firstName: "Hassan", secondName: "Nasser", thirdName: "Ibrahim" },
  { firstName: "Rami", secondName: "Tariq", thirdName: "Jamal" },
  { firstName: "Aisha", secondName: "Adnan", thirdName: "Faris" },
  { firstName: "Kareem", secondName: "Sami", thirdName: "Raheem" },
  { firstName: "Layla", secondName: "Zubair", thirdName: "Rashid" },
  { firstName: "Bilal", secondName: "Sameer", thirdName: "Hakeem" },
  { firstName: "Yasin", secondName: "Amjad", thirdName: "Mustafa" },
  { firstName: "Jalal", secondName: "Salah", thirdName: "Nadim" },
  { firstName: "Hana", secondName: "Saif", thirdName: "Mahmoud" },
  { firstName: "Tamer", secondName: "Zain", thirdName: "Othman" },
  { firstName: "Mariam", secondName: "Rafiq", thirdName: "Bassam" },
  { firstName: "Nour", secondName: "Karim", thirdName: "Munir" },
];

const names = Object.freeze(
  _names.map((n) => ({
    ...n,
    fullName: `${n.firstName} ${n.secondName} ${n.thirdName}`,
  })),
);
type name = (typeof names)[number];

export function getFullName(index = 0, iterations = 0): string {
  if (index >= names.length) {
    index = 0;
    iterations++;
  }
  const theName = names[index++];
  if (iterations) {
    theName.thirdName = theName.thirdName + (iterations || "");
    theName.fullName = theName.fullName + (iterations || "");
  }
  return theName.fullName;
}

export function getName(index = 0, iterations = 0): NameParts {
  if (index >= names.length) {
    index = 0;
    iterations++;
  }
  const theName = _names[index++];
  if (iterations) {
    theName.thirdName = theName.thirdName + (iterations || "");
  }
  return theName;
}

type NameParts = {
  firstName: string;
  secondName: string;
  thirdName: string;
};
