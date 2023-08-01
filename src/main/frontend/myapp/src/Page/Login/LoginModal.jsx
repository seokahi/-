import React, { useState,useEffect } from "react";
import Timer from "./TimerPage";

function Modal(props) {
    const [Telephone, setTelephone] = useState("");
    const [UserName, setUserName] = useState("");
    const [Certnum, setCertnum] = useState("");
    const [Counter,setCounter] = useState(false);
    const onTelephoneHandler = (event) => {
        setTelephone(event.currentTarget.value);
    }

    const onUserHandler = (event) => {
        setUserName(event.currentTarget.value);
    }

    const onCertnumHandler = (event) => {
        setCertnum(event.currentTarget.value);
        setCounter(false);
    }


    const handleAuthlogin = () => {

    }


    return (
        <div className="div-modal-container" onClick={props.openModalHandler}>
            <div className="div-modal-inner-container" onClick={(e) => e.stopPropagation()}>
                <button className="button-modal" onClick={props.openModalHandler}>x</button>
                <br/>
                <p className="p-content">1)문자를 못 받으셨을 경우는 아래에 재전송 눌러주세요</p>
                <br/>
                <div className="div-modal-tel">
                    <input className='input-tel input-modal-user' type='text' value={UserName} onChange={onUserHandler} placeholder='이름'/>
                    <input className='input-tel input-modal-tel' type='tel' value={Telephone} onChange={onTelephoneHandler} placeholder='전화번호'/>
                    <button className="button-modal-tel" disabled='true'>재전송</button>
                </div>
                <button className="button-input-modal-åtel" onClick={(e) => {e.preventDefault();setCounter(!Counter);}}>인증번호 받기</button>{Counter ? <Timer /> : null}
                <p className="p-sec-content">2)휴대폰으로 전송된 4자리 인증번호를 입력하세요</p>
                <div className="div-modal-certification">
                    <input className='input-tel input-modal-certification' type='tel' value={Certnum} onChange={onCertnumHandler} placeholder='인증번호'/>
                    <button className="button-modal-tel" onClick={handleAuthlogin}>입력</button>
                </div>
            </div>
        </div>
    )
}
export default Modal;