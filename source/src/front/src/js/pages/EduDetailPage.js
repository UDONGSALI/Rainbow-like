import React, { useState } from 'react';
import EduDetail from "../compnent/EduDetail";
import BackButton from "../component/BackButton"; // 오타도 수정했습니다. EduDtail -> EduDetail

function EduDetailPage() {
    return (
        <div>
            <BackButton />
                <EduDetail />
        </div>
    );
}

export default EduDetailPage;
