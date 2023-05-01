import { createResource, createSignal } from "solid-js";
import { fetchCost } from "../logic/fetchAPI";

export function createCostPrediction(
  initialTime: number,
  initialCapacity: number
) {
  const [time, setTime] = createSignal(initialTime);
  const [capacity, setCapacity] = createSignal(initialCapacity);
  const [cost] = createResource(
    () => ({ time: time(), capacity: capacity() }),
    fetchCost
  );
  return {
    timeSignal: { time, setTime },
    capacitySignal: { capacity, setCapacity },
    costResource: { cost },
  };
}
