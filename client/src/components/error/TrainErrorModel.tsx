import CSVInput from "../CSVInput";
import NumberInput from "../NumberInput";

export function TrainErrorModel() {
  // const { cost, setFile } = createCostFromFile();
  return (
    <div class="w-full">
      <h2>Train Model</h2>
      <div class="flex justify-evenly">
        <form>
          <CSVInput onChange={(e) => setFile(e.target.files![0])} />
          <p>
            Train/Test Split:
            <NumberInput
              id="train-pct"
              value={75}
              min="60"
              max="90"
              onChange={(value) => setTrainSplit(value)}
            />
            %
          </p>
        </form>
      </div>
      <div class="flex justify-evenly">
        <p>Accuracy: 61%</p>
        <p>ROC: [image]</p>
      </div>
    </div>
  );
}
