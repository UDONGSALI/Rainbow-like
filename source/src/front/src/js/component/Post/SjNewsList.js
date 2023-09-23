import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../Common/constants';
import styles from '../../../css/component/Post/SjNewList.module.css';
import Pagination from "../Common/Pagination"; // StyledReactJsPagination 컴포넌트를 import

function SjNewsList(props) {
    const { boardNum } = props;
    const [posts, setPosts] = useState([]);
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    useEffect(() => {
        fetch(`${SERVER_URL}posts?boardNum=${boardNum}`)
            .then(response => response.json())
            .then(data => {
                const filteredPosts = data.filter(post => post.board.boardNum === 3);
                setPosts(filteredPosts);
            })
            .catch(error => console.error(error));

        fetch(SERVER_URL + `files`)
            .then(response => response.json())
            .then(data => setFiles(data))
            .catch(error => console.error(error));
    }, [boardNum]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const onDelClick = (postNum) => {
        fetch(`${SERVER_URL}api/posts/${postNum}`, { method: 'DELETE' })
            .then(response => {
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
                                alt={`이미지 ${index + 1}`}
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
        </div>
    );
}

export default SjNewsList;
