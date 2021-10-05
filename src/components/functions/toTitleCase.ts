// Capitalise the first letter of each word
export default function toTitleCase(phrase: string): string {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
