import React from 'react';
import EduForm from "../../component/Edu/EduForm";
import ResizeAndUploadButton from "../../component/Common/ResizeAndUploadButton";
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader"; // 오타도 수정했습니다. EduDtail -> EduDetail

function EduDetailPage() {
    return (
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'교육 등록'}/>
            <EduForm/>
            <ResizeAndUploadButton/>
        </div>
    );
}

export default EduDetailPage;