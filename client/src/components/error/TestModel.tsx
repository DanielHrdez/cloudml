import { loadModels } from "../../logic/modelStorage";
import Form from "../Form";
import CSVInput from "../input/CSVInput";
import { For, createEffect, createSignal } from "solid-js";
import { Image } from "../Image";
import { createModelPredictionFromFile } from "../../hooks/createPredictionFromFile";

export function TestModel() {
  const models = loadModels();
  const { predictions, histogram, nErrors, pctError, setFile, setModel } =
    createModelPredictionFromFile();
  const [row, setRow] = createSignal<number>();
  const [rowPrediction, setRowPrediction] = createSignal<number>();
  createEffect(() => {
    if (predictions() && row()) {
      setRowPrediction(() => predictions()![row()!]);
    }
  });
  return (
    <Form title="Predict" outputTitle="Errors: " output={nErrors()}>
      <div>
        <label>Data</label>
        <CSVInput onChange={(e) => setFile(() => e.target.files![0])} />
        <label for="sel-model">Select Model</label>
        <select
          id="sel-model"
          onChange={(e) =>
            setModel(models.find((m) => m.name === e.target.value)?.model)
          }
        >
          <For each={models}>
            {(model) => <option value={model.name}>{model.name}</option>}
          </For>
        </select>
      </div>
      <div class="flex flex-col">
        <div class="flex justify-between">
          <span>Pct Error:</span>
          <span>{pctError()}</span>
        </div>
        <div class="flex justify-between flex-col">
          <label for="sel-row">Row</label>
          <select id="sel-row" onChange={(e) => setRow(() => +e.target.value)}>
            <For each={predictions()}>
              {(p, i) => <option value={i()}>{p}</option>}
            </For>
          </select>
        </div>
        <div class="flex justify-between">
          <span>Row Error:</span>
          <span>{rowPrediction()}%</span>
        </div>
        <div class="flex flex-col justify-between items-center">
          <span>Histogram</span>
          <Image src={histogram()} />
        </div>
      </div>
    </Form>
  );
}
