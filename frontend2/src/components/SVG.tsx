import { Component } from "solid-js";

export const SVG: Component<{ svg: string | undefined }> = (props) => {
  const handleClick = () => {
    if (!props.svg) return;
    const w = window.open("", "_blank", "width=800,height=600");
    if (!w) return;
    w.document.write(props.svg);
  };
  return (
    <div
      innerHTML={props.svg || ""}
      class="
        rounded-lg
        shadow-lg
        border-2
        border-gray-200
        cursor-pointer
        hover:shadow-xl
        hover:border-gray-300
        hover:scale-105
        transition-all
        w-[125px]
        h-[125px]
        overflow-hidden
      "
      onClick={handleClick}
    />
  );
};
