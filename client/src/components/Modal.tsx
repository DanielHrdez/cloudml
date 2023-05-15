import { Component } from "solid-js";

export const Modal: Component<{ src: string; onClose: () => void }> = (
  props
) => {
  return (
    <div class="modal">
      <div class="modal-content">
        <span class="close" onClick={props.onClose}>
          &times;
        </span>
        <img src={props.src} />
      </div>
    </div>
  );
};
