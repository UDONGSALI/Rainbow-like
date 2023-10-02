import React, {useState} from 'react';
import SignUp from "../../component/Login/SignUp";
import SignAgreement from "../../component/Login/SignAgreement";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/LoginHeader";

function SignUpPage() {
    const [isAgreed, setIsAgreed] = useState({
        first: false,
        second: false
    });

    const handleAgreement = (first, second) => {
        setIsAgreed({first, second});
    };

    const handleSignUpClick = () => {
        if (!isAgreed.first || !isAgreed.second) {
            alert('약관에 동의하지 않으면 회원가입이 불가능합니다.');

        }
        // 회원가입 처리 로직
    };

    return (
        <>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'회원가입'}/>
            <div style={{display: 'flex', justifyContent: "center"}}>
                <SignAgreement onAgreementChange={handleAgreement}/>
                <SignUp onSignUpClick={handleSignUpClick}/>
            </div>
        </>
    );
}

export default SignUpPage;