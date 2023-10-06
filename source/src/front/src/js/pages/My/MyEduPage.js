import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/MyHeader";
import React from 'react';

import EduHistList from "../../component/Edu/EduHistList";

const MyEduPage = (props) => {
    const { memId, type } = props;
    const footerTitle = type === 'admin' ? '교육 신청 관리': '교육 신청 내역'

    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={footerTitle}/>
            <EduHistList memId={memId}/>
        </div>
    );
}

export default MyEduPage;
