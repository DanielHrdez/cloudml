import { Component, Show } from "solid-js";

const Form: Component<{
  title: string;
  outputTitle: string;
  output: string | number | undefined;
  children: any;
}> = (props) => {
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
        drop-shadow-2xl
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
      <form class="flex flex-col">{props.children}</form>
      <output class="flex justify-between">
        {props.outputTitle}
        <Show when={props.output} fallback={<span>...</span>}>
          <span
            class="
              text-2xl
              font-bold
              text-center
              text-green-500
            "
          >
            {props.output}
          </span>
        </Show>
      </output>
    </div>
  );
};

export default Form;
