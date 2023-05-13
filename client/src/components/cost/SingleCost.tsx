import { Component, Show } from "solid-js";
import { createCostPrediction } from "../../hooks/createCostPrediction";
import NumberInput from "../input/NumberInput";
import Form from "../Form";

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
    <Form
      title="Single Cost"
      outputTitle="AWS process will cost $:"
      output={cost()}
    >
      <div>
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
      </div>
    </Form>
  );
};

export default SingleCost;
