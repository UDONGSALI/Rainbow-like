import React from 'react';
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader";
import RentHistList from "../../component/Rent/RentHistList";


function RentHistListPage(props) {
    const {memId, type} = props;

    const footerTitle = type === 'admin' ? '대관 신청 관리' : '대관 신청 내역'


    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={footerTitle}/>
            <RentHistList memId={memId}/>
        </div>
    );
}

export default RentHistListPage;
