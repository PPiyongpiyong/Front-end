import { IoClose } from "react-icons/io5";
import "../styles/Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // 모달이 열리지 않으면 아무 것도 렌더링하지 않음

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          <IoClose />
        </button>
        {children} 
      </div>
    </div>
  );
};

export default Modal;
