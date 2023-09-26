import React from 'react';
import PostNoticeList from "../../component/Post/PostNoticeList";
import Footer from "../../layout/Footer/footer";
import { useParams } from 'react-router-dom';

function NoticeListPage() {
    const { boardNum } = useParams();

    let pageTitle;
    switch (boardNum) {
        case '1':
            pageTitle = '공지사항';
            break;
        case '2':
            pageTitle = '언론보도';
            break;
    }

    return (
        <div>
            <h2 style={{ textAlign: 'center',marginTop:'20px' ,marginBottom:'20px'}}>{pageTitle}</h2>
            <PostNoticeList boardNum={boardNum} />
            <Footer />
        </div>
    );
}

export default NoticeListPage;
