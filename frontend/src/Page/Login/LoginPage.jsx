import React, { useState} from 'react';
import axios from "axios";
import './LoginPage.css';
import Join from '../Join/JoinPage';

const port = process.env.REACT_APP_PORT || 3001;

function LoginPage() {
    const [Telephone, setTelephone] = useState("");
    const [Name, setName] = useState("");
    const [isOpen, setIsOpen] = useState(false)

    const onTelephoneHandler = (event) => {
        setTelephone(event.currentTarget.value);
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }

    const openModalHandler = (event) => {
        event.preventDefault();
        setIsOpen(!isOpen) 
    };

    const validatePhoneNumber = (phoneNumber) => {  // 유효성 검사 함수
        const pattern = /^010-\d{4}-\d{4}$/;
        return pattern.test(phoneNumber);
    }


    const handlelogin = async(event) => {
        event.preventDefault();
        if (!validatePhoneNumber(Telephone)) {  // 유효성 검사
            alert('전화번호 형식이 올바르지 않습니다!!!!');
            return;
        }

        try {
            await axios.post(`http://localhost:${port}/login`, {
                userName: Name,
                userPhone: Telephone,
            });
            alert('로그인 성공!!!');
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
                    <input className='input-name' type='name' value={Name} onChange={onNameHandler} placeholder='이름'/>
                    <br/>
                    <input className='input-tel' type='tel' value={Telephone} onChange={onTelephoneHandler} placeholder='전화번호'/>
                    <br/>
                    
                    <button className='button-login' formAction='' onClick={handlelogin}>로그인</button>
                    
                </section>
            </form>
            <form className='div-inner2'>
                <section className='sec-container'>
                <button className='button-register' formAction='' onClick={openModalHandler}>휴대폰 인증</button>
                {isOpen ? <Join openModalHandler={openModalHandler} /> : null}
                </section>
            </form>

        </div>
       
        
    )
 }
 
export default LoginPage;

