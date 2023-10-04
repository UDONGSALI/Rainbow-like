import React from 'react';
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader";
import OrgList from "../../component/Organization/OrgList";

function OrgListPage() {

    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'유관 기관'}/>
            <OrgList/>
        </div>
    );
}

export default OrgListPage;
