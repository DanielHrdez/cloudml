import { Component } from "solid-js";
import { createCostPrediction } from "../hooks/createCostPrediction";

const Cost: Component<{
  initialTime: number;
  initialCapacity: number;
}> = (props) => {
  // const {
  //   timeSignal: { time, setTime },
  //   capacitySignal: { capacity, setCapacity },
  //   costResource: { cost },
  // } = createCostPrediction(props.initialTime, props.initialCapacity);
  return <></>;
  return (
    <div class="">
      Time (segs):
      <input
        type="number"
        onChange={(e: any) => setTime(e.target.value)}
        value={time()}
        min="0"
      />
      Capacity (workers):
      <input
        type="number"
        onChange={(e: any) => setCapacity(e.target.value)}
        value={capacity()}
        min="1"
      />
      <h1>
        AWS process will cost: <br />
        {Math.round(cost() * 100) / 100}$
      </h1>
    </div>
  );
};

export default Cost;
