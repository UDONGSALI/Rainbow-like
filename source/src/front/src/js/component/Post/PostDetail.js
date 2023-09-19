import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../Common/constants';
import '../../../css/component/Post/PostDetail.css';


function PostDetail(props) {
    const { postNum } = props;
    const [post, setPost] = useState(null);
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    console.log(post)
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
                    throw new Error('Network response was not ok');
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

    const onEditClick = () => {
        navigate(`/posts/edit/${postNum}`);
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    const downloadFile = (fileUri, fileOriName) => {
        //첨부파일 클릭 시 다운로드
        const link = document.createElement('a');
        link.href = fileUri;
        link.download = fileOriName; // 다운로드될 파일 이름 설정
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="post-detail">
            <div className="title-divider"></div> {/* 검정색 굵은 가로선 */}
            <h3 className="title">{post.post.title}</h3>
            <div className="post-meta">
                <p className="post_data">
                    작성자: {post.member.name}{' '}
                    작성일: {post.post.writeDate.slice(0, 10)} {/* 작성일을 날짜까지만 표시 */}
                    조회수: {post.post.pageView}
                </p>
                <div className='post_menu_title'> - 공지사항 입니다.</div>
                <div className="left-top">
                    {filteredFiles[0] && <img src={filteredFiles[0].fileUri} alt="First Image" />}
                    {filteredFiles[1] && <img src={filteredFiles[1].fileUri} alt="secound Image" />}
                </div>

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
                <div className="button-container">
                    <button onClick={onEditClick} className="edit-button">수정</button>
                    <button onClick={onDelClick} className="delete-button">삭제</button>
                    <button onClick={() => navigate("/posts")} className="list-button">목록으로</button>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;