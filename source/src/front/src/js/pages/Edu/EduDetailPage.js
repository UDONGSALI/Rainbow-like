import React from 'react';
import EduDetail from "../../component/Edu/EduDetail";
import BackButton from "../../component/Common/BackButton";
import {useParams} from "react-router-dom"; // 오타도 수정했습니다. EduDtail -> EduDetail

function EduDetailPage() {
    const {eduNum} = useParams();

    return (
        <div>
            <BackButton/>
            <EduDetail eduNum={eduNum}/>
        </div>
    );
}

export default EduDetailPage;
