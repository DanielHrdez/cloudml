const DOMAIN = "127.0.0.1:8000";
const ROUTE = `http://${DOMAIN}/api`;

export async function fetchCost(props: {
  time: number;
  capacity: number;
}): Promise<number> {
  const response = await fetch(
    `${ROUTE}/cost/time=${props.time}&capacity=${props.capacity}`
  );
  return (await response.json()).cost;
}

export async function fetchCostFromJSON(timeCapacityObject: {
  time: number[];
  capacity: number[];
}) {
  const content = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(timeCapacityObject),
  };
  const response = await fetch(`${ROUTE}/cost`, content);
  return (await response.json()).cost;
}
