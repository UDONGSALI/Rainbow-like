import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {SERVER_URL} from "./constants";
import {useProps} from "@mui/x-data-grid/internals";

function ClubDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [open, setOpen] = useState(false);


    useEffect(() => {
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

    // const PVcnt = (url) => {
    //     fetch(url, {method: 'put'})
    //         .then(response => {
    //             fetchPost();
    //             setOpen(true);
    //         })
    // };
    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="post-detail">
            <h2>{post.post.title}</h2>
            <div className="post-meta">
                <p>작성자: {post.member.name}</p>
                <p>허가 여부: {post.post.clubAllowStatus}</p>
                <p>진행 상황: {post.post.clubRecuStatus}</p>
            </div>
            <p>내용:</p>
            <div>{post.post.content}</div>
            <p>조회수: {post.post.pageView}</p>
        </div>
    );


    // const { id } = useParams();
    // return (<h1>{id} clubdetailpage</h1>);
}

export default ClubDetail;