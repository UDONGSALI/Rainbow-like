import React from 'react';
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader";
import {useParams} from "react-router-dom";
import BoardPostList from "../../component/Board/BoardPostList";

function BoardPostListPage() {
    const {boardNum} = useParams();


    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData}/>
            <BoardPostList boardNum={boardNum}/>
        </div>
    );
}

export default BoardPostListPage;