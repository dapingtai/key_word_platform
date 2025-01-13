import { Component, JSX, Show } from 'solid-js';
import '../styles/Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
  title?: string;
}

const Modal: Component<ModalProps> = (props) => {
  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  return (
    <Show when={props.isOpen}>
      <div class="modalBackdrop" onClick={handleBackdropClick}>
        <div class="modalContent">
          {props.title && <div class="modalHeader">
            <h2>{props.title}</h2>
            <button class="closeButton" onClick={props.onClose}>
              ×
            </button>
          </div>}
          <div class="modalBody">
            {props.children}
          </div>
        </div>
      </div>
    </Show>
  );
};

export default Modal;