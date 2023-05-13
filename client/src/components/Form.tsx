import { Component, JSX, Show } from "solid-js";

const Form: Component<{
  title: string;
  outputTitle: string;
  output: string | number | undefined;
  children: [JSX.Element, JSX.Element] | JSX.Element;
}> = (props) => {
  let children: [JSX.Element, JSX.Element];
  if (Array.isArray(props.children)) {
    children = props.children as [JSX.Element, JSX.Element];
  } else {
    children = [props.children, <></>];
  }
  return (
    <div
      class="
        flex
        flex-col
        bg-slate-600
        bg-opacity-30
        rounded-2xl
        p-4
        gap-4
        drop-shadow-lg
      "
    >
      <h2
        class="
          text-xl
          font-bold
          text-center
        "
      >
        {props.title}
      </h2>
      <form class="flex flex-col">{children[0]}</form>
      <div>
        <output class="flex justify-between">
          <span class="font-bold">{props.outputTitle}</span>
          <Show
            when={props.output}
            fallback={<span class="text-red-300">...</span>}
          >
            <span
              class="
                text-xl
                font-bold
                text-center
                text-green-500
              "
            >
              {props.output}
            </span>
          </Show>
        </output>
        {children[1]}
      </div>
    </div>
  );
};

export default Form;
