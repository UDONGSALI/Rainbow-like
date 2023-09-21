import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../Common/constants';
import styles from './PostDetail.module.css'; // CSS 모듈 가져오기

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
            <div className={styles.fileList}>
                <ul className={styles.fileBox}>
                    <li className={styles.fileLabel}>첨부파일</li>
                    <li className={styles.fileDivider}></li>
                    <li className={styles.fileNames}>
                        {filteredFiles.map((file, index) => (
                            <a
                                key={index}
                                className={styles.fileName}
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
                <button onClick={() => navigate("/posts")} className={styles.postListButton}>목록으로</button>
            </div>
            <div className={styles.prevNextButtons}>
                {prevPostNum >= 9 && (
                    <div className={styles.prevButton}>
                        &nbsp;&nbsp;∧ 이전 글 -&nbsp;
                        <button
                            onClick={() => navigate(`/notice/detail/${prevPostNum}`)}
                            className={styles.prevButtonStyle}
                        >
                            {prevPostTitle}
                        </button>
                    </div>
                )}
                {nextPostNum <= 13 && (
                    <div className={styles.nextButton}>
                        &nbsp;&nbsp;∨ 다음 글 -&nbsp;
                        <button
                            onClick={() => navigate(`/notice/detail/${nextPostNum}`)}
                            className={styles.nextButtonStyle}
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
