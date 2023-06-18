import React, { useState} from 'react';
import axios from "axios";
import './LoginPage.css';

const port = process.env.REACT_APP_PORT || 3001;

function LoginPage() {
    const [Telephone, setTelephone] = useState("");
    const [Name, setName] = useState("");
    const onTelephoneHandler = (event) => {
        setTelephone(event.currentTarget.value);
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }

    const handlelogin = async(event) => {
        event.preventDefault();
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

        </div>
       
        
    )
 }
 
export default LoginPage;

