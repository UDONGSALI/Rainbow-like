import { useState } from "react";
import axios from 'axios'; // axios를 사용한다고 가정합니다.
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import {SERVER_URL} from "../Common/constants";

const FindPassword = ({
                          handleMouseEnter, handleMouseLeave,
                          buttonColors, onPasswordChangeSuccess // 비밀번호 변경 컴포넌트로 이동하기 위한 콜백 함수
                      }) => {
    const [username, setUsername] = useState("");
    const [phoneNumberForPassword, setPhoneNumberForPassword] = useState("");
    const [isVerificationStep, setIsVerificationStep] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
    const [phoneErrorMessage, setPhoneErrorMessage] = useState("");

    const handleFindPassword = async () => {
        try {
            const isExistingUser = await axios.get(`${SERVER_URL}members/check/memId/${username}`);
            if (!isExistingUser) {
                setUsernameErrorMessage("존재하지 않는 아이디입니다!"); // 에러 메시지 설정
                return;
            }

            const userPhoneNumber = await axios.get(`${SERVER_URL}members/tel-id/${username}`);
            if (userPhoneNumber.data != phoneNumberForPassword) {
                setUsernameErrorMessage("");
                setPhoneErrorMessage("해당 아이디의 전화번호가 아닙니다!"); // 에러 메시지 설정
                return;
            }

            // 아이디와 전화번호 확인 후 인증번호 전송
            await axios.post(`${SERVER_URL}sms/tel-check/${phoneNumberForPassword}`);
            alert("인증번호가 발송 되었습니다!");

            // 전화번호 입력 숨기기
            setIsVerificationStep(true);
            setUsernameErrorMessage(""); // 에러 메시지 초기화
            setPhoneErrorMessage(""); // 에러 메시지 초기화
        } catch (error) {
            console.error("Error during finding password:", error);
            if (error.response && error.response.status === 404||500) {
                setUsernameErrorMessage("존재하지 않는 아이디입니다!");
            } else {
                setUsernameErrorMessage("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };

    const handleVerification = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}sms/verify/${phoneNumberForPassword}/${verificationCode}`);
            if (response.status === 200) {
                alert("인증이 완료 되었습니다!");
                onPasswordChangeSuccess(username); // 아이디(username)를 인자로 전달
            } else {
                alert("인증번호가 일치하지 않습니다!");
            }
        } catch (error) {
            console.error("Error during finding password:", error);
            if (error.response && error.response.status === 400) {
                setUsernameErrorMessage("인증번호가 일치하지 않습니다!");
            } else {
                setUsernameErrorMessage("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };

    return (
        <Stack style={{ boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)', padding: '10px' }}>
            <h4>비밀번호 찾기</h4>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: '10px', borderRadius: '4px' }}>
                <Stack spacing={1} style={{ flex: 1 }}>
                    <TextField
                        label={isVerificationStep ? "인증번호를 입력해 주세요" : "아이디를 입력해 주세요"}
                        value={isVerificationStep ? verificationCode : username}
                        onChange={(e) => isVerificationStep ? setVerificationCode(e.target.value) : setUsername(e.target.value)}
                        style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                        error={!!usernameErrorMessage}
                        helperText={usernameErrorMessage}
                    />
                    {!isVerificationStep && (
                        <TextField
                            label="가입할 때 사용한 전화번호를 입력해 주세요"
                            value={phoneNumberForPassword}
                            onChange={(e) => setPhoneNumberForPassword(e.target.value)}
                            style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                            error={!!phoneErrorMessage}
                            helperText={phoneErrorMessage}
                        />
                    )}
                </Stack>
                <Button
                    variant="contained"
                    style={{
                        maxHeight: '250px',
                        marginLeft: '10px',
                        backgroundColor: buttonColors.btn2,
                        fontWeight: 'bold',
                        border: 'none',
                        borderRadius: '5px',
                        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s'
                    }}
                    onClick={isVerificationStep ? handleVerification : handleFindPassword}
                    onMouseEnter={() => handleMouseEnter("btn2")}
                    onMouseLeave={() => handleMouseLeave("btn2")}
                >
                    {isVerificationStep ? "인증번호 확인" : "인증번호 전송"}
                </Button>
            </div>
        </Stack>
    );
};

export default FindPassword;
