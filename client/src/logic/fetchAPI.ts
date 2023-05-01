export async function fetchCost(props: { time: number; capacity: number }) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/cost/time=${props.time}&capacity=${props.capacity}`
  );
  return (await response.json()).cost;
}
