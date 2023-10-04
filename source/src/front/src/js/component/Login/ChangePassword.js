import React, { useState } from 'react';
import { TextField, Stack, Button } from '@mui/material';
import axios from 'axios';
import {SERVER_URL} from "../Common/constants";

const ChangePassword = ({
                            usernameForChange, handleMouseEnter, handleMouseLeave, buttonColors, closeModal
                        }) => {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    console.log(usernameForChange)
    const handleChangePassword = async () => {
        if (!/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+).{8,15}$/.test(password)) {
            setErrorMessage('비밀번호는 영어, 숫자, 특수문자를 포함하여 8~15 자리로 만들어 주세요.');
            return;
        }
        if (password !== passwordConfirm) {
            setErrorMessage("비밀번호와 확인 비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await axios.put(`${SERVER_URL}members/id/${usernameForChange}/${password}`);

            if (response.status === 200) {
                alert("비밀번호가 변경 되었습니다!");
                closeModal(); // 비밀번호 변경 후 모달 닫기
            } else {
                setErrorMessage("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            setErrorMessage("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <Stack style={{ boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)', padding: '10px' }}>
            <h4>비밀번호 변경</h4>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: '10px', borderRadius: '4px' }}>
                <Stack spacing={1} style={{ flex: 1 }}>
                    <TextField
                        label="비밀번호를 입력해 주세요"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!errorMessage && errorMessage === '비밀번호는 영어, 숫자, 특수문자를 포함하여 8~15 자리로 만들어 주세요.'}
                        helperText={errorMessage === '비밀번호는 영어, 숫자, 특수문자를 포함하여 8~15 자리로 만들어 주세요.' ? errorMessage : ''}
                        style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                    />
                    <TextField
                        label="비밀번호 확인"
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        error={!!errorMessage && errorMessage === '비밀번호와 확인 비밀번호가 일치하지 않습니다.'}
                        helperText={errorMessage === '비밀번호와 확인 비밀번호가 일치하지 않습니다.' ? errorMessage : ''}
                        style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                    />
                </Stack>
                <Button
                    variant="contained"
                    style={{
                        maxHeight: '250px',
                        marginLeft: '10px',
                        backgroundColor: buttonColors.btn3,
                        fontWeight: 'bold',
                        border: 'none',
                        borderRadius: '5px',
                        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s'
                    }}
                    onClick={handleChangePassword}
                    onMouseEnter={() => handleMouseEnter("btn3")}
                    onMouseLeave={() => handleMouseLeave("btn3")}
                >
                    비밀번호 변경
                </Button>
            </div>
        </Stack>
    );
};

export default ChangePassword;