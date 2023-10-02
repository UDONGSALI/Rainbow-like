import React from 'react';
import EduApplyList from "../../component/Edu/EduApplyList";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader";

function EduApplyCheckPage(props) {
    const { memId, type } = props;

    const { headerInfo, urlData } = type === 'admin' ?
        require('../../layout/Header/Data/AdminHeader') :
        require('../../layout/Header/Data/EduHeader');

    const footerTitle = type === 'admin' ? '교육 신청 관리': '교육 신청 내역'

    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={footerTitle}/>
            <EduApplyList memId={memId}/>
        </div>
    );
}

export default EduApplyCheckPage;