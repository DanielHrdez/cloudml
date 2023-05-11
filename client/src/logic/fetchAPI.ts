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
    `/api/cost/time=${props.time}&capacity=${props.capacity}`
  );
  return (await response.json()).cost;
}

/**
 * This function fetches the cost from a JSON file using a time and capacity object and returns it as a
 * promise.
 * @param timeCapacityObject - `timeCapacityObject` is an object that contains two arrays: `time` and
 * `capacity`. The `time` array represents the time values and the `capacity` array represents the
 * capacity values. These arrays are used to calculate the cost of a certain operation. The function
 * sends a POST request to
 * @returns a Promise that resolves to a number, which is the cost value obtained from a JSON file
 * fetched from a server API endpoint.
 */
export async function fetchCostFromJSON(timeCapacityObject: {
  time: number[];
  capacity: number[];
}): Promise<number> {
  const content = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(timeCapacityObject),
  };
  const response = await fetch(`/api/cost/file`, content);
  return (await response.json()).cost;
}
