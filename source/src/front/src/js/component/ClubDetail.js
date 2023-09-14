import React, { useState, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {SERVER_URL} from "./constants";
import '../../../../../helpme/source/src/front/src/css/component/ClubDetail.css';

function ClubDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // 조회수 증가 API 호출
        fetch(`${SERVER_URL}posts/${id}/increase-view`, {
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



        fetch(SERVER_URL + "posts/" + id)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => console.error(error));
    }, [id]);

    useEffect(() => {
        fetchPost();
    }, []);
    const fetchPost = () =>{
        fetch(SERVER_URL + "posts/" + id)
            .then(response =>
                response.json())
            .then(data =>
                setPost(data))
            .catch(err => console.error(err));
    };

    const onDelClick = (url) => {

        fetch(SERVER_URL + "api/posts/" + id, {method: 'DELETE'})
            .then(response => {
                setOpen(true);
            })
            .catch(err => console.error(err))

            navigate('/posts');

    };

    const onEditClick = () => {

        navigate("/posts/edit/" + id);
    };



    if (!post) {
        return <div>Loading...</div>;
    }



    return (
        <div className="post-detail">
            <h2>{post.post.title}</h2>
            <div className="post-meta">
                <p>작성자: {post.member.name}　　　　　　　　　　　　　　　　　　　
                허가 여부: {post.post.clubAllowStatus}　
                진행 상황: {post.post.clubRecuStatus}　
                조회수: {post.post.pageView}</p>
            </div>

            <div className="content">{post.post.content}</div>
            <div className="post-button">
                <button onClick={() => onEditClick()}>수정</button>
                <button onClick={() => onDelClick()}>삭제</button>
                <button onClick={() => navigate("/posts")}>리스트로</button>
            </div>
        </div>
    );


}

export default ClubDetail;