import axios from "axios";
import {SERVER_URL} from "../Common/constants";
import Stack from "@mui/material/Stack";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

const FindId = ({
                    phoneNumber, setPhoneNumber,
                    labelText, setLabelText,
                    buttonText, setButtonText,
                    errorText, setErrorText,
                    userInputCode, setUserInputCode,
                    isVerified, setIsVerified,
                    smsSent, setSmsSent,
                    memberId, setMemberId,
                    handleMouseEnter, handleMouseLeave,
                    buttonColors
                }) => {

    const checkPhoneNumber = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}members/check/tel/${phoneNumber}`);
            if (!response.data) {
                setErrorText("해당 번호로 가입한 아이디가 없습니다!");
                setSmsSent(false);  // SMS 발송 실패
            } else {
                // SMS 발송
                const verificationResponse = await axios.post(`${SERVER_URL}sms/tel-check/${phoneNumber}`);

                setLabelText("인증번호를 입력하세요");
                setButtonText("인증번호 확인");
                setSmsSent(true);  // SMS 발송 성공
                setErrorText("");  // 에러 메시지 초기화
                alert('인증번호가 발송 되었습니다!');
            }
        } catch (error) {
            console.error(error);
            setErrorText("오류가 발생했습니다.");
            setSmsSent(false);  // SMS 발송 실패
        }
    };

    const checkVerificationCode = async () => {
        try {
            const verificationResponse = await axios.post(`${SERVER_URL}sms/verify/${phoneNumber}/${userInputCode}`);
            if (verificationResponse.status === 200) {
                setErrorText("");
                setLabelText("찾은 아이디");
                alert('아이디를 찾았습니다!')
                setIsVerified(true);

                const idResponse = await axios.get(`${SERVER_URL}members/id-tel/${phoneNumber}`);
                const receivedMemberId = idResponse.data;

                setMemberId(receivedMemberId); // 상태 업데이트
            }else{
                setErrorText("인증번호가 일치하지 않습니다!");
                setIsVerified(false);
            }
        } catch (error) {
            setErrorText("인증번호가 일치하지 않습니다!");
            setIsVerified(false);
        }
    };

    return (
        <Stack style={{  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)', padding:'10px'}}>
            <h4>아이디 찾기</h4>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: '10px', borderRadius: '4px' }}>
                <Stack spacing={1} style={{ flex: 1 }}>
                    <TextField
                        label={labelText}
                        error={Boolean(errorText)}
                        helperText={errorText}
                        value={smsSent && isVerified ? memberId : (smsSent ? userInputCode : phoneNumber)}
                        onChange={(e) => {
                            if (smsSent) {
                                setUserInputCode(e.target.value);
                            } else {
                                setPhoneNumber(e.target.value);
                            }
                        }}
                        style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                    />
                </Stack>
                <Button
                    variant="contained"
                    style={{
                        maxHeight: '250px',
                        marginLeft: '10px',
                        backgroundColor: buttonColors.btn1,
                        fontWeight: 'bold',
                        border: 'none',
                        borderRadius: '5px',
                        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s'
                    }}
                    onClick={smsSent ? checkVerificationCode : checkPhoneNumber}
                    onMouseEnter={() => handleMouseEnter("btn1")}
                    onMouseLeave={() => handleMouseLeave("btn1")}
                >
                    {buttonText}
                </Button>
            </div>
        </Stack>
    );
};

export default FindId;