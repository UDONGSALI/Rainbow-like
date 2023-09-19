import React from 'react';
import {useParams} from "react-router-dom";
import EduForm from "../../component/Edu/EduForm";
import ResizeAndUploadButton from "../../component/Common/ResizeAndUploadButton";
import EduApplyList from "../../component/Edu/EduApplyList";


function EduEditpage() {
    const { eduNum } = useParams();

    return (
        <>
            <EduApplyList/>
        </>
    )
};

export default EduEditpage;