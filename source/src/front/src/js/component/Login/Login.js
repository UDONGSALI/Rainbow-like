import React, {useState} from "react";
import {SERVER_URL} from "../../../constants";
import {Button, Snackbar, Stack, TextField} from '@mui/material'
import { useNavigate } from 'react-router-dom';

function Login() {

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const [isAuthenticated, setAuth] = useState(false);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    };

    const login = () => {
        fetch(SERVER_URL + 'login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
            .then(res => {
                const jwtToken = res.headers.get('Authorization');
                if (jwtToken !== null) {
                    sessionStorage.setItem("jwt", jwtToken);
                    setAuth(true);
                    navigate(-1);
                } else {
                    setOpen(true);
                };
            })
            .catch(err => console.error(err));
    };

    const [loading, setLoading] = useState(true);

    const handleSubmit = () => {
        setLoading(true);
        login();
    };

    // 리렌더 방지
    const [isHovered, setHovered] = useState(false);


    return (
        <div>
            <Stack spacing={2} alignItems='center' mt={2}>
                <TextField
                    name="username"
                    label="Username"
                    onChange={handleChange}/>
                <TextField
                    name="password"
                    label="Password"
                    onChange={handleChange}/>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleSubmit}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    Login
                </Button>
            </Stack>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message="로그인에 실패했습니다."
            />
        </div>
    );
}

export default React.memo(Login);