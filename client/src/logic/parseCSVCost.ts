export function parseCSVCost(csv: string | ArrayBuffer) {
  const csvLines = csv.toString().split("\n");
  const csvLinesWithoutHeader = csvLines.slice(1);
  const csvLinesWithoutEmptyLines = csvLinesWithoutHeader.filter(
    (line) => line.length > 0
  );
  const columns = csvLinesWithoutEmptyLines.map((line) => line.split(","));
  const time = columns.map((column) => parseInt(column[0]));
  const capacity = columns.map((column) => parseInt(column[1]));
  return { time, capacity };
}
