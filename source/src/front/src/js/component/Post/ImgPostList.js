import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { SERVER_URL } from '../Common/constants';
import styles from '../../../css/component/Post/imgPostList.module.css';
import Pagination from "../Common/Pagination";

function ImgPostList(props) {
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

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className={styles.sjNewsListContainer}>
                {currentPosts.map((post, index) => (
                    // Link 컴포넌트로 게시글을 감싸고, 스타일을 직접 지정
                    <Link to={`/post/detail/${post.postNum}`} key={post.postNum} className={styles.customLink}>
                        <div className={styles.postDetail}>
                            <div className={styles.leftTop}>
                                <img
                                    src={getPostImage(post.postNum)}
                                    alt={`Image ${index + 1}`}
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
                    </Link>
                ))}
            </div>
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
                    <button to={`/posts/edit/${posts[0].postNum}`} className={styles.postEditButton}>
                        수정
                    </button>
                    <button onClick={() => onDelClick(posts[0].postNum)}
                            className={styles.postDeleteButton}>
                        삭제
                    </button>
                </div>
            )}
        </div>
    );
}

export default ImgPostList;
