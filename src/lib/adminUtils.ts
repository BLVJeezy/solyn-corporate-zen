/** Parse a euro string like "1.500", "€1500", "1500,50" to a number */
export function parseEuro(val: string | null): number {
  if (!val) return 0;
  const cleaned = val.replace(/[€\s]/g, "").replace(/\./g, "").replace(",", ".");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

/** Format number as euro */
export function fmtEuro(val: number): string {
  return "€" + val.toLocaleString("nl-NL", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

/** Transaction fee rate */
export const TX_FEE_RATE = 0.02811;

/** Credit cost per unit */
export const CREDIT_COST = 0.23;

/** Export array of objects to CSV and download */
export function exportToCsv(data: Record<string, unknown>[], filename: string) {
  if (data.length === 0) return;
  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((h) => {
      const val = row[h];
      const str = val == null ? "" : String(val);
      return str.includes(",") || str.includes('"') ? `"${str.replace(/"/g, '""')}"` : str;
    }).join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** Export data as JSON and download */
export function exportToJson(data: unknown, filename: string) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
