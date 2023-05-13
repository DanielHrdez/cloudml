import { Component } from "solid-js";
import { TrainModel } from "./TrainModel";
import { TestModel } from "./TestModel";
import Service from "../Service";

const Error: Component = () => {
  return (
    <Service title="Error Prediction">
      <TrainModel />
      <TestModel />
    </Service>
  );
};

export default Error;
