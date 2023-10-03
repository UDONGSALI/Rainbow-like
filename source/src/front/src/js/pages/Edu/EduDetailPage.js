import React from 'react';
import EduDetail from "../../component/Edu/EduDetail";
import BackButton from "../../component/Common/BackButton";
import {useParams} from "react-router-dom";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/EduHeader"; // 오타도 수정했습니다. EduDtail -> EduDetail

function EduDetailPage() {
    const {eduNum} = useParams();

    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'교육 신청'}/>
            <EduDetail eduNum={eduNum}/>
            <BackButton/>
        </div>
    );
}

export default EduDetailPage;
