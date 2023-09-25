import React, { useState } from 'react';
import EduList from "../../component/Edu/EduList";
import NavigationButton from "../../component/Common/NavigationButton";

function EduListPage() {
    const isAdmin = sessionStorage.getItem("role") === "ADMIN"; // 사용자가 ADMIN인지 확인


    return (
        <div >
            <EduList  />
            {isAdmin && <NavigationButton name="추가하기" url="/admin/edu/add" fontSize={"10px"} />}
        </div>
    );
}

export default EduListPage;
