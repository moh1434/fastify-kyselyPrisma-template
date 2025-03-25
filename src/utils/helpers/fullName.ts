export function fullNameFrom(payload: {
  firstName: string;
  secondName: string;
  thirdName: string;
}) {
  return `${payload.firstName} ${payload.secondName} ${payload.thirdName}`;
}
