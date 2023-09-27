import React, { useState } from 'react';
import PostDetail from "../../component/Post/PostDetail";
import { useParams } from 'react-router-dom'; // useParams를 import 합니다.

function PostDetailPage() {
    const { postNum,boardNum } = useParams(); // URL에서 필요한 값을 받아옵니다.

    let pageTitle;
    switch (boardNum) {
        case '1':
            pageTitle = '공지사항';
            break;
        case '2':
            pageTitle = '언론보도';
            break;
        case '3':
            pageTitle = '세종시 기관 및 단체 소식';
            break;
        case '4':
            pageTitle = '여플소식';
            break;
        case '5':
            pageTitle = '뉴스레터';
            break;
        case '7':
            pageTitle = '노무상담게시판';
            break;
        case '8':
            pageTitle = '온라인상담';
            break;
    }
    return (
        <div>
            <h2 style={{ textAlign: 'center',marginTop:'20px' ,marginBottom:'20px'}}>{pageTitle}</h2>
            <PostDetail postNum={ postNum } boardNum = {boardNum} /> {/* postNum을 PostDetail 컴포넌트로 전달합니다. */}
        </div>
    );
}

export default PostDetailPage;
