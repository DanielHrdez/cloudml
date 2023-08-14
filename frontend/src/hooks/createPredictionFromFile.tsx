import { createEffect, createSignal } from "solid-js";
import {
  fetchCostFromJSON,
  fetchModel,
  fetchModelPrediction,
} from "../logic/fetchAPI";
import { saveModel } from "../logic/modelStorage";
import {
  parseCSVCost,
  parseCSVErrorTest,
  parseCSVErrorTrain,
} from "../logic/parseCSV";
import { roundDecimals } from "../logic/roundDecimals";

/**
 * This function creates a prediction from a CSV file using a CSV parser and a fetcher.
 * @param parser - A function that takes a CSV string as input and returns a parsed object of type
 * T.
 * @param fetcher - The `fetcher` parameter is a function that takes in an object of type `T` (which is
 * the result of parsing a CSV file) and returns a Promise that resolves to an object of type `U`
 * (which is the prediction generated from the CSV data).
 * @returns An object with two properties: `prediction` and `setFile`.
 */
export function createPredictionFromFile<T, U>(
  parser: (file: string) => T,
  fetcher: (csvObject: T) => Promise<U>,
  preprocessResponse: (response: U) => U = (response) => response
) {
  const [prediction, setPrediction] = createSignal<U>();
  const [file, setFile] = createSignal<File>();
  const reader = new FileReader();
  reader.onload = (e) => {
    const parsed = parser(e.target!.result!.toString());
    fetcher(parsed).then((response) =>
      setPrediction(() => preprocessResponse(response))
    );
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
  const [sumCost, setSumCost] = createSignal<number>();
  createEffect(() => {
    if (prediction()) {
      const sum = prediction()!.reduce((acc, cost) => acc + cost, 0);
      setSumCost(() => roundDecimals(sum, 2));
    }
  });
  return {
    costs: prediction,
    sumCost,
    setFile,
  };
}

export function createModelFromFile(initialTrainSplit = 80) {
  const [trainSplit, setTrainSplit] = createSignal(initialTrainSplit);
  const [model, setModel] = createSignal<object>();
  const [accuracy, setAccuracy] = createSignal<number>();
  const [rocCurve, setRocCurve] = createSignal<string>();
  const { prediction, setFile } = createPredictionFromFile(
    parseCSVErrorTrain,
    (data) => fetchModel(data, trainSplit() / 100)
  );
  createEffect(() => {
    if (prediction()) {
      const model = prediction()!.model;
      const name = saveModel(model);
      setModel(() => ({ name, model }));
      setAccuracy(() => Math.round(prediction()!.accuracy * 100) / 100);
      setRocCurve(() => prediction()!.roc);
    }
  });
  return {
    model,
    accuracy,
    rocCurve,
    setFile,
    trainSplit,
    setTrainSplit,
  };
}

export function createModelPredictionFromFile() {
  const [model, setModel] = createSignal<string>();
  const [histogram, setHistogram] = createSignal<string>();
  const [nErrors, setNErrors] = createSignal<number>();
  const [pctError, setPctError] = createSignal<number>();
  const { prediction, setFile } = createPredictionFromFile(
    parseCSVErrorTest,
    (data) => fetchModelPrediction(data, model()!)
  );
  createEffect(() => {
    if (prediction()) {
      setHistogram(() => prediction()!.histogram);
      setNErrors(() => prediction()!.nErrors);
      setPctError(() => prediction()!.pctErrors);
    }
  });
  return {
    histogram,
    nErrors,
    pctError,
    setFile,
    setModel,
  };
}
