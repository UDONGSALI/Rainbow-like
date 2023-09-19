import React from 'react';
import EduList from "../../component/Edu/EduList";
import NavigationButton from "../../component/Common/NavigationButton";

function EduManagePage() {
    return (
        <>
            <EduList/>
            <NavigationButton name="추가하기" url="/admin/edu/add" fontSize={"10px"}/>
        </>
    )
};

export default EduManagePage;