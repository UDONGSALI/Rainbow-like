import React, { useState, useEffect } from 'react';
import { SERVER_URL } from '../../component/Common/constants';
import ImgPostList from "../../component/Post/ImgPostList";

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
            <h2 style={{ textAlign: 'center',marginTop:'20px' ,marginBottom:'20px'}}>세종시 기관 및 단체 소식</h2>
            {/* SjNewsList 컴포넌트에 가져온 게시글 목록을 전달 */}
            <ImgPostList boardNum={BoardNum} posts={posts} />
        </div>
    );
}

export default SjNewsPage;