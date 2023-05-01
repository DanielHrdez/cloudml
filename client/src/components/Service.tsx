import { Component } from "solid-js";

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
      {/* line */}
      <div class="w-full h-1 bg-gray-900 mb-4"></div>
      {props.children}
    </div>
  );
};

export default Service;
