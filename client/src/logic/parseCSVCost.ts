/**
 * The function parses a CSV string or ArrayBuffer and returns an array of arrays representing the
 * columns of the CSV data.
 * @param {string | ArrayBuffer} csv - The `csv` parameter is a string or an `ArrayBuffer` that
 * contains the CSV data to be parsed.
 * @param [includeHeader=false] - includeHeader is a boolean parameter that determines whether the
 * first line of the CSV file should be included in the returned array. If it is set to true, the first
 * line will be included as the header row, and subsequent lines will be parsed as data rows. If it is
 * set to false (the
 * @returns The function `parseCSV` returns an array of arrays, where each inner array represents a row
 * of the CSV file and each element of the inner array represents a column value. The function parses
 * the CSV string or ArrayBuffer input and splits it into lines and columns based on the comma
 * separator. If `includeHeader` is set to `false`, the first line (header) is excluded from the
 * output.
 */
export function parseCSV(csv: string | ArrayBuffer, includeHeader = false) {
  let csvLines = csv.toString().split("\n");
  if (!includeHeader) {
    csvLines = csvLines.slice(1);
  }
  const csvLinesWithoutEmptyLines = csvLines.filter((line) => line.length > 0);
  const columnsCSV = csvLinesWithoutEmptyLines.map((line) => line.split(","));
  return columnsCSV;
}

/**
 * The function parses a CSV file and returns an object with two arrays containing time and capacity
 * data.
 * @param {string | ArrayBuffer} csvFile - The csvFile parameter is a string or ArrayBuffer that
 * contains the CSV data to be parsed.
 * @returns The function `parseCSVCost` is returning an object with two properties: `time` and
 * `capacity`. The `time` property is an array of integers representing the time values parsed from the
 * CSV file, and the `capacity` property is an array of integers representing the capacity values
 * parsed from the CSV file.
 */
export function parseCSVCost(csvFile: string | ArrayBuffer) {
  const csv = parseCSV(csvFile);
  const time = csv.map((column) => parseInt(column[0]));
  const capacity = csv.map((column) => parseInt(column[1]));
  return { time, capacity };
}
