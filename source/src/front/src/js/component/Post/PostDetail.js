import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { SERVER_URL } from '../Common/constants';
import styles from '../../../css/component/Post/PostDetail.module.css';
import useDeletePost from "../hook/useDeletePost";
import {findAllByRole} from "@testing-library/react";

function PostDetail(props) {
    const { postNum,boardNum } = props;
    const { deletePost } = useDeletePost();  // 삭제 훅
    const [post, setPost] = useState(null);
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const isAdmin = sessionStorage.getItem("role") === "ADMIN";
    const isLabor = sessionStorage.getItem("role") === "LABOR";
    const [memId, setMemId] = useState(sessionStorage.getItem('memId'));

    // 이전 글과 다음 글 상태 정보 저장
    const [nextPost, setNextPost] = useState(null);
    const [prevPost, setPrevPost] = useState(null);

    // 이전, 다음 버튼 활성화 여부
    const [isPrevActive, setIsPrevActive] = useState(false);
    const [isNextActive, setIsNextActive] = useState(false);

    console.log(sessionStorage.role)
    useEffect(() => {
        fetch(SERVER_URL + `files/postNum/${postNum}`)
            .then((response) => response.json())
            .then((data) => {
                setFiles(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        // 게시글 조회수 증가 API 호출
        fetch(`${SERVER_URL}post/${postNum}/increase-view`, {
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
        fetch(`${SERVER_URL}post/${postNum}`)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => console.error(error));
    }, [postNum]);

    useEffect(() => {

        // 초기화: nextPost와 prevPost 상태를 null로 설정
        setNextPost(null);
        setPrevPost(null);
        setIsLoading(true); // 데이터를 가져오기 시작할 때 로딩 상태로 설정합니다.

        Promise.all([
            fetch(`${SERVER_URL}post/${boardNum}/next/${postNum}`).then(res => {
                if (res.status === 404) return null;
                return res.json();
            }),
            fetch(`${SERVER_URL}post/${boardNum}/prev/${postNum}`).then(res => {
                if (res.status === 404) return null;
                return res.json();
            })
        ])
            .then(([nextData, prevData]) => {
                if (nextData) setNextPost(nextData);
                if (prevData) setPrevPost(prevData);
                setIsLoading(false); // 데이터를 가져온 후 로딩 상태를 해제합니다.
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false); // 오류가 발생한 경우에도 로딩 상태를 해제합니다.
            });
    }, [postNum, boardNum]);


    console.log(nextPost)
console.log(prevPost)
    useEffect(() => {
        setIsNextActive(nextPost !== null);
        setIsPrevActive(prevPost !== null);
    }, [nextPost, prevPost]);


    const onDelClick = () => {
        deletePost(postNum, files, post.board.boardNum, SERVER_URL);
    };

    const onEditClick = () => {
        navigate(`/post/edit/${postNum}`, { state: { mode: "edit" } });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

console.log(boardNum)
    return (
        <div className={styles.postDetail}> {/* CSS 모듈 적용 */}
            <div className={styles.titleDivider}></div>
            <h2 className={styles.title}>{post.title}</h2>
            <div className={styles.postMeta}>
                <p className={styles.postData}>
                    작성자: {post.member.memId}{' '}
                    작성일: {post.writeDate.slice(0, 10)}{' '}
                    조회수: {post.pageView}
                </p>
                <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.content }}>
                </div>
            </div>
            <div className={styles.postFileList}>
                <ul className={styles.postFileBox}>
                    <li className={styles.postFileLabel}>첨부파일</li>
                    <li className={styles.postFileDivider}></li>
                    <li className={styles.postFileNames}>
                        {files.map((file, index) => (
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
                {(isAdmin || post.member.memId === memId) && (
                    <>
                        <button onClick={onEditClick} className={styles.postEditButton}>수정</button>
                        <button onClick={onDelClick} className={styles.postDeleteButton}>삭제</button>
                    </>
                )}
                {isLabor && post.board.boardNum === 7 && post.member.memId !== memId && (
                    <button
                        onClick={() => {
                            navigate(`/csl/new/${postNum}`, { state: { mode: "reply", boardNum } });
                        }}
                        className={styles.postReplyButton}
                    >
                        답글
                    </button>
                )}
                <button onClick={() => {
                    if (post.board.boardNum <= 2) {
                        navigate(`/post/${post.board.boardNum}`);
                    } else if (post.board.boardNum >= 3 && post.board.boardNum <= 5) {
                        navigate(`/imgPost/${post.board.boardNum}`);
                    } else if (post.board.boardNum >= 7) {
                        navigate(`/csl/${post.board.boardNum}`);
                    }
                }} className={styles.postListButton}>
                    목록으로
                </button>
            </div>
            <div className={styles.prevNextButtons}>
                {!isLoading && isNextActive && (
                    boardNum != 7 && boardNum != 8 && (
                        <div className={styles.prevButton}>
                            ∧ 다음 글 -
                            <button
                                onClick={() => {
                                    navigate(`/post/detail/${boardNum}/${nextPost.postNum}`);
                                }}
                                className={styles.prevButtonStyle}
                            >
                                {nextPost.title}
                            </button>
                        </div>
                    )
                )}
                {!isLoading && isPrevActive && boardNum != 7 && boardNum != 8 && (
                    <div className={styles.nextButton}>
                        ∨ 이전 글 -
                        <button
                            onClick={() => {
                                navigate(`/post/detail/${boardNum}/${prevPost.postNum}`);
                            }}
                            className={styles.nextButtonStyle}
                        >
                            {prevPost.title}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostDetail;
