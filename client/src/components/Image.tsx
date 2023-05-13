import { Component } from "solid-js";

export const Image: Component<{ src: string | undefined }> = (props) => {
  return (
    <img
      src={props.src}
      width="100"
      height="100"
      class="
        rounded-lg
        shadow-lg
        border-2
        border-gray-200
      "
    />
  );
};
