import React from 'react';
import {useParams} from "react-router-dom";
import EduForm from "../../component/Edu/EduForm";
import ResizeAndUploadButton from "../../component/Common/ResizeAndUploadButton";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader";


function EduEditpage() {
    const { eduNum } = useParams();

    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'교육 수정'} />
            <EduForm eduNum ={eduNum}/>
            <ResizeAndUploadButton />
        </div>
    )
};

export default EduEditpage;