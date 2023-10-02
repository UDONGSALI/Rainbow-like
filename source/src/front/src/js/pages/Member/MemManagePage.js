import React from 'react';
import MemList from "../../component/Member/MemList";
import UrlComponent from "../../layout/Header/UrlComponent";
import { headerInfo, urlData } from '../../layout/Header/Data/AdminHeader';


function MemManagePage() {

        return(
            <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData}footerTitle={'회원 관리'}/>
            <MemList/>
            </div>
        )
};

export default MemManagePage;