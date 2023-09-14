import React from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";
import SingUp from "../js/component/SingUp";
import Login from "../js/component/Login";

const LoginPage = () => {
    return (
        <div>
        <AppBar position={"static"}>
            <Toolbar>
                <Typography variant={'h6'}>
                    <p>로그인</p>
                </Typography>
            </Toolbar>
        </AppBar>
        <Login />
        </div>
    );
};

export default LoginPage;