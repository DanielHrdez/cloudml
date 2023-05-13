import { Component } from "solid-js";

/**
 * This is a TypeScript React component that renders an input field for uploading CSV files and
 * triggers a function when the file is selected.
 * @param props - The props parameter is an object that contains the properties passed down to the
 * CSVInput component. In this case, it contains a single property called onChange, which is a function
 * that will be called when the user selects a file using the input element. The function takes an
 * event object as its parameter, which
 * @returns A React functional component that renders an input element of type "file" with the accept
 * attribute set to ".csv". The component takes a prop called "onChange" which is a function that will
 * be called when the user selects a file. The function will receive an event object with the
 * currentTarget and target properties set to the input element.
 */
const CSVInput: Component<{
  onChange: (
    e: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => any;
  id?: string;
}> = (props) => {
  return (
    <input
      id={props.id}
      type="file"
      accept=".csv"
      onChange={props.onChange}
      class="input"
    />
  );
};

export default CSVInput;
