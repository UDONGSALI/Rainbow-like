import React from 'react';
import EduApplyList from "../../component/Edu/EduApplyList";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader";

function EduApplyCheckPage(props) {
    const { memId, type } = props;

    const { headerInfo, urlData } = type === 'admin' ?
        require('../../layout/Header/Data/AdminHeader') :
        require('../../layout/Header/Data/EduHeader');


    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData}/>
            <EduApplyList memId={memId}/>
        </div>
    );
}

export default EduApplyCheckPage;