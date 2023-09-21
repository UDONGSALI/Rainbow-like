import React, { useState, useEffect } from 'react';
import SjNewsList from "../../component/Post/SjNewsList";
import { SERVER_URL } from '../../component/Common/constants';

const BoardNum = 3;

function SjNewsPage() {
    const [posts, setPosts] = useState([]); // 게시글 목록을 저장할 상태

    useEffect(() => {
        // boardNum이 3인 게시글 목록을 가져오는 API 호출
        fetch(`${SERVER_URL}posts?boardNum=${BoardNum}`)
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            {/* SjNewsList 컴포넌트에 가져온 게시글 목록을 전달 */}
            <SjNewsList boardNum={BoardNum} posts={posts} />
        </div>
    );
}

export default SjNewsPage;