import Form from "../Form";
import CSVInput from "../input/CSVInput";
import { For, createEffect, createSignal } from "solid-js";
import { createModelPredictionFromFile } from "../../hooks/createPredictionFromFile";
import { SVG } from "../SVG";

export function TestModel({ models }: { models: () => any[] }) {
  const { histogram, nErrors, pctError, setFile, setModel } =
    createModelPredictionFromFile();
  return (
    <Form title="Predict" outputTitle="Errors: " output={nErrors()}>
      <div>
        <CSVInput
          label="Data"
          id="data-predict"
          onChange={(e) => setFile(() => e.target.files![0])}
        />
        <label for="sel-model">Select Model</label>
        <select
          id="sel-model"
          onInput={(e) => {
            const model = models().find((m) => m.name === e.target.value);
            setModel(model!.model);
          }}
          onChange={(e) => {
            const model = models().find((m) => m.name === e.target.value);
            setModel(model!.model);
          }}
        >
          <option value="" selected disabled hidden>
            Choose here
          </option>
          <For each={models()}>
            {(model) => <option value={model.name}>{model.name}</option>}
          </For>
        </select>
      </div>
      <div class="flex flex-col">
        <div class="flex justify-between text-lg">
          <span>Pct Error:</span>
          <span>{pctError()}%</span>
        </div>
        <div class="flex flex-col justify-between items-center">
          <span>Histogram</span>
          <SVG svg={histogram()} />
        </div>
      </div>
    </Form>
  );
}
