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
        h-full
        flex
        flex-col
        items-center
        bg-gradient-to-br
        from-teal-500
        to-indigo-950
      "
    >
      <h1 class="text-xl font-bold text-gray-100">{props.title}</h1>
      <div class="w-full h-1 bg-gray-900 mb-4"></div>
      <div class="h-full flex flex-col justify-evenly">{props.children}</div>
    </div>
  );
};

export default Service;
