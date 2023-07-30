import React, { useState} from 'react';
import Modal from './ModalPage';
import './LoginPage.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [Telephone, setTelephone] = useState("");
    localStorage.removeItem("count");
    const navigate = useNavigate(); 
    const [isOpen, setIsOpen] = useState(false)

    const onTelephoneHandler = (event) => {
        setTelephone(event.currentTarget.value);
    }


    const openModalHandler = (event) => {
        event.preventDefault();
        setIsOpen(!isOpen) 
    };

    const validatePhoneNumber = (phoneNumber) => {  // 유효성 검사 함수
        const pattern = /^010-\d{4}-\d{4}$/;
        return pattern.test(phoneNumber);
    }

    const handlelogin = async(event)=> {
        event.preventDefault();
        try {
            await axios.post('/api/login', {
                userPhone: Telephone,
            });
            alert('로그인 성공!!!');
            navigate('/timeline');
        } catch (error) {
            console.error('Error registering user:', error);
            alert('로그인 실패!!! 휴대폰 인증을 해주세요!!!!!'); // 실패 메세지 설정
        }
    }
    
    
    return (
        <div className='div-outer'>
            <form className='div-inner'>
                <section className='sec-container'>
                    <h1 className='header-title'>인스타그랜마</h1>
                    <input className='input-tel' type='tel' value={Telephone} onChange={onTelephoneHandler} placeholder='전화번호'/>
                    <br/>
                    
                    <button className='button-login' formAction='' onClick={handlelogin}>로그인</button>
                    
                </section>
            </form>
            <form className='div-inner2'>
                <section className='sec-container'>
                <button className='button-register' formAction='' onClick={openModalHandler}>휴대폰 인증</button>
                {isOpen ? <Modal openModalHandler={openModalHandler} /> : null}
                </section>
            </form>

        </div>
       
        
    )
 }
 
export default LoginPage;

