import React from "react";
import Modal from "react-modal";
import "./ConfirmModal.css";
import axios from "axios";

Modal.setAppElement("#root");

function ConfirmModal({ isOpen, onRequestClose}) {

    const handleConfirm = async () => {
        // api 받아올 예정
      };
    

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>정말로 탈퇴하시겠습니까?</h2>
      <h4>게시글과 회원정보가 모두 삭제됩니다.</h4>
      <div className="modal-buttons">
        <button onClick={handleConfirm}>예</button>
        <button onClick={onRequestClose}>아니오</button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
