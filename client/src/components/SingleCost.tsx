import { Component, Show } from "solid-js";
import { createCostPrediction } from "../hooks/createCostPrediction";
import { positiveIntMinValue } from "../logic/positiveIntMinValue";

const SingleCost: Component<{
  initialTime: number;
  initialCapacity: number;
  timeMinValue: number;
  capacityMinValue: number;
}> = (props) => {
  const {
    timeSignal: { time, setTime },
    capacitySignal: { capacity, setCapacity },
    costResource: { cost },
  } = createCostPrediction(props.initialTime, props.initialCapacity);
  function handleTimeChange(e: any) {
    const value = positiveIntMinValue(e.target.value, props.timeMinValue);
    setTime(value);
  }
  function handleCapacityChange(e: any) {
    const value = positiveIntMinValue(e.target.value, props.capacityMinValue);
    setCapacity(value);
  }
  return (
    <div>
      <form class="flex flex-col">
        <label for="time">Time (segs):</label>
        <input
          type="number"
          onChange={handleTimeChange}
          value={time()}
          min={props.timeMinValue}
        />
        <label for="capacity">Capacity (workers):</label>
        <input
          type="number"
          onChange={handleCapacityChange}
          value={capacity()}
          min={props.capacityMinValue}
        />
      </form>
      <output>
        AWS process will cost:
        <Show when={cost()} fallback={<span>...</span>}>
          <span>{Math.round(cost()! * 100) / 100}$</span>
        </Show>
      </output>
    </div>
  );
};

export default SingleCost;
