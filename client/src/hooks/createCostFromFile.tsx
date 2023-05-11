import { createEffect, createSignal } from "solid-js";
import { fetchCostFromJSON } from "../logic/fetchAPI";
import { parseCSVCost } from "../logic/parseCSVCost";

/**
 * This function creates a prediction from a CSV file using a CSV parser and a fetcher.
 * @param csvParser - A function that takes a CSV string as input and returns a parsed object of type
 * T.
 * @param fetcher - The `fetcher` parameter is a function that takes in an object of type `T` (which is
 * the result of parsing a CSV file) and returns a Promise that resolves to an object of type `U`
 * (which is the prediction generated from the CSV data).
 * @returns An object with two properties: `prediction` and `setFile`.
 */
export function createPredictionFromFile<T, U>(
  csvParser: (csv: string) => T,
  fetcher: (csvObject: T) => Promise<U>
) {
  const [prediction, setPrediction] = createSignal<U>();
  const [file, setFile] = createSignal<File>();
  const reader = new FileReader();
  reader.onload = (e) => {
    const csvObject = csvParser(e.target!.result!.toString());
    fetcher(csvObject).then((response) => setPrediction(() => response));
  };
  createEffect(() => {
    if (file()) reader.readAsText(file()!);
  });
  return { prediction, setFile };
}

/**
 * This function creates a cost prediction from a file using CSV or JSON data.
 * @returns An object with two properties: `cost` and `setFile`. The `cost` property is the result of
 * calling the `createPredictionFromFile` function with the `parseCSVCost` and `fetchCostFromJSON`
 * functions as arguments. The `setFile` property is a function that can be used to set the file to be
 * used for the prediction.
 */
export function createCostFromFile() {
  const { prediction, setFile } = createPredictionFromFile(
    parseCSVCost,
    fetchCostFromJSON
  );
  return { cost: prediction, setFile };
}

export function createModelFromFile() {
  const { prediction, setFile } = createPredictionFromFile(
    JSON.parse,
    fetchCostFromJSON
  );
  return { model: prediction, setFile };
}
