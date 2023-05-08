import { Component } from "solid-js";
import { TrainErrorModel } from "./TrainErrorModel";
import { TestErrorModel } from "./TestErrorModel";

const Error: Component = () => {
  return (
    <div class="h-full flex flex-col justify-evenly">
      <TrainErrorModel />
      <TestErrorModel />
    </div>
  );
};

export default Error;
