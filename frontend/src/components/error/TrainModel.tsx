import CSVInput from "../input/CSVInput";
import NumberInput from "../input/NumberInput";
import Form from "../Form";
import { createModelFromFile } from "../../hooks/createPredictionFromFile";
import { createEffect } from "solid-js";
import { SVG } from "../SVG";

export function TrainModel({ addModel }: { addModel: (model: any) => void }) {
  const { model, accuracy, rocCurve, setFile, trainSplit, setTrainSplit } =
    createModelFromFile();
  createEffect(() => {
    if (model()) {
      addModel(model());
    }
  });
  return (
    <Form title="Train Model" outputTitle="Accuracy %: " output={accuracy()}>
      <div>
        <CSVInput
          label="Data"
          id="data-train"
          onChange={(e) => setFile(() => e.target.files![0])}
        />
        <NumberInput
          label="Train/Test split %:"
          id="train-pct"
          value={trainSplit()}
          min="60"
          max="90"
          onChange={(value) => setTrainSplit(() => value)}
        />
      </div>
      <div class="flex flex-col items-center">
        Roc Curve
        <SVG svg={rocCurve()} />
      </div>
    </Form>
  );
}
