const links: Readonly<string[]> = [
  "https://placehold.co/100x100/333333/999999/png",
  "https://placehold.co/100x100/FF5733/FFFFFF/png",
  "https://placehold.co/100x100/4CAF50/FFFFFF/png",
  "https://placehold.co/100x100/2196F3/FFFFFF/png",
  "https://placehold.co/100x100/9C27B0/FFFFFF/png",
  "https://placehold.co/100x100/E91E63/FFFFFF/png",
  "https://placehold.co/100x100/FFEB3B/333333/png",
  "https://placehold.co/100x100/FFC107/333333/png",
  "https://placehold.co/100x100/673AB7/FFFFFF/png",
  "https://placehold.co/100x100/607D8B/FFFFFF/png",
  "https://placehold.co/100x100/8BC34A/FFFFFF/png",
  "https://placehold.co/100x100/795548/FFFFFF/png",
  "https://placehold.co/100x100/00BCD4/FFFFFF/png",
  "https://placehold.co/100x100/FF9800/333333/png",
  "https://placehold.co/100x100/9E9E9E/FFFFFF/png",
];

export function getImageUrl(index = 0): string {
  if (index >= links.length) {
    index = 0;
  }
  return links[index++];
}
