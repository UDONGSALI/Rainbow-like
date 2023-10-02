import React from 'react';
import EduList from "../../component/Edu/EduList";
import NavigationButton from "../../component/Common/NavigationButton";
import UrlComponent from "../../layout/Header/UrlComponent";


function EduListPage({type}) {
    const isAdmin = sessionStorage.getItem("role") === "ADMIN"; // 사용자가 ADMIN인지 확인

    const {headerInfo, urlData} = type === 'admin' ?
        require('../../layout/Header/Data/AdminHeader') :
        require('../../layout/Header/Data/EduHeader');


    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData}/>
            <EduList/>
            {isAdmin && <NavigationButton name="추가하기" url="/admin/edu/add" fontSize={"10px"}/>}
        </div>
    );
}

export default EduListPage;
