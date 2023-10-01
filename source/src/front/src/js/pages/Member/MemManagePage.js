import React from 'react';
import MemList from "../../component/Member/MemList";
import UrlComponent from "../../layout/Header/UrlComponent";
import { headerInfo, urlData } from '../../layout/Header/Data/AdminHeader';


function MemManagePage() {

        return(
            <>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} />
            <MemList/>
            </>
        )
};

export default MemManagePage;