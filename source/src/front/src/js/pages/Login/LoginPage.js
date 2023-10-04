import React from 'react';
import Login from "../../component/Login/Login";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/LoginHeader";

const LoginPage = () => {
    const memId = sessionStorage.getItem("memId");

    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'Login'}/>
            <Login memId={memId} />
        </div>
    );
};

export default LoginPage;