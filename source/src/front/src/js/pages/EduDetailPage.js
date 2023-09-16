import React, { useState } from 'react';
import EduDetail from "../component/Edu/EduDetail";
import BackButton from "../component/Common/BackButton"; // 오타도 수정했습니다. EduDtail -> EduDetail

function EduDetailPage() {
    return (
        <div>
            <BackButton />
                <EduDetail />
        </div>
    );
}

export default EduDetailPage;
