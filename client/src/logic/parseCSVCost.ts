export function parseCSV(csv: string | ArrayBuffer, includeHeader = false) {
  let csvLines = csv.toString().split("\n");
  if (!includeHeader) {
    csvLines = csvLines.slice(1);
  }
  const csvLinesWithoutEmptyLines = csvLines.filter((line) => line.length > 0);
  const columnsCSV = csvLinesWithoutEmptyLines.map((line) => line.split(","));
  return columnsCSV;
}

export function parseCSVCost(csvFile: string | ArrayBuffer) {
  const csv = parseCSV(csvFile);
  const time = csv.map((column) => parseInt(column[0]));
  const capacity = csv.map((column) => parseInt(column[1]));
  return { time, capacity };
}
