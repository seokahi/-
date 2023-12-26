import React, { useState,useEffect } from "react";
import Timer from "./TimerPage";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './JoinPage.css';
const port = process.env.REACT_APP_PORT || 3001;

function Join(props) {
    const [Telephone, setTelephone] = useState("");
    const [Name, setName] = useState("");
    const [Certnum, setCertnum] = useState("");
    const [Counter,setCounter] = useState(false);
    const navigate = useNavigate(); // navigate 함수를 초기화합니다
    const onTelephoneHandler = (event) => {
        setTelephone(event.currentTarget.value);
    }

    const onUserHandler = (event) => {
        setName(event.currentTarget.value);
    }
    
    const onCertnumHandler = (event) => {
        setCertnum(event.currentTarget.value);
        setCounter(false);
    }

    const validatePhoneNumber = (phoneNumber) => {  // 유효성 검사 함수
        const pattern = /^010-\d{4}-\d{4}$/;
        return pattern.test(phoneNumber);
    }

    const handleAuthlogin = async(event) => {
        event.preventDefault();
        if (!validatePhoneNumber(Telephone)) {  // 유효성 검사
            alert('전화번호 형식이 올바르지 않습니다!!!!');
            return;
        }

        if (Certnum !== "0000") {
            alert('인증번호가 올바르지 않습니다.'); // 인증번호가 0000이 아닐 때 경고창 표시
            return;
        }

        try {
                await axios.post(`http://localhost:${port}/register`, {
                userName: Name,
                userPhone: Telephone,
            });
                 alert('회원가입을 축하합니다!!!!');
            navigate('/');
        } catch (error) {
            console.error('Error registering user:', error);
            alert('이미 등록되어 있는 회원입니다.'); // 실패 메세지 설정
        }
}




    return (
        <div className="div-modal-container" onClick={props.openModalHandler}>
                    <div className="div-modal-inner-container" onClick={(e) => e.stopPropagation()}>
                        <button className="button-modal" onClick={props.openModalHandler}>x</button>
                        <br/>
                        <p className="p-content">1)이름과 전화번호 입력 후 인증번호 받기를 눌러주세요</p>
                        <br/>
                        <div className="div-modal-tel">
                            <input className='input-tel input-modal-user' type='text' value={Name} onChange={onUserHandler} placeholder='이름'/>
                            <input className='input-tel input-modal-tel' type='tel' value={Telephone} onChange={onTelephoneHandler} placeholder='전화번호'/>
                            {/* <button className="button-modal-tel" disabled='true'>재전송</button> */}
                        </div>
                        <button className="button-input-modal-tel" onClick={(e) => {e.preventDefault();setCounter(!Counter);}}>인증번호 받기</button>{Counter ? <Timer /> : null}
                        <p className="p-sec-content">2)휴대폰으로 전송된 4자리 인증번호를 입력하세요</p>
                        <div className="div-modal-certification">
                            <input className='input-tel input-modal-certification' type='tel' value={Certnum} onChange={onCertnumHandler} placeholder='인증번호'/>
                            <button className="button-modal-tel" onClick={handleAuthlogin}>입력</button>
                        </div>
                    </div>
        </div>
        )
    }
export default Join;