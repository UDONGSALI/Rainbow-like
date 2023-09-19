import React, { useState, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {SERVER_URL} from "../Common/constants";
import '../../../css/component//Club/ClubDetail.css';


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

    const onDelClick = (post) => {
        console.log(post);
        const updatedPostData = {

            memNum: post.member.memNum,
            boardNum: post.board.boardNum,
            title: post.title,
            content: post.content,
            writeDate: post.writeDate,
            editDate: post.editDate,
            pageView: post.pageView,
            parentsNum: post.parentsNum,
            clubAllowStatus: post.clubAllowStatus,
            clubRecuStatus: post.clubRecuStatus,
            delYN : 'Y'
        };

        // PUT 요청 보내기
        fetch(SERVER_URL + "posts/edit/" + post.postNum, {
            method: 'PUT', // PUT 요청을 사용
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPostData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                alert('게시글을 삭제했습니다.');
                setOpen(true);
                navigate('/posts');

            })
            .catch((error) => {
                console.error('게시글 삭제 중 오류 발생:', error);
            });
    };


    
    const onEditClick = () => {

        navigate("/posts/edit/" + id);
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
                <p>작성자: {post.member.name}　　　　　　　　　　　　　　　　　　　
                허가 여부: {post.post.clubAllowStatus}　
                진행 상황: {post.post.clubRecuStatus}　
                조회수: {post.post.pageView}</p>
            </div>

            <div className="content">{post.post.content}</div>
            <div className="post-button">
                <button onClick={() => onEditClick()}>수정</button>
                <button onClick={() => onDelClick(post.post)}>삭제</button>
                <button onClick={() => navigate("/posts")}>리스트로</button>
            </div>

        </div>
    );


}

export default ClubDetail;