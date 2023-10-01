import React from 'react';
import EduForm from "../../component/Edu/EduForm";
import ResizeAndUploadButton from "../../component/Common/ResizeAndUploadButton";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader"; // 오타도 수정했습니다. EduDtail -> EduDetail

function EduDetailPage() {
    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} />
            <EduForm/>
            <ResizeAndUploadButton />
        </div>
    );
}

export default EduDetailPage;