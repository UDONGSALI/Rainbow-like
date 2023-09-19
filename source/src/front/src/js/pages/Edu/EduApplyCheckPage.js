import React, {useEffect, useState} from 'react';
import BackButton from "../../component/Common/BackButton";
import EduApplyList from "../../component/Edu/EduApplyList";

function EduApplyCheckPage(props) {
    const {memId} = props;


    return (
        <div>
            <BackButton />
            <EduApplyList memId = {memId} />
        </div>
    );
}

export default EduApplyCheckPage;