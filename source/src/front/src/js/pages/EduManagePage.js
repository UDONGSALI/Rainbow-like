import React from 'react';
import EduList from "../component/Edu/EduList";
import NavigationButton from "../component/Common/NavigationButton";

const MemManagePage = () => {
    return (
        <>
            <EduList/>
            <NavigationButton name="추가하기" url="/admin/edu/add" fontSize={"10px"}/>
        </>
    )
};

export default MemManagePage;