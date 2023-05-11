import { Component, Show } from "solid-js";
import { createCostPrediction } from "../../hooks/createCostPrediction";
import NumberInput from "../NumberInput";

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
        <NumberInput
          id="time"
          value={time()}
          min={0}
          max={Number.MAX_SAFE_INTEGER}
          onChange={(value) => setTime(value)}
        />
        <label for="capacity">Capacity (workers):</label>
        <NumberInput
          id="capacity"
          value={capacity()}
          min={1}
          max={Number.MAX_SAFE_INTEGER}
          onChange={(value) => setCapacity(value)}
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
