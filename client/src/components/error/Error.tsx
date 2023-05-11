import { Component } from "solid-js";
import { TrainErrorModel } from "./TrainErrorModel";
import { TestErrorModel } from "./TestErrorModel";
import Service from "../Service";

const Error: Component = () => {
  return (
    <Service title="Error Prediction">
      <TrainErrorModel />
      <TestErrorModel />
    </Service>
  );
};

export default Error;
