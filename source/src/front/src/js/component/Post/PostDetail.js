import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../Common/constants';
import '../../../css/component/Post/PostDetail.css';

function PostDetail(props) {
    const { postNum } = props;
    const [post, setPost] = useState(null);
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [prevPostTitle, setPrevPostTitle] = useState(null);
    const [nextPostTitle, setNextPostTitle] = useState(null);
    const navigate = useNavigate();

    // 이전 글과 다음 글의 postNum 계산
    const prevPostNum = parseInt(postNum) - 1;
    const nextPostNum = parseInt(postNum) + 1;

    useEffect(() => {
        fetch(SERVER_URL + `files`)
            .then((response) => response.json())
            .then((data) => {
                setFiles(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const filteredFiles = useMemo(
        () => files.filter(file => file.post && file.post.postNum == postNum),
        [files, postNum]
    );

    useEffect(() => {
        // 게시글 조회수 증가 API 호출
        fetch(`${SERVER_URL}posts/${postNum}/increase-view`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    // throw an Error("Network response was not ok");
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        // 게시글 정보를 가져와서 post 상태를 업데이트합니다.
        fetch(`${SERVER_URL}posts/${postNum}`)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => console.error(error));
    }, [postNum]);

    const onDelClick = () => {
        // 게시글 삭제 API 호출
        fetch(`${SERVER_URL}api/posts/${postNum}`, { method: 'DELETE' })
            .then(response => {
                setOpen(true);
            })
            .catch(err => console.error(err));

        navigate('/posts');
    };

    useEffect(() => {
        // 이전 글의 제목 가져오기
        fetch(`${SERVER_URL}posts/${prevPostNum}`)
            .then(response => response.json())
            .then(data => setPrevPostTitle(data.post.title))
            .catch(error => console.error(error));

        // 다음 글의 제목 가져오기
        fetch(`${SERVER_URL}posts/${nextPostNum}`)
            .then(response => response.json())
            .then(data => setNextPostTitle(data.post.title))
            .catch(error => console.error(error));

    }, [postNum, prevPostNum, nextPostNum]);


    const onEditClick = () => {
        navigate(`/posts/edit/${postNum}`);
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="post-detail">
            <div className="title-divider"></div>
            <h2 className="title">{post.post.title}</h2>
            <div className="post-meta">
                <p className="post_data">
                    작성자: {post.member.name}{' '}
                    작성일: {post.post.writeDate.slice(0, 10)}{' '}
                    조회수: {post.post.pageView}
                </p>
                <div className='post_menu_title'> - 공지사항 입니다.</div>
                <div className="left-top">
                    {filteredFiles.map((file, index) => (
                        <img
                            key={index}
                            src={file.fileUri}
                            alt={`Image ${index + 1}`}
                            className="post-image"
                        />
                    ))}
                </div>

                <div className="post-content" dangerouslySetInnerHTML={{ __html: post.post.content }}></div>
            </div>
            <div className="file-list">
                <ul className="file-box">
                    <li className="file-label">첨부파일</li>
                    <li className="file-divider"></li>
                    <li className="file-names">
                        {filteredFiles.map((file, index) => (
                            <a
                                key={index}
                                className="file-name"
                                href={file.fileUri}
                                download
                            >
                                {file.fileOriName}
                            </a>
                        ))}
                    </li>
                </ul>
            </div>
            <div className="post-button">
                <button onClick={onEditClick} className="post-edit-button">수정</button>
                <button onClick={onDelClick} className="post-delete-button">삭제</button>
                <button onClick={() => navigate("/posts")} className="post-list-button">목록으로</button>
            </div>
            <div className="prev-next-buttons">
                {prevPostNum >= 9 && (
                    <div className="prev-button">
                        &nbsp;&nbsp;∧ 이전 글 -&nbsp;
                        <button
                            onClick={() => navigate(`/notice/detail/${prevPostNum}`)}
                            className="prev-button-style"
                        >
                            {prevPostTitle}
                        </button>
                    </div>
                )}
                {nextPostNum <= 13 && (
                    <div className="next-button">
                        &nbsp;&nbsp;∨ 다음 글 -&nbsp;
                        <button
                            onClick={() => navigate(`/notice/detail/${nextPostNum}`)}
                            className="next-button-style"
                        >
                            {nextPostTitle}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
export default PostDetail;
