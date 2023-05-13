import { Component, Show } from "solid-js";
import { createCostFromFile } from "../../hooks/createPredictionFromFile";
import CSVInput from "../input/CSVInput";
import Form from "../Form";

const FileCost: Component = () => {
  const { cost, setFile } = createCostFromFile();
  return (
    <Form
      title="File Cost"
      outputTitle="The total cost of the file will be $:"
      output={cost()}
    >
      <div>
        <label for="file-cost">File:</label>
        <CSVInput
          id="file-cost"
          onChange={(e) => setFile(() => e.target.files![0])}
        />
      </div>
    </Form>
  );
};

export default FileCost;
