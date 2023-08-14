import { CSVErrorTrain, CSVErrorTest } from "./types";

/**
 * This TypeScript function fetches the cost from an API based on time and capacity parameters.
 * @param props - The `props` parameter is an object that contains two properties:
 * @returns The function `fetchCost` returns a Promise that resolves to a number, which is the cost
 * returned from the API endpoint.
 */
export async function fetchCost(props: {
  time: number;
  capacity: number;
}): Promise<number> {
  const response = await fetch(
    `/cost?time=${props.time}&capacity=${props.capacity}`
  );
  return (await response.json()).cost;
}

/**
 * This function fetches the cost from a JSON file using a time and capacity object and returns it as a
 * promise.
 * @param csvTimeCapacity - `timeCapacityObject` is an object that contains two arrays: `time` and
 * `capacity`. The `time` array represents the time values and the `capacity` array represents the
 * capacity values. These arrays are used to calculate the cost of a certain operation. The function
 * sends a POST request to
 * @returns a Promise that resolves to a number, which is the cost value obtained from a JSON file
 * fetched from a server API endpoint.
 */
export async function fetchCostFromJSON(
  csvTimeCapacity: [number, number][]
): Promise<number[]> {
  const response = await fetchFromJSON<number[]>(
    { time_capacities: csvTimeCapacity },
    `/cost/file`
  );
  return response;
}

export async function fetchModel(
  csvError: CSVErrorTrain[],
  trainSplit: number = 0.8
): Promise<{ model: object; accuracy: number; roc: string }> {
  return await fetchFromJSON(
    { data: csvError },
    `/error/train?split=${trainSplit}`
  );
}

export async function fetchModelPrediction(
  csvError: CSVErrorTest[],
  model: string
): Promise<{ nErrors: number; pctErrors: number; histogram: string }> {
  return await fetchFromJSON(
    { data: csvError, model: model },
    `/error/predict`
  );
}

export async function fetchFromJSON<T>(data: {}, url: string): Promise<T> {
  const content = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, content);
  return await response.json();
}
