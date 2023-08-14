import { Component } from "solid-js";

/**
 * This is a TypeScript React component that renders a service section with a title and children
 * components.
 * @param props - An object containing two properties:
 * @returns A React functional component named `Service` is being returned. It takes in two props,
 * `title` and `children`, and returns a div element with a gradient background color, a title, a line,
 * and the children passed in as props.
 */
const Service: Component<{
  title: string;
  children: any;
}> = (props) => {
  return (
    <div
      class="
        w-full
        flex
        flex-col
        items-center
        bg-gradient-to-br
        from-gray-600
        to-indigo-950
        rounded-2xl
        drop-shadow-xl
      "
    >
      <h1 class="text-2xl font-bold">{props.title}</h1>
      <div class="w-full h-px bg-gray-900"></div>
      <div
        class="
          h-full
          flex
          flex-col
          justify-evenly
          gap-4
          p-4
        "
      >
        {props.children}
      </div>
    </div>
  );
};

export default Service;
