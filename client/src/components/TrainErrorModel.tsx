export function TrainErrorModel() {
  // const { cost, setFile } = createCostFromFile();
  return (
    <div class="w-full">
      <h2>Train Model</h2>
      <div class="flex justify-evenly">
        <form>
          <input
            type="file"
            accept=".csv"
            // onChange={(e) => setFile(e.target.files![0])}
          />
          <p>
            Train/Test Split:
            <input
              type="number"
              min="60"
              max="90"
              value={75}
            />%
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
