import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../Common/constants';
import {Button,Snackbar,Stack,TextField,Typography,} from '@mui/material';
import { Link } from 'react-router-dom';
import FindIdPasswordModal from './FindIdPasswordModal';
import { useToken } from '../hook/useToken';

function Login() {
    // 상태 변수 정의
    const [memId, setMemId] = useState(sessionStorage.getItem('memId'));
    const { decodeToken: decodeAndSetToken, deleteTokenFromServer, getToken } = useToken();
    const storedFailedAttempts = localStorage.getItem('failedAttempts') || 0;
    const [failedAttempts, setFailedAttempts] = useState(
        parseInt(storedFailedAttempts, 10)
    );

    const [firstNum, setFirstNum] = useState(
        Math.floor(Math.random() * 90 + 10)
    );
    const [secondNum, setSecondNum] = useState(
        Math.floor(Math.random() * 90 + 10)
    );
    const [captchaAnswer, setCaptchaAnswer] = useState('');
    const [buttonColor, setButtonColor] = useState('#a38ced');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const customLinkStyle = {
        textDecoration: 'none',
        color: '#a38ced',
    };

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setMemId(sessionStorage.getItem("memId"));
    }, []);

    // 아이디/비밀번호 입력 시 상태 업데이트
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // 자동입력 방지 문자열 입력 시 상태 업데이트
    const handleCaptchaAnswerChange = (e) => {
        setCaptchaAnswer(e.target.value);
    };

    // Enter 키 입력 시 로그인 시도
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            login();
        }
    };

    const login = () => {
        getToken(user).then(response => {
            if (response.success) {
                alert('로그인 되었습니다!');

                // 성공적으로 토큰을 받았을 때 세션 스토리지에 저장된 정보를 업데이트
                decodeAndSetToken(response.token);

                // 필요한 경우 다른 로직 추가
                setFailedAttempts(0); // 로그인 성공 시 실패 횟수 초기화

                // 새로운 캡차 문제 설정
                setFirstNum(Math.floor(Math.random() * 90 + 10));
                setSecondNum(Math.floor(Math.random() * 90 + 10));

                window.location.reload();
            } else {
                // 로그인 실패 처리
                setFailedAttempts(failedAttempts + 1); // 실패 횟수 1 증가
                setOpen(true);  // 로그인 실패 알림 표시
            }
        });
    };

    const logout = () => {
        const jti = sessionStorage.getItem('jti'); // 세션 스토리지에서 jti를 가져옴
        if (jti) {
            deleteTokenFromServer(jti);
        }
        sessionStorage.clear();
        window.location.reload();
    };

    const handleSubmit = () => {
        login();
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (memId) {
        // 로그인한 상태면 환영 메시지와 로그아웃 버튼을 표시
        return (
            <div
                style={{
                    width: '60%',
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px',
                    backgroundColor: '#f9f9f9',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                    borderRadius: '5px',
                }}
            >
                <Stack
                    alignItems="flex-start"
                    style={{
                        width: '40%',
                        padding: '20px',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                        borderRadius: '5px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            padding: '16px',
                            borderRadius: '4px',
                        }}
                    >
                        <Stack style={{ flex: '1' }}>
                            <Typography variant="h5" style={{ lineHeight: '1', marginTop: '25px' }}>
                                {memId}님, 환영합니다!
                            </Typography>
                            <br />
                        </Stack>
                        <Button
                            variant="contained"
                            style={{
                                maxHeight: '250px',
                                marginLeft: '10px',
                                backgroundColor: buttonColor,
                                fontWeight: 'bold',
                                border: 'none',
                                borderRadius: '5px',
                                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
                                transition: 'all 0.3s',
                            }}
                            onClick={logout}
                            onMouseEnter={() => {
                                setButtonColor('#53468b');
                            }}
                            onMouseLeave={() => {
                                setButtonColor('#a38ced');
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                </Stack>
            </div>
        );
    }


    return (
        <div style={{
            width: '60%',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
            borderRadius: '5px'
        }}>
            <Stack alignItems='flex-start' style={{
                width: '42%',
                padding: '10px',
                backgroundColor: '#ffffff',
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                borderRadius: '5px'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    padding: '16px',
                    borderRadius: '4px'
                }}>
                    <Stack spacing={2} style={{flex: 1}}>
                        <TextField
                            name="username"
                            label="아이디"
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}
                        />
                        <TextField
                            type={"password"}
                            name="password"
                            label="비밀번호"
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}
                        />
                        {failedAttempts >= 5 && (
                            <TextField
                                name="captcha"
                                label={`${firstNum} * ${secondNum} = ?`}
                                value={captchaAnswer}
                                onChange={handleCaptchaAnswerChange}
                                style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}
                            />
                        )}
                    </Stack>
                    <Button
                        variant="contained"
                        style={{
                            maxHeight: '250px',
                            marginLeft: '10px',
                            backgroundColor: buttonColor,
                            fontWeight: 'bold',
                            border: 'none',
                            borderRadius: '5px',
                            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.3s'
                        }}
                        onClick={handleSubmit}
                        onMouseEnter={() => {
                            setButtonColor("#53468b");
                        }}
                        onMouseLeave={() => {
                            setButtonColor("#a38ced");
                        }}
                    >
                        Login
                    </Button>
                </div>
                <div style={{padding: '16px', borderRadius: '4px', width: '100%'}}>
                    <Typography variant="body2" style={{fontSize: '14px'}}>
                        <span role="img" aria-label="Question mark in circle">😳</span>
                        아이디나 비밀번호를 잊어버리셨나요?
                        <Link
                            onClick={handleOpenModal}
                            style={customLinkStyle}
                        >
                            <strong> 아이디/비밀번호 찾기</strong>
                        </Link>
                    </Typography>
                    <br/>
                    <Typography variant="body2" style={{fontSize: '14px'}}>
                        <span role="img" aria-label="Exclamation mark in circle">😖</span>
                        아직 세종여성플라자의 회원이 아니신가요?
                        <Link to="/signup" style={customLinkStyle}> <strong>회원가입</strong></Link>
                    </Typography>
                </div>
            </Stack>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message="로그인에 실패했습니다."
            />
            <FindIdPasswordModal isOpen={isModalOpen} handleClose={handleCloseModal}/>
        </div>
    );
}

export default React.memo(Login);