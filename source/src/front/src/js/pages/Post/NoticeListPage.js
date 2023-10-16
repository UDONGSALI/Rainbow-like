import React from 'react';
import PostNoticeList from "../../component/Post/PostNoticeList";
import Footer from "../../layout/Footer/footer";
import { useParams } from 'react-router-dom';
import {headerInfo, urlData} from "../../layout/Header/Data/InfoShareHeader";
import UrlComponent from "../../layout/Header/UrlComponent";

function NoticeListPage() {
    const { boardNum } = useParams();

    let footerTitle = "";

    if (boardNum == "1") {
        footerTitle = "공지사항";
    } else if (boardNum == "2") {
        footerTitle = "언론보도";
    }

    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={footerTitle}/>
            <PostNoticeList boardNum={boardNum} />
            <Footer />
        </div>
    );
}

export default NoticeListPage;
