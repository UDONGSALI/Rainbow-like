import React from 'react';
import BackButton from "../../component/Common/BackButton";
import {useParams} from "react-router-dom";
import EduApply from "../../component/Edu/EduApply";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/EduHeader";

function EduApplyPage() {
    const {eduNum} = useParams();
    const memId = sessionStorage.getItem("memId");

    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={"교육 신청"}/>
            <EduApply eduNum={eduNum} memId={memId}/>
            <BackButton/>
        </div>
    );
}

export default EduApplyPage;