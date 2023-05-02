import { Component, Show } from "solid-js";
import SingleCost from "./SingleCost";
import FileCost from "./FileCost";

const Cost: Component<{
  initialTime: number;
  initialCapacity: number;
}> = (props) => {
  return (
    <div>
      <SingleCost {...props} />
      <FileCost />
    </div>
  );
};

export default Cost;
