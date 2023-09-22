import React, { useState } from 'react';
import { Button, Modal, TextField, Stack } from '@mui/material';
import FindId from "./FindId";
import FindPassword from "./FindPassword";
import ChangePassword from "./ChangePassword";

const FindIdPasswordModal = ({ isOpen, handleClose }) => {

    // States
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userInputCode, setUserInputCode] = useState('');
    const [memberId, setMemberId] = useState("");
    const [labelText, setLabelText] = useState("가입할 때 사용한 전화번호를 입력해 주세요");
    const [buttonText, setButtonText] = useState("인증번호 전송");
    const [errorText, setErrorText] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [smsSent, setSmsSent] = useState(false);
    const [activeTab, setActiveTab] = useState('findId');
    const [usernameForChange, setUsernameForChange] = useState("");
    const [buttonColors, setButtonColors] = useState({
        btn1: "#a38ced",
        btn2: "#a38ced",
        btn3: "#a38ced"
    });

    // Handlers
    const handleMouseEnter = (btnId) => {
        setButtonColors({
            ...buttonColors,
            [btnId]: "#53468b"
        });
    };

    const handleMouseLeave = (btnId) => {
        setButtonColors({
            ...buttonColors,
            [btnId]: "#a38ced"
        });
    };

    const handleCloseWithReset = () => {
        // Reset states
        setPhoneNumber("");
        setLabelText("가입할 때 사용한 전화번호를 입력해 주세요");
        setButtonText("인증번호 전송");
        setErrorText("");
        setIsVerified(false);
        setSmsSent(false);
        setUserInputCode('');
        setMemberId("");

        // Close modal
        handleClose();
    };
    const renderActiveComponent = () => {
        const sharedProps = {
            handleMouseEnter,
            handleMouseLeave,
            buttonColors
        };

        switch (activeTab) {
            case 'findId':
                return <FindId
                    phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                    labelText={labelText} setLabelText={setLabelText}
                    buttonText={buttonText} setButtonText={setButtonText}
                    errorText={errorText} setErrorText={setErrorText}
                    userInputCode={userInputCode} setUserInputCode={setUserInputCode}
                    isVerified={isVerified} setIsVerified={setIsVerified}
                    smsSent={smsSent} setSmsSent={setSmsSent}
                    memberId={memberId} setMemberId={setMemberId}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    buttonColors={buttonColors}/>;
            case 'findPassword':
                return <FindPassword
                    onPasswordChangeSuccess={onPasswordChangeSuccess}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    buttonColors={buttonColors}
                />;
            case 'changePassword':
                return <ChangePassword
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    buttonColors={buttonColors}
                    usernameForChange={usernameForChange}  // 아이디 전달
                    closeModal={handleCloseWithReset}      // 여기서 closeModal로 전달
                />;
            default:
                return null;
        }
    };

    const onPasswordChangeSuccess = (userId) => {
        setActiveTab('changePassword');
        setUsernameForChange(userId); // 여기서 setUsernameForChange는 상태 설정 함수입니다. 해당 상태를 위에서 정의하고, 이 상태는 ChangePassword 컴포넌트로 전달되어야 합니다.
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleCloseWithReset}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        >
            <Stack
                style={{width: '30%', backgroundColor: 'white', padding: '20px', outline: 'none', borderRadius: '5px'}}>
                <Stack direction="row" spacing={2}>
                    <Button
                        onClick={() => setActiveTab('findId')}
                        style={{fontSize: '20px', color: '#a38ced', fontWeight:'bold'}}
                    >
                        아이디 찾기
                    </Button>
                    <Button
                        onClick={() => setActiveTab('findPassword')}
                        style={{fontSize: '20px', color: '#a38ced', fontWeight:'bold'}}
                    >
                        비밀번호 찾기
                    </Button>
                </Stack>
                <hr/>
                {renderActiveComponent()}
            </Stack>
        </Modal>
    );
}
export default FindIdPasswordModal;
