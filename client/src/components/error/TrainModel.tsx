import CSVInput from "../input/CSVInput";
import NumberInput from "../input/NumberInput";
import Form from "../Form";
import { createModelFromFile } from "../../hooks/createPredictionFromFile";
import { Image } from "../Image";

export function TrainModel() {
  const { accuracy, rocCurve, setFile, trainSplit, setTrainSplit } =
    createModelFromFile();
  return (
    <Form title="Train Model" outputTitle="Accuracy %: " output={accuracy}>
      <div>
        <label>Data</label>
        <CSVInput onChange={(e) => setFile(() => e.target.files![0])} />
        <label for="train-pct">Train/Test split %:</label>
        <NumberInput
          id="train-pct"
          value={trainSplit()}
          min="60"
          max="90"
          onChange={(value) => setTrainSplit(() => value)}
        />
      </div>
      <div class="flex flex-col items-center">
        Roc Curve
        <Image src={rocCurve} />
      </div>
    </Form>
  );
}
