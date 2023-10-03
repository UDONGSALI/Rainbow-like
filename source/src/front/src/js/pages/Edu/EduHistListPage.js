import React from 'react';
import EduHistList from "../../component/Edu/EduHistList";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader";

function EduHistListPage(props) {
    const { memId, type } = props;

    const { headerInfo, urlData } = type === 'admin' ?
        require('../../layout/Header/Data/AdminHeader') :
        require('../../layout/Header/Data/EduHeader');

    const footerTitle = type === 'admin' ? '교육 신청 관리': '교육 신청 내역'

    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={footerTitle}/>
            <EduHistList memId={memId}/>
        </div>
    );
}

export default EduHistListPage;