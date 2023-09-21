import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../Common/constants';
import styles from '../../../css/component/Post/SjNewList.module.css';

function SjNewsList(props) {
    const { boardNum } = props;
    const [posts, setPosts] = useState([]); // 게시글 목록을 저장할 상태
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // boardNum이 유효한 경우에만 게시글 목록을 가져오는 API 호출
            fetch(`${SERVER_URL}posts?boardNum=${boardNum}`)
                .then(response => response.json())
                .then(data => {
                    // boardNum이 3인 게시글만 필터링하여 저장
                    const filteredPosts = data.filter(post => post.board.boardNum === 3);
                    setPosts(filteredPosts);
                })
                .catch(error => console.error(error));

            // 파일 정보 가져오기
            fetch(SERVER_URL + `files`)
                .then(response => response.json())
                .then(data => setFiles(data))
                .catch(error => console.error(error));

    }, [boardNum]);

    const onDelClick = (postNum) => {
        // 게시글 삭제 API 호출
        fetch(`${SERVER_URL}api/posts/${postNum}`, { method: 'DELETE' })
            .then(response => {
                // 삭제 성공 시, 게시글 목록 다시 불러오기
                    fetch(`${SERVER_URL}posts?boardNum=${boardNum}`)
                        .then(response => response.json())
                        .then(data => setPosts(data))
                        .catch(error => console.error(error));

            })
            .catch(err => console.error(err));
    };

    const onEditClick = (postNum) => {
        navigate(`/posts/edit/${postNum}`);
    };

    return (
        <div>
            {posts.map(post => (
                <div className={styles.postDetail} key={post.postNum}>
                    <div className={styles.leftTop}>
                        {files
                            .filter(file => file.post && file.post.postNum === post.postNum)
                            .map((file, index) => (
                                <img
                                    key={index}
                                    src={file.fileUri}
                                    alt={`Image ${index + 1}`}
                                    className={styles.postImage}
                                />
                            ))}
                    </div>
                    <div className={styles.postInfo}>
                        <h2 className={styles.title}>{post.title}</h2>
                        <p className={styles.postData}>
                            작성일: {post.writeDate.slice(0, 10)}{' '}
                            조회수: {post.pageView}
                        </p>
                    </div>
                    <div className={styles.postButton}>
                        <button onClick={() => onEditClick(post.postNum)} className={styles.postEditButton}>수정</button>
                        <button onClick={() => onDelClick(post.postNum)} className={styles.postDeleteButton}>삭제</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SjNewsList;