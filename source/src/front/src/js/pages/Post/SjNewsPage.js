import React, { useState, useEffect } from 'react';
import { SERVER_URL } from '../../component/Common/constants';
import ImgPostList from "../../component/Post/ImgPostList";
import Footer from "../../layout/Footer/footer";
import {useParams} from "react-router-dom";


function SjNewsPage() {
    const { boardNum } = useParams();
    const [posts, setPosts] = useState([]); // 게시글 목록을 저장할 상태

    let pageTitle ='세종시 기관 및 단체 소식';

    return (
        <div>
            <h2 style={{ textAlign: 'center',marginTop:'20px' ,marginBottom:'20px'}}>{pageTitle}</h2>
            {/* SjNewsList 컴포넌트에 가져온 게시글 목록을 전달 */}
            <ImgPostList boardNum={boardNum} posts={posts} />
        <Footer />
        </div>
    );
}

export default SjNewsPage;