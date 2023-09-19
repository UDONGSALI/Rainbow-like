import React, {useEffect, useState} from 'react';
import EduDetail from "../../component/Edu/EduDetail";
import BackButton from "../../component/Common/BackButton";
import {useParams} from "react-router-dom";
import EduApply from "../../component/Edu/EduApply";

function EduApplyPage() {
    const { eduNum } = useParams();
    const [memId, setMemId] = useState(null); // memId 상태 설정
    useEffect(() => {
        // sessionStorage에서 username을 가져와 memId 상태에 설정
        const memId = sessionStorage.getItem("memId");
        setMemId(memId);
    }, []);

    return (
        <div>
            <BackButton />
                <EduApply eduNum={eduNum} memId = {memId} />
        </div>
    );
}

export default EduApplyPage;