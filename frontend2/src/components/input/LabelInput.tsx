import { Component } from "solid-js";

const LabelInput: Component<{
  label: any;
  id: string;
  type: string;
  value?: number;
  min?: number | string;
  max?: number | string;
  onChange: (e: any) => any;
  accept?: string;
  class?: string;
}> = (props) => {
  const inputClass = "input" + (props.class ? " " + props.class : "");
  const isFile = props.type === "file";
  return (
    <>
      <label for={props.id}>{props.label}</label>
      {isFile ? (
        <input
          id={props.id}
          type={props.type}
          onChange={props.onChange}
          accept={props.accept}
          class={inputClass}
        />
      ) : (
        <input
          id={props.id}
          type={props.type}
          onChange={props.onChange}
          value={props.value}
          min={props.min}
          max={props.max}
          class={inputClass}
        />
      )}
    </>
  );
};

export default LabelInput;
