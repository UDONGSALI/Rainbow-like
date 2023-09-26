import React, { useState } from 'react';
import PostNoticeList from "../../component/Post/PostNoticeList";
import Footer from "../../layout/Footer/footer";





const BoardNum = 1;
function NoticeListPage() {

    return (
        <div>
            <h2 style={{ textAlign: 'center',marginTop:'20px' ,marginBottom:'20px'}}>공지사항</h2>
            <PostNoticeList boardNum={BoardNum} />
            <Footer />
        </div>
    );
}

export default NoticeListPage;
