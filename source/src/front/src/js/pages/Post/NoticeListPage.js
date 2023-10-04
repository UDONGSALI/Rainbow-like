import React from 'react';
import PostNoticeList from "../../component/Post/PostNoticeList";
import Footer from "../../layout/Footer/footer";
import { useParams } from 'react-router-dom';

function NoticeListPage() {
    const { boardNum } = useParams();

    let pageTitle = '공지사항';

    return (
        <div>
            <h2 style={{ textAlign: 'center',marginTop:'20px' ,marginBottom:'20px'}}>{pageTitle}</h2>
            <PostNoticeList boardNum={boardNum} />
            <Footer />
        </div>
    );
}

export default NoticeListPage;
