import React, {useEffect, useState} from 'react';
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader";
import {useParams} from "react-router-dom";
import BoardPostList from "../../component/Board/BoardPostList";
import {SERVER_URL} from "../../component/Common/constants";

function BoardPostListPage() {
    const {boardNum} = useParams();
    const [boardName, setBoardName] = useState("");

    useEffect(() => {
        fetch(`${SERVER_URL}api/boards/${boardNum}`)
            .then(response => {
                if (!response.ok) throw new Error(response.statusText);
                return response.json();
            })
            .then(data => {
                setBoardName(data.boardName);  // 가정: API 응답에 'boardName' 필드가 있다고 함
            })
            .catch(error => {
                console.error('Error fetching board name:', error);
            });
    }, [boardNum]);



    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={boardName}/>
            <BoardPostList boardNum={boardNum}/>
        </div>
    );
}

export default BoardPostListPage;