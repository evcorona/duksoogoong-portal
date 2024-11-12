export default function formatNumberWithMask(
  number: number | string,
  mask: string,
) {
  if (!number) return "";

  const numToString = String(number);
  let formatted = "";
  let numIndex = 0;

  for (let i = 0; i < mask.length; i++) {
    const currentChar = mask[i];

    if (currentChar === "0") {
      if (numIndex < numToString.length) {
        formatted += numToString[numIndex];
        numIndex++;
      } else formatted += " ";
    } else formatted += currentChar;
  }

  return formatted;
}
