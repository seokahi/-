import React, {useEffect, useState} from "react";
import { Avatar } from '@mui/material'; //이름 프로필
import './MyProfile.css';
import NicknameModal from "./NicknameModal";
import ConfirmModal from "./ConfirmModal";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import axios from "axios";

function MyProfile() {
    const [user, setUser] = useState({});
    const [myPosts, setMyPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedName, setEditedName] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleNicknameChange = (newNickname) => {
        setEditedName(newNickname);
        setIsModalOpen(false);
    };

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };
    
    return (
        <div>
            <div className='app-header'>
                <h1 className="header-letter-title"><a href="/timeline" style={{ color: '#000', textDecoration: 'none' }}>인스타그랜마</a></h1>
                <div className='header-icons'>
                    {/*<AccountCircleOutlinedIcon fontSize="large"/>*/}
                </div>
                <h1>내 정보</h1>
            </div>

            <div className="profile-container">
                <div className="user-profile">
                    <h2><Avatar sx={{ width: 100, height: 100 }}>{editedName || user.name}</Avatar></h2>
                    <span>{editedName || user.name}</span>
                </div>

                <div className="user-information">
                    <h3>{user.postCount}</h3> <span>게시글 수</span>
                </div>

                <div className="profile-edit">
                    <div className="edit-button custom-button">
                        <button onClick={handleEditClick}>
                            닉네임 변경</button>
                    </div>
                    <div className="edit-button custom-button">
                        <button onClick={handleDeleteClick}>
                            로그아웃</button>
                    </div>
                    <div className="exit-button custom-button">
                        <button onClick={handleDeleteClick}>
                            회원 탈퇴</button>
                    </div>
                </div>




            </div>

        </div>
    );
}

export default MyProfile;