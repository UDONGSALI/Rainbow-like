import React from 'react';
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader";
import LogList from "../../component/Log/LogList";


function LogListPage() {

    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'로그'}/>
            <LogList/>
        </div>
    );
}

export default LogListPage;