import React, {memo} from 'react';
import Login from "../../component/Login/Login/Login";
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/LoginHeader";

const LoginPage = () => {

    return (
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'Login'}/>
            <Login/>
        </div>
    );
};

export default memo(LoginPage);