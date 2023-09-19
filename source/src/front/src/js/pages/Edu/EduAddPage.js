import React from 'react';
import EduForm from "../../component/Edu/EduForm";
import ResizeAndUploadButton from "../../component/Common/ResizeAndUploadButton"; // 오타도 수정했습니다. EduDtail -> EduDetail

function EduDetailPage() {
    return (
        <div>
            <EduForm/>
            <ResizeAndUploadButton />
        </div>
    );
}

export default EduDetailPage;
