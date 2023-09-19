import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import {useParams, useNavigate} from 'react-router-dom';
import {SERVER_URL} from "./constants";
import '../../../../../helpme/source/src/front/src/css/component/ClubDetail.css';
=======
import { useParams } from 'react-router-dom';

import {SERVER_URL} from "./constants";
import {useProps} from "@mui/x-data-grid/internals";
>>>>>>> 4d1ef37 (no message)

function ClubDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [open, setOpen] = useState(false);
<<<<<<< HEAD
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



=======


    useEffect(() => {
>>>>>>> 4d1ef37 (no message)
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

<<<<<<< HEAD
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



=======
    // const PVcnt = (url) => {
    //     fetch(url, {method: 'put'})
    //         .then(response => {
    //             fetchPost();
    //             setOpen(true);
    //         })
    // };
>>>>>>> 4d1ef37 (no message)
    if (!post) {
        return <div>Loading...</div>;
    }

<<<<<<< HEAD


=======
>>>>>>> 4d1ef37 (no message)
    return (
        <div className="post-detail">
            <h2>{post.post.title}</h2>
            <div className="post-meta">
<<<<<<< HEAD
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
=======
                <p>작성자: {post.member.name}</p>
                <p>허가 여부: {post.post.clubAllowStatus}</p>
                <p>진행 상황: {post.post.clubRecuStatus}</p>
            </div>
            <p>내용:</p>
            <div>{post.post.content}</div>
            <p>조회수: {post.post.pageView}</p>
>>>>>>> 4d1ef37 (no message)
        </div>
    );


<<<<<<< HEAD
=======
    // const { id } = useParams();
    // return (<h1>{id} clubdetailpage</h1>);
>>>>>>> 4d1ef37 (no message)
}

export default ClubDetail;