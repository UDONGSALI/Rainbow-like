import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../Common/constants';
import styles from '../../../css/component/Post/PostDetail.module.css';

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
            .then(data => setPrevPostTitle(data.post))
            .catch(error => console.error(error));

        // 다음 글의 제목 가져오기
        fetch(`${SERVER_URL}posts/${nextPostNum}`)
            .then(response => response.json())
            .then(data => setNextPostTitle(data.post))
            .catch(error => console.error(error));

    }, [postNum, prevPostNum, nextPostNum]);


    const onEditClick = () => {
        navigate(`/posts/edit/${postNum}`);
    };

    if (!post) {
        return <div>Loading...</div>;
    }
//이전 글과 다음 글 게시판이 같다면 이동
    const canGoToPrevPost = prevPostTitle && prevPostTitle.board.boardNum === post.board.boardNum;
    const canGoToNextPost = nextPostTitle && nextPostTitle.board.boardNum === post.board.boardNum;

    return (
        <div className={styles.postDetail}> {/* CSS 모듈 적용 */}
            <div className={styles.titleDivider}></div>
            <h2 className={styles.title}>{post.post.title}</h2>
            <div className={styles.postMeta}>
                <p className={styles.postData}>
                    작성자: {post.member.name}{' '}
                    작성일: {post.post.writeDate.slice(0, 10)}{' '}
                    조회수: {post.post.pageView}
                </p>
                <div className={styles.postMenuTitle}> - 공지사항 입니다.</div>
                <div className={styles.leftTop}>
                    {filteredFiles.map((file, index) => (
                        <img
                            key={index}
                            src={file.fileUri}
                            alt={`Image ${index + 1}`}
                            className={styles.postImage}
                        />
                    ))}
                </div>

                <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.post.content }}></div>
            </div>
            <div className={styles.postFileList}>
                <ul className={styles.postFileBox}>
                    <li className={styles.postFileLabel}>첨부파일</li>
                    <li className={styles.postFileDivider}></li>
                    <li className={styles.postFileNames}>
                        {filteredFiles.map((file, index) => (
                            <a
                                key={index}
                                className={styles.postFileName}
                                href={file.fileUri}
                                download
                            >
                                {file.fileOriName}
                            </a>
                        ))}
                    </li>
                </ul>
            </div>
            <div className={styles.postButton}>
                <button onClick={onEditClick} className={styles.postEditButton}>수정</button>
                <button onClick={onDelClick} className={styles.postDeleteButton}>삭제</button>
                <button onClick={() => {
                    if (post.board.boardNum <= 2) {
                        navigate(`/post/${post.boardNum}`);
                    } else if (post.board.boardNum >= 3) {
                        navigate(`/imgPost/${post.boardNum}`);
                    }
                }} className={styles.postListButton}>
                    목록으로
                </button>
            </div>
            <div className={styles.prevNextButtons}>
                {canGoToPrevPost && (
                    <div className={styles.prevButton}>
                        &nbsp;&nbsp;∧ 이전 글 -&nbsp;
                        <button
                            onClick={() => {
                                navigate(`/post/detail/${prevPostNum}`);
                            }}
                            className={styles.prevButtonStyle}
                        >
                            {prevPostTitle.title}
                        </button>
                    </div>
                )}
                {canGoToNextPost && (
                    <div className={styles.nextButton}>
                        &nbsp;&nbsp;∨ 다음 글 -&nbsp;
                        <button
                            onClick={() => {
                                navigate(`/post/detail/${nextPostNum}`);
                            }}
                            className={styles.nextButtonStyle}
                        >
                            {nextPostTitle.title}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostDetail;
