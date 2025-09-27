export type SortOrder = "asc" | "desc";

export default function sortTableData<T>(
  items: T[],
  sortBy: keyof T,
  order: SortOrder = "asc"
): T[] {
  if (!items || items.length === 0) return [];

  const sortedItems = [...items];

  sortedItems.sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];

    if (valA == null && valB != null) return order === "asc" ? -1 : 1;
    if (valB == null && valA != null) return order === "asc" ? 1 : -1;
    if (valA == null && valB == null) return 0;

    if (typeof valA === "number" && typeof valB === "number") {
      return order === "asc" ? valA - valB : valB - valA;
    }

    if (valA instanceof Date && valB instanceof Date) {
      return order === "asc"
        ? valA.getTime() - valB.getTime()
        : valB.getTime() - valA.getTime();
    }

    const strA = String(valA).toLowerCase();
    const strB = String(valB).toLowerCase();
    if (strA < strB) return order === "asc" ? -1 : 1;
    if (strA > strB) return order === "asc" ? 1 : -1;
    return 0;
  });

  return sortedItems;
}
