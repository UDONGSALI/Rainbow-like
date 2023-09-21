import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../Common/constants';
import File from '../../../img/component/file.png';

function SjNewsList(props) {
    const { boardNum } = props;
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, [boardNum]);

    const fetchPosts = () => {
        fetch(SERVER_URL + 'post/' + boardNum)
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
            })
            .catch((err) => console.error(err));
    };

    const onDelClick = (postNum) => {
        fetch(SERVER_URL + 'post/' + postNum, { method: 'DELETE' })
            .then((response) => {
                setOpen(true);
                fetchPosts(); // 게시글 삭제 후 목록 다시 불러오기
            })
            .catch((err) => console.error(err));
    };

    const onEditClick = (postNum) => {
        navigate(`/posts/edit/${postNum}`);
    };

    const onRowClick = (postNum) => {
        navigate(`/notice/detail/${postNum}`);
    };

    return (
        <div className="thumbnail-posts-container">
            {posts.map((post) => (
                <div key={post.postNum} className="thumbnail-post">
                    <div className="thumbnail-title" onClick={() => onRowClick(post.postNum)}>
                        {post.title}
                    </div>
                    <div className="thumbnail-info">
                        작성자: {post.member.name} | 조회수: {post.pageView}
                    </div>
                    {post.postsFiles && post.postsFiles.length > 0 && (
                        <div className="thumbnail-file">
                            <img src={File} alt="File" />
                        </div>
                    )}
                    <div className="thumbnail-actions">
                        <button onClick={() => onEditClick(post.postNum)}>수정</button>
                        <button onClick={() => onDelClick(post.postNum)}>삭제</button>
                    </div>
                </div>
            ))}
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message="게시글을 지웠습니다."
            />
            <button onClick={() => navigate('/clubs/new')}>새 게시글 작성</button>
        </div>
    );
}

export default SjNewsList;
