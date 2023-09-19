import React from 'react';
import {useParams} from "react-router-dom";
import EduForm from "../../component/Edu/EduForm";
import ResizeAndUploadButton from "../../component/Common/ResizeAndUploadButton";


function EduEditpage() {
    const { eduNum } = useParams();

    return (
        <>
            <EduForm eduNum ={eduNum}/>
            <ResizeAndUploadButton />
        </>
    )
};

export default EduEditpage;