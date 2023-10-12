import React from 'react';
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader";
import PayList from "../../component/Pay/PayList";


function PayListPage() {

    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'결제 내역'}/>
            <PayList/>
        </div>
    );
}

export default PayListPage;
