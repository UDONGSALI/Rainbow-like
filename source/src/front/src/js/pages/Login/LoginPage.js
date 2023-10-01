import React from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";
import Login from "../../component/Login/Login";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/LoginHeader";

const LoginPage = () => {
    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} />
            <Login />
        </div>
    );
};

export default LoginPage;