import { CSVErrorTrain, CSVErrorTest } from "./types";

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
  return columnsCSV.map((column) => {
    const lastElement = column[column.length - 1];
    column[column.length - 1] = lastElement.slice(0, lastElement.length - 1);
    return column;
  });
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
export function parseCSVCost(
  csvFile: string | ArrayBuffer
): [number, number][] {
  const csv = parseCSV(csvFile);
  return csv.map((column) => [parseInt(column[0]), parseInt(column[1])]);
}

export function parseCSVError<T>(
  csvFile: string | ArrayBuffer,
  parseTrainTest: (column: string[]) => T
): T[] {
  const csv = parseCSV(csvFile);
  return csv.map((column) => {
    return parseTrainTest(column);
  });
}

export function parseCSVErrorTrain(csvFile: string | ArrayBuffer): CSVErrorTrain[] {
  return parseCSVError<CSVErrorTrain>(csvFile, (column) => {
    const job_name = column[0];
    const started_time = column[1];
    const run_state = column[2] === "1";
    return { job_name, started_time, run_state };
  });
}

export function parseCSVErrorTest(csvFile: string | ArrayBuffer): CSVErrorTest[] {
  return parseCSVError<CSVErrorTest>(csvFile, (column) => {
    const job_name = column[0];
    const started_time = column[1];
    return { job_name, started_time };
  });
}
