import { Component, For, createEffect, createSignal } from "solid-js";
import { createCostFromFile } from "../../hooks/createPredictionFromFile";
import CSVInput from "../input/CSVInput";
import Form from "../Form";
import { roundDecimals } from "../../logic/roundDecimals";

const FileCost: Component = () => {
  const { costs, sumCost, setFile } = createCostFromFile();
  const [costRow, setCostRow] = createSignal(0);
  return (
    <Form title="File Cost" outputTitle="Total cost $:" output={sumCost()}>
      <div>
        <CSVInput
          label="File"
          id="file-cost"
          onChange={(e) => setFile(() => e.target.files![0])}
        />
      </div>
      <div>
        <label for="sel-cost">Select Cost</label>
        <select
          id="sel-cost"
          onInput={(e) => {
            const cost = costs()!.find(
              (cost) => cost === Number(e.target.value)
            );
            setCostRow(roundDecimals(cost!));
          }}
        >
          <option value="" selected disabled hidden>
            Choose here
          </option>
          <For each={costs()}>
            {(cost, index) => <option value={cost}>{index()}</option>}
          </For>
        </select>
        <div class="flex justify-between text-lg">
          <span>Cost:</span>
          <span>{costRow()}</span>
        </div>
      </div>
    </Form>
  );
};

export default FileCost;
