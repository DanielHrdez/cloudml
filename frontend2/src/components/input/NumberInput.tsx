import { Component } from "solid-js";
import { intMinMax } from "../../logic/intMinMax";
import LabelInput from "./LabelInput";

/**
 * This is a TypeScript React component for a number input with minimum and maximum values and an
 * onChange event handler.
 * @param props - The props object contains the following properties:
 * @returns A React functional component called `NumberInput` that renders an HTML `input` element with
 * type `number`. The component takes in props such as `id`, `value`, `min`, `max`, and `onChange`, and
 * uses them to set the corresponding attributes of the `input` element. The `onChange` function is
 * called when the input value changes, and it uses the `intMinMax
 */
const NumberInput: Component<{
  label: any;
  id: string;
  value: number;
  min: number | string;
  max: number | string;
  onChange: (e: any) => any;
}> = (props) => {
  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = intMinMax(+target.value, +props.min, +props.max);
    props.onChange(value);
  }
  return (
    <LabelInput
      id={props.id}
      type="number"
      onChange={handleChange}
      value={props.value}
      min={props.min}
      max={props.max}
      label={props.label}
    />
  );
};

export default NumberInput;
