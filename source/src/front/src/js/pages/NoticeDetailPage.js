import React, { useState } from 'react';
import PostDetail from "../component/Post/PostDetail";
import { useParams } from 'react-router-dom'; // useParams를 import 합니다.

function NoticeDetailPage() {
    const { postNum } = useParams(); // URL에서 필요한 값을 받아옵니다.

    return (
        <div>
            <h2 style={{ textAlign: 'center',marginTop:'20px' ,marginBottom:'20px'}}>공지사항</h2>
            <PostDetail postNum={ postNum } /> {/* postNum을 PostDetail 컴포넌트로 전달합니다. */}
        </div>
    );
}

export default NoticeDetailPage;
