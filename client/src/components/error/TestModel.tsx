import Form from "../Form";
import CSVInput from "../input/CSVInput";

export function TestModel() {
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
      <label>Data</label>
      <CSVInput onChange={(e) => setFile(e.target.files![0])} />
      <label for="sel-model">Select Model</label>
      <select id="sel-model">
        <option value="model1">Model 1</option>
        <option value="model2">Model 2</option>
        <option value="model3">Model 3</option>
      </select>
    </Form>
  );
}
