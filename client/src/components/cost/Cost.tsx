import { Component } from "solid-js";
import SingleCost from "./SingleCost";
import FileCost from "./FileCost";
import Service from "../Service";

const Cost: Component = () => {
  return (
    <Service title="Cost Prediction">
      <SingleCost initialTime={100} initialCapacity={10} />
      <FileCost />
    </Service>
  );
};

export default Cost;
