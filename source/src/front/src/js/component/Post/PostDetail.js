import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { SERVER_URL } from '../Common/constants';
import styles from '../../../css/component/Post/PostDetail.module.css';

function PostDetail(props) {
    const {postNum, boardNum} = props;
    const [post, setPost] = useState(null);
    const [files, setFiles] = useState([]);
    const [prevPostTitle, setPrevPostTitle] = useState(null);
    const [nextPostTitle, setNextPostTitle] = useState(null);
    const [lastPostNum, setLastPostNum] = useState(null);
    const navigate = useNavigate();
    // 이전 글과 다음 글의 postNum 계산
    const prevPostNum = parseInt(postNum) - 1;
    const nextPostNum = parseInt(postNum) + 1;

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

    useEffect(() => {
        // 마지막 postNum 가져오기.
        fetch(`${SERVER_URL}post/lastPostNum`)
            .then(response => response.json())
            .then(data => {
                setLastPostNum(data);
            })
            .catch(error => console.error(error));
    }, []);

        useEffect(() => {
            // post 상태가 있고, post.board.boardNum이 7보다 작을 때만 이전 글의 제목을 가져옴
            if (post && post.board.boardNum < 7) {
                // 이전 글의 제목 가져오기
                fetch(`${SERVER_URL}posts/${prevPostNum}`)
                    .then(response => response.json())
                    .then(data => setPrevPostTitle(data.post))
                    .catch(error => console.error(error));
            }

            // 현재 postNum이 마지막 글이 아니고, boardNum이 7보다 작을 때만 다음 글의 제목 가져오기
            if (postNum < lastPostNum && post && post.board.boardNum < 7) {
                fetch(`${SERVER_URL}posts/${nextPostNum}`)
                    .then(response => response.json())
                    .then(data => setNextPostTitle(data.post))
                    .catch(error => console.error(error));
            }
        }, [prevPostNum, lastPostNum, post]); // post도 의존성 배열에 추가했습니다.
    const onDelClick = () => {
        const isConfirmed = window.confirm("정말로 이 게시글을 삭제하시겠습니까?");
        if (isConfirmed) {
            console.log("Filtered Files:", files);  // filteredFiles 내용 확인

            if (!files.length) {
                alert("삭제할 파일이 없습니다."); // 삭제할 파일이 없을 경우 알림
                return;
            }

            // 1. 먼저 연결된 파일들을 서버에서 삭제
            Promise.all(
                files.map(file => {
                    const fileDeleteUrl = `${SERVER_URL}files/${file.id}`;
                    console.log("Deleting file from URL:", fileDeleteUrl);

                    return fetch(fileDeleteUrl, {method: 'DELETE'});
                })
            )
                .then(responses => {
                    // 모든 파일이 성공적으로 삭제되었는지 확인
                    if (responses.every(response => response.ok)) {
                        // 2. 게시글 삭제
                        return fetch(`${SERVER_URL}api/posts/${postNum}`, {method: 'DELETE'});
                    } else {
                        throw new Error('Failed to delete some files');
                    }
                })
                .then(response => {
                    if (response.ok) {
                        // boardNum에 따른 이동 경로 설정
                        if (post.board.boardNum <= 2) {
                            navigate(`/post/${post.board.boardNum}`);
                        } else if (post.board.boardNum >= 3 && post.board.boardNum <= 5) {
                            navigate(`/imgPost/${post.board.boardNum}`);
                        } else if (post.board.boardNum >= 7) {
                            navigate(`/csl/${post.board.boardNum}`);
                        } else {
                            navigate('/posts');
                        }
                    } else {
                        alert("게시글 삭제에 실패하였습니다.");
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert("오류가 발생했습니다. 다시 시도해주세요.");
                });
        }
        const onEditClick = () => {
            navigate(`/posts/edit/${postNum}`);
        };

        if (!post) {
            return <div>Loading...</div>;
        }

        const isLastPost = postNum == lastPostNum;
//이전 글과 다음 글 게시판이 같다면 이동
        const canGoToPrevPost = prevPostTitle && prevPostTitle.board.boardNum == post.board.boardNum;
        const canGoToNextPost = nextPostTitle && nextPostTitle.board.boardNum == post.board.boardNum && !isLastPost;
// 기존 코드에서 boardNum이 7보다 크거나 같은지 확인하는 변수
        const hidePrevNextButtons = post.board.boardNum > 7 && (!canGoToPrevPost || !canGoToNextPost);

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
                    {/*<div className={styles.leftTop}>*/}
                    {/*    {files.map((file, index) => (*/}
                    {/*        <img*/}
                    {/*            key={index}*/}
                    {/*            src={file.fileUri}*/}
                    {/*            alt={`Image ${index + 1}`}*/}
                    {/*            className={styles.postImage}*/}
                    {/*        />*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                    <div className={styles.postContent} dangerouslySetInnerHTML={{__html: post.post.content}}>
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
                    <button onClick={onEditClick} className={styles.postEditButton}>수정</button>
                    <button onClick={onDelClick} className={styles.postDeleteButton}>삭제</button>
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
                    {!hidePrevNextButtons && canGoToNextPost && (
                        <div className={styles.prevButton}>
                            &nbsp;&nbsp;∧ 다음 글 -&nbsp;
                            <button
                                onClick={() => {
                                    navigate(`/post/detail/${boardNum}/${nextPostNum}`);
                                }}
                                className={styles.prevButtonStyle}
                            >
                                {nextPostTitle.title}
                            </button>
                        </div>
                    )}
                    {!hidePrevNextButtons && canGoToPrevPost && (
                        <div className={styles.nextButton}>
                            &nbsp;&nbsp;∨ 이전 글 -&nbsp;
                            <button
                                onClick={() => {
                                    navigate(`/post/detail/${boardNum}/${prevPostNum}`);
                                }}
                                className={styles.nextButtonStyle}
                            >
                                {prevPostTitle.title}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default PostDetail;
