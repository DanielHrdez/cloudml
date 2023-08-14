import { Component, createSignal } from "solid-js";
import { TrainModel } from "./TrainModel";
import { TestModel } from "./TestModel";
import Service from "../Service";
import { loadModels } from "../../logic/modelStorage";

const Error: Component = () => {
  const [models, setModels] = createSignal(loadModels());
  const addModel = (model: any) => {
    setModels((models) => [...models, model]);
  };
  return (
    <Service title="Error Prediction">
      <TrainModel addModel={addModel} />
      <TestModel models={models} />
    </Service>
  );
};

export default Error;
