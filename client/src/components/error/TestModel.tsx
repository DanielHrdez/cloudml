import { loadModels } from "../../logic/modelStorage";
import Form from "../Form";
import CSVInput from "../input/CSVInput";
import { createSignal, For } from "solid-js";
import { Image } from "../Image";

export function TestModel() {
  const models = loadModels();
  const [file, setFile] = createSignal<File>();
  return (
    // <div class="w-full">
    //   <h2>Predict</h2>
    //   <div class="flex justify-evenly">
    //     <p>Data: /xd2.csv</p>
    //     <p>Select Model: [models]</p>
    //   </div>
    //   <div class="flex justify-evenly">
    //     <p>Errors: 203</p>
    //     <p>Pct Error: 37%</p>
    //   </div>
    //   <div class="flex justify-evenly">
    //     <p>Select nº data: [row]</p>
    //     <p>Error: [error row]</p>
    //   </div>
    //   <div class="flex justify-evenly">
    //     <p>Histogram:</p>
    //     <p>[histogram]</p>
    //   </div>
    // </div>
    <Form title="Predict" outputTitle="Errors: " output="203">
      <div>
        <label>Data</label>
        <CSVInput onChange={(e) => setFile(() => e.target.files![0])} />
        <label for="sel-model">Select Model</label>
        <select id="sel-model">
          <For each={models}>
            {(model) => <option value={model.name}>{model.name}</option>}
          </For>
        </select>
      </div>
      <div class="flex flex-col">
        <div class="flex justify-between">
          <span>Pct Error:</span>
          <span>37%</span>
        </div>
        <div class="flex justify-between">
          <label for="sel-row">Select nº data</label>
          <select id="sel-row">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div class="flex justify-between">
          <span>Error:</span>
          <span>65%</span>
        </div>
        <div class="flex flex-col justify-between items-center">
          <span>Histogram</span>
          <Image src={undefined} />
        </div>
      </div>
    </Form>
  );
}
