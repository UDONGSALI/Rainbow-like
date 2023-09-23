import React, { useState, useEffect } from 'react';
import { SERVER_URL } from '../Common/constants';
import { Button, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import FindIdPasswordModal from "./FindIdPasswordModal";

function Login() {
    // 로그인 실패 횟수를 localStorage에서 가져옵니다.
    const storedFailedAttempts = localStorage.getItem('failedAttempts') || 0;
    const [failedAttempts, setFailedAttempts] = useState(parseInt(storedFailedAttempts, 10));

    // 실패 횟수를 localStorage에 저장합니다.
    useEffect(() => {
        localStorage.setItem('failedAttempts', failedAttempts);
    }, [failedAttempts]);

    // 두 자리수 곱셈 문제
    const [firstNum, setFirstNum] = useState(Math.floor(Math.random() * 90 + 10));
    const [secondNum, setSecondNum] = useState(Math.floor(Math.random() * 90 + 10));
    const [captchaAnswer, setCaptchaAnswer] = useState('');
    const [buttonColor, setButtonColor] = useState(" #a38ced");
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const customLinkStyle = {
        textDecoration: 'none',
        color: '#a38ced'
    };

    const [isAuthenticated, setAuth] = useState(false);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleCaptchaAnswerChange = (e) => {
        setCaptchaAnswer(e.target.value);
    };

    const login = () => {
        if (failedAttempts >= 5) {
            if (parseInt(captchaAnswer, 10) !== firstNum * secondNum) {
                alert('자동입력 방지 문자가 잘못되었습니다.');
                return;
            }
        }

        fetch(SERVER_URL + 'login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(res => {
                const jwtToken = res.headers.get('Authorization');
                if (jwtToken !== null) {
                    sessionStorage.setItem("jwt", jwtToken);
                    setAuth(true);
                    navigate(-1);
                    setFailedAttempts(0); // 로그인 성공 시 실패 횟수를 0으로 초기화
                    // 문제를 새로운 것으로 설정
                    setFirstNum(Math.floor(Math.random() * 90 + 10));
                    setSecondNum(Math.floor(Math.random() * 90 + 10));
                } else {
                    setFailedAttempts(failedAttempts + 1); // 로그인 실패 시 실패 횟수를 1 증가
                    setOpen(true);
                }
            })
            .catch(err => {
                console.error(err);
                setFailedAttempts(failedAttempts + 1); // 예외 발생 시 실패 횟수를 1 증가
            });
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
                width: '50%',
                padding: '20px',
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
                            style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}
                        />
                        <TextField
                            type={"password"}
                            name="password"
                            label="비밀번호"
                            onChange={handleChange}
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
                            // 마우스가 버튼 위에 올라갔을 때
                        }}
                        onMouseLeave={() => {
                            setButtonColor("#a38ced");
                            // 마우스가 버튼에서 빠져나갔을 때
                        }}
                    >
                        Login
                    </Button>
                </div>
                <div style={{padding: '16px', borderRadius: '4px', width: '100%'}}>
                    <Typography variant="body2">
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
                    <Typography variant="body2" style={{fontSize: '16px'}}>
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