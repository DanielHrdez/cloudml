export async function fetchCost(props: {
  time: number;
  capacity: number;
}): Promise<number> {
  const response = await fetch(
    `/api/cost/time=${props.time}&capacity=${props.capacity}`
  );
  return (await response.json()).cost;
}

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

export async function fetchFromJSON(object: object) {
  const content = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  };
  const response = await fetch(`/api/cost/file`, content);
  return (await response.json()).cost;
}
