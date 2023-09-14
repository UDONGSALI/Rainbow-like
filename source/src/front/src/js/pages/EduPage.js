// EduPage.js
import React, { useState } from 'react';
import EduList from "../compnent/EduList";
import EduDetail from "../compnent/EduDetail"; // 오타도 수정했습니다. EduDtail -> EduDetail

function EduPage() {
    const [selectedEduNum, setSelectedEduNum] = useState(null);
    const [showDetail, setShowDetail] = useState(false);

    const handleEduClick = (eduNum) => {
        setSelectedEduNum(eduNum);
        setShowDetail(true);
    };

    const handleBackClick = () => {
        setShowDetail(false);
    };

    return (
        <div>
            {showDetail ? (
                <EduDetail eduNum={selectedEduNum} onBackClick={handleBackClick} />
            ) : (
                <EduList onEduClick={handleEduClick} />
            )}
        </div>
    );
}

export default EduPage;
