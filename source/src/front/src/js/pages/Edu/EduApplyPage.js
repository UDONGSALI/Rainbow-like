import React from 'react';
import BackButton from "../../component/Common/BackButton";
import {useParams} from "react-router-dom";
import EduApply from "../../component/Edu/EduApply";

function EduApplyPage(props) {
    const {eduNum} = useParams();
    const {memId} = props;

    return (
        <div>
            <BackButton/>
            <EduApply eduNum={eduNum} memId={memId}/>
        </div>
    );
}

export default EduApplyPage;