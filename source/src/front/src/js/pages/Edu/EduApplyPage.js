import React from 'react';
import BackButton from "../../component/Common/BackButton";
import {useParams} from "react-router-dom";
import EduApply from "../../component/Edu/EduApply";

function EduApplyPage() {
    const {eduNum} = useParams();
    const memId = sessionStorage.getItem("memId");

    return (
        <div>
            <BackButton/>
            <EduApply eduNum={eduNum} memId={memId}/>
        </div>
    );
}

export default EduApplyPage;