import { Component, createSignal } from 'solid-js';
import Modal from './Modal';

const ModalExample: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      <Modal
        isOpen={isOpen()}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
      >
        <p>This is an example modal content.</p>
        <p>You can put any content here!</p>
      </Modal>
    </div>
  );
};

export default ModalExample;