import { Component, Show } from "solid-js";
import SingleCost from "./SingleCost";
import FileCost from "./FileCost";

const Cost: Component = (props) => {
  return (
    <div>
      <SingleCost
        initialTime={100}
        initialCapacity={10}
        timeMinValue={0}
        capacityMinValue={1}
      />
      <FileCost />
    </div>
  );
};

export default Cost;
