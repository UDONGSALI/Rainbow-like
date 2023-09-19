import React, {useEffect, useState} from 'react';
import BackButton from "../../component/Common/BackButton";
import EduApply from "../../component/Edu/EduApply";

function EduApplyCheckPage() {
    const [memId, setMemId] = useState(null); // memId 상태 설정
    useEffect(() => {
        // sessionStorage에서 username을 가져와 memId 상태에 설정
        const memId = sessionStorage.getItem("memId");
        setMemId(memId);
    }, []);

    return (
        <div>
            <BackButton />
            <EduApply memId = {memId} />
        </div>
    );
}

export default EduApplyCheckPage;