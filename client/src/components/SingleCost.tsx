import { Component, Show } from "solid-js";
import { createCostPrediction } from "../hooks/createCostPrediction";

const SingleCost: Component<{
  initialTime: number;
  initialCapacity: number;
}> = (props) => {
  const {
    timeSignal: { time, setTime },
    capacitySignal: { capacity, setCapacity },
    costResource: { cost },
  } = createCostPrediction(props.initialTime, props.initialCapacity);
  return (
    <div>
      <form class="flex flex-col">
        <label for="time">Time (segs):</label>
        <input
          type="number"
          onChange={(e: any) => setTime(e.target.value)}
          value={time()}
          min="0"
        />
        <label for="capacity">Capacity (workers):</label>
        <input
          type="number"
          onChange={(e: any) => setCapacity(e.target.value)}
          value={capacity()}
          min="1"
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
