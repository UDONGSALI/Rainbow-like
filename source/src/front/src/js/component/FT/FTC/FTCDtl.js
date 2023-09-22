import React, { useState, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {SERVER_URL} from "../../Common/constants";
import styles from '../../../../css/component/Club/ClubDetail.module.css';


function FTCDtl(){
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = () =>{
        fetch(SERVER_URL + "ftc/" + id)
            .then(response =>
                response.json())
            .then(data =>
                setPost(data))

            .catch(err => console.error(err));


    };


    const onEditClick = (params) => {
        navigate("/ftc/edit/" + id);
    };


    if (!post) {
        return <div>Loading...</div>;
    }

    return(

        <div className={styles.FTDetailPage}>
            <h3>{post.member.name}</h3>
            <div>

                <div>
                    {post.ftc.ftStatus}
                </div>
            </div>
            <div>
                분야
            <div>
                {post.ftc.speField}
            </div>
            </div>
            <div>
                매칭 여부
            <div>
                {post.ftc.ftmYN}
            </div>
            </div>

            <div>
                상세
                <div>
                    {post.ftc.applyContent}
                </div>
           </div>

            {/*<div className={styles.content}>{post.post.content}</div>*/}
            <div className={styles.postButton}>
                <button onClick={() => onEditClick()}>수정</button>
                <button onClick={() => navigate("/ftc")}>리스트로</button>
            </div>

        </div>
    );
}

export default FTCDtl;