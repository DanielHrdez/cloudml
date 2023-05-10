import { createEffect, createSignal } from "solid-js";
import { fetchCostFromJSON } from "../logic/fetchAPI";
import { parseCSVCost } from "../logic/parseCSVCost";

export function createPredictionFromFile(
  csvParser: (csv: string) => object,
  fetcher: (csvObject: object) => Promise<any>
) {
  const [prediction, setPrediction] = createSignal();
  const [file, setFile] = createSignal<File>();
  const reader = new FileReader();
  reader.onload = (e) => {
    const csvObject = csvParser(e.target!.result!.toString());
    fetcher(csvObject).then((response) => setPrediction(response));
  };
  createEffect(() => {
    if (file()) reader.readAsText(file()!);
  });
  return { prediction, setFile };
}

// export function createCostFromFile() {
//   const [cost, setCost] = createSignal(0);
//   const [file, setFile] = createSignal<File>();
//   const reader = new FileReader();
//   reader.onload = (e) => {
//     const timeCapacityObject = parseCSVCost(e.target!.result!);
//     fetchCostFromJSON(timeCapacityObject).then((cost) => setCost(cost));
//   };
//   createEffect(() => {
//     if (file()) reader.readAsText(file()!);
//   });
//   return { cost, setFile };
// }

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
