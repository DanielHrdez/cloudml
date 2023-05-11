import { Component, Show } from "solid-js";
import { createCostFromFile } from "../../hooks/createCostFromFile";
import CSVInput from "../CSVInput";

const FileCost: Component = () => {
  const { cost, setFile } = createCostFromFile();
  return (
    <div>
      <CSVInput onChange={(e) => setFile(e.target.files![0])} />
      The total cost of the file will be:
      <Show when={cost()} fallback={<span>...</span>}>
        <span>{Math.round(cost()! * 100) / 100}$</span>
      </Show>
    </div>
  );
};

export default FileCost;
