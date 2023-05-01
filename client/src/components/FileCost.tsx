import { Component, Show } from "solid-js";
import { createCostFromFile } from "../hooks/createCostFromFile";

const FileCost: Component = () => {
  const { cost, setFile } = createCostFromFile();
  function handleFileUpload(e: any) {
    setFile(e.target.files[0]);
  }
  return (
    <div>
      <form>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </form>
      The total cost of the file will be:
      <Show when={cost()} fallback={<span>...</span>}>
        <span>{Math.round(cost()! * 100) / 100}$</span>
      </Show>
    </div>
  );
};

export default FileCost;
