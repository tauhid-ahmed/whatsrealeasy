export default function urlSegmentName(segment: string): string {
  return segment
    .replace(/[^a-zA-Z0-9]+/g, " ") // replace _ and - (and multiple) with space
    .trim() // remove extra spaces from start/end
    .split(" ") // split into words
    .filter(Boolean) // remove empty parts
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
