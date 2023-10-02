import React from 'react';
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader";
import BoardList from "../../component/Board/BoardList";

function BoardListPage() {
    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData}/>
            <BoardList/>
        </div>
    );
}

export default BoardListPage;