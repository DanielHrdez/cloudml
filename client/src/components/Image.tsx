import { Component, createSignal } from "solid-js";
import { Modal } from "./Modal";

export const Image: Component<{ src: string | undefined }> = (props) => {
  const handleClick = () => {
    if (!props.src) return;
    setShowModal(true);
  };
  const [showModal, setShowModal] = createSignal(false);
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
      onClick={handleClick}
    >
      {showModal() && (
        <Modal src={props.src!} onClose={() => setShowModal(false)} />
      )}
    </img>
  );
};
