import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../Common/constants';
import styles from '../../../css/component/Post/SjNewList.module.css';
<<<<<<< HEAD
import Pagination from "../Common/Pagination"; // StyledReactJsPagination 컴포넌트를 import
=======
import ActionBtn from "../ActionBtn";
>>>>>>> e36907b47623abf4bceba347f46cdefafa050d63

function SjNewsList(props) {
    const { boardNum } = props;
    const [posts, setPosts] = useState([]);
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
<<<<<<< HEAD
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    useEffect(() => {
        fetch(`${SERVER_URL}posts?boardNum=${boardNum}`)
            .then(response => response.json())
            .then(data => {
=======
    const [currentPage, setCurrentPage] = useState(1); // 페이징
    const postsPerPage = 6; // 게시글 개수

    useEffect(() => {
        // boardNum이 유효한 경우에만 게시글 목록을 가져오는 API 호출
        fetch(`${SERVER_URL}posts?boardNum=${boardNum}`)
            .then(response => response.json())
            .then(data => {
                // boardNum이 3인 게시글만 필터링하여 저장
>>>>>>> e36907b47623abf4bceba347f46cdefafa050d63
                const filteredPosts = data.filter(post => post.board.boardNum === 3);
                setPosts(filteredPosts);
            })
            .catch(error => console.error(error));

<<<<<<< HEAD
=======
        // 파일 정보 가져오기
>>>>>>> e36907b47623abf4bceba347f46cdefafa050d63
        fetch(SERVER_URL + `files`)
            .then(response => response.json())
            .then(data => setFiles(data))
            .catch(error => console.error(error));
    }, [boardNum]);

<<<<<<< HEAD
=======
    // 현재 페이지에 따라 게시글 목록 필터링
>>>>>>> e36907b47623abf4bceba347f46cdefafa050d63
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

<<<<<<< HEAD
=======
    // 페이지 변경 시 호출할 함수
>>>>>>> e36907b47623abf4bceba347f46cdefafa050d63
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const onDelClick = (postNum) => {
        fetch(`${SERVER_URL}api/posts/${postNum}`, { method: 'DELETE' })
            .then(response => {
<<<<<<< HEAD
=======
                // 삭제 성공 시, 게시글 목록 다시 불러오기
>>>>>>> e36907b47623abf4bceba347f46cdefafa050d63
                fetch(`${SERVER_URL}posts?boardNum=${boardNum}`)
                    .then(response => response.json())
                    .then(data => setPosts(data))
                    .catch(error => console.error(error));
<<<<<<< HEAD
=======

>>>>>>> e36907b47623abf4bceba347f46cdefafa050d63
            })
            .catch(err => console.error(err));
    };

    const onEditClick = (postNum) => {
        navigate(`/posts/edit/${postNum}`);
    };

<<<<<<< HEAD
=======
    // 각 게시물당 하나의 이미지만 가져오기
>>>>>>> e36907b47623abf4bceba347f46cdefafa050d63
    const getPostImage = (postNum) => {
        const matchingFile = files.find(file => file.post && file.post.postNum === postNum);
        return matchingFile ? matchingFile.fileUri : '';
    };

    return (
        <div>
            <div className={styles.sjNewsListContainer}>
                {currentPosts.map((post, index) => (
                    <div className={styles.postDetail} key={post.postNum}>
                        <div className={styles.leftTop}>
                            <img
                                src={getPostImage(post.postNum)}
<<<<<<< HEAD
                                alt={`이미지 ${index + 1}`}
=======
                                alt={`Image 1`}
>>>>>>> e36907b47623abf4bceba347f46cdefafa050d63
                                className={styles.postImage}
                            />
                        </div>
                        <div className={styles.postInfo}>
                            <h2 className={styles.title}>{post.title}</h2>
                            <p className={styles.postData}>
                                작성일: {post.writeDate.slice(0, 10)} 조회수: {post.pageView}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
<<<<<<< HEAD
            {/* StyledReactJsPagination 컴포넌트를 사용 */}
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={postsPerPage}
                totalItemsCount={posts.length}
                pageRangeDisplayed={5}
                onChange={paginate}
                prevPageText="<"
                nextPageText=">"
            />
            {posts[0] && (
                <div className={styles.postButton}>
                    <button onClick={() => onEditClick(posts[0].postNum)} className={styles.postEditButton}>
                        수정
                    </button>
                    <button onClick={() => onDelClick(posts[0].postNum)} className={styles.postDeleteButton}>
                        삭제
                    </button>
                </div>
            )}
=======
            {/* 페이징 목록 추가 */}
            <div className={styles.pagination}>
                {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
            {/* 수정 및 삭제 버튼*/}
            <ActionBtn
                onEditClick={() => onEditClick(currentPosts[0].postNum)}
                onDeleteClick={() => onDelClick(currentPosts[0].postNum)}
            />
>>>>>>> e36907b47623abf4bceba347f46cdefafa050d63
        </div>
    );
}

export default SjNewsList;
