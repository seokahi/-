import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import axios from "axios";

Modal.setAppElement('#root');

function NicknameModal({ isOpen, onRequestClose, onNicknameChange }) {
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handleUserPhoneChange = (e) => {
    setUserPhone(e.target.value);
  };
  const handleSubmit = async () => {
    // onNicknameChange(editedNickname);
    // setEditedNickname('');
    try {
      await axios.post('/api/update', {
        userName: userName,
        userPhone: userPhone
      });
      alert('회원정보가 수정되었습니다!!');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('회원정보 수정을 실패했습니다!!');
    }
    window.location.href = "./myprofile"
    onRequestClose();
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Nickname Modal"
    >
      <h2>닉네임 변경</h2>
      <input
        type="text"
        value={userName}
        onChange={handleUserNameChange}
        placeholder="userName"
      />
      <input
          type="text"
          value={userPhone}
          onChange={handleUserPhoneChange}
          placeholder="userPhone"
      />
      <button onClick={handleSubmit}>확인</button>
      <button onClick={onRequestClose}>취소</button>
    </Modal>
  );
}

export default NicknameModal;

