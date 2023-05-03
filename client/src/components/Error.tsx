import { Component } from "solid-js";

const Error: Component = () => {
  return (
    <div class="h-full flex flex-col justify-evenly">
      <div class="w-full">
        <div class="flex justify-evenly">
          <p>Train Model</p>
          <p>Type: [input]</p>
        </div>
        <div class="flex justify-evenly">
          <p>Data: /xd.csv</p>
          <p>Train/Test: 80%</p>
        </div>
        <div class="flex justify-evenly">
          <p>Accuracy: 61%</p>
          <p>ROC: [image]</p>
        </div>
      </div>
      <div class="w-full">
        <div class="flex justify-evenly">
          <p>Predict</p>
          <p>Select Model: [models]</p>
        </div>
        <div class="flex justify-evenly">
          <p>Data: /xd2.csv</p>
        </div>
        <div class="flex justify-evenly">
          <p>Errors: 203</p>
          <p>Pct Error: 37%</p>
        </div>
        <div class="flex justify-evenly">
          <p>Select nº data: [row]</p>
          <p>Error: [error row]</p>
        </div>
        <div class="flex justify-evenly">
          <p>Histogram</p>
          <p>[histogram]</p>
        </div>
      </div>
    </div>
  );
};

export default Error;
