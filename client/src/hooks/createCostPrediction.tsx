import { createResource, createSignal } from "solid-js";
import { fetchCost } from "../logic/fetchAPI";

/**
 * The function creates a cost prediction tool that takes in initial time and capacity values and
 * returns signals for time and capacity, as well as a resource for cost based on those values.
 * @param {number} initialTime - The initial value for the time signal, which represents the amount of
 * time needed for a certain task or process.
 * @param {number} initialCapacity - The initial value for the capacity signal, which represents the
 * amount of resources available for a task or project.
 * @returns The function `createCostPrediction` returns an object with three properties:
 */
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
