import React, {useState} from "react";
import {SERVER_URL} from "../constants";
import Carlist from "./Carlist";
import {Snackbar, TextField,Stack, Button} from '@mui/material'


function Login() {

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    // const [isAuthenticated, setAuth] = useState(false);

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    }

    const [open, setOpen] = useState(false);

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
                    sessionStorage.setItem('isAuthenticated', true)
                    // setAuth(true);
                }
                else {
                    setOpen(true);
                }
            })
            .catch(err => console.error(err));
    }

    if (sessionStorage.getItem("isAuthenticated")) {
        return <Carlist/>
    } else {
        return (
            <div>
                <Stack spacing={2} alignItems='center' mt={2}>
                    <TextField
                        name="username"
                        label="Username"
                        onChange={handleChange} />
                    <TextField
                        name="password"
                        label="Password"
                        onChange={handleChange} />
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={login()}>
                        Login
                    </Button>
                </Stack>
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="Login failed: Check your username and password"
                />
            </div>
        );
    }
}

export default React.memo(Login);
