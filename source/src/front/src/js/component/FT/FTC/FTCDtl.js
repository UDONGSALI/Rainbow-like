import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SERVER_URL } from "../../Common/constants";
import styles from '../../../../css/component/Club/ClubDetail.module.css';
import ReactDOM from "react-dom"; // 수정된 import 문
import MatchingPopup from "../FTM/MatchingPopup";
import FTMModal from "../FTM/FTMModal";

function FTCDtl(props) {
    const { id } = useParams();
    const { memId } = props;
    const [post, setPost] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";

    const [isModalOpen, setIsModalOpen] = useState(false);



    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = () => {
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


    const onMatchClick = () => {
        // 새로운 창을 열 때 URL에 데이터를 전달합니다.
        const popupWindow = window.open(`/ftmpop/${post.ftc.ftConsumerNum}`, '_blank', 'width=1000,height=600');
    };

    const onModalClick = () => {
        // 매칭 확인 모달 열기
        setIsModalOpen(true);
    };

    const closeModal = () => {
        // 모달 닫기
        setIsModalOpen(false);
    };




    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.FTDetailPage}>
            <h3>{post.member.name}</h3>
            <div>
                <div>{post.ftc.ftStatus}</div>
            </div>
            <div>
                분야
                <div>{post.ftc.speField}</div>
            </div>
            <div>
                매칭 여부
                <div>{post.ftc.ftmYN}</div>
            </div>
            <div>
                상세
                <div>{post.ftc.applyContent}</div>
            </div>
            <div className={styles.postButton}>
                <button onClick={() => onEditClick()}>수정</button>
                {post.ftc.ftmYN ==='Y'? <> <button onClick={onModalClick}>매칭확인</button> </> : null}
                {isAdmin ? <button onClick={onMatchClick}>매칭하기</button> : null}
                <button onClick={() => navigate("/ftc")}>리스트로</button>


                {isModalOpen && (
                    <FTMModal onClose={closeModal} ftcNum = {id} />
                )}
            </div>


        </div>
    );
}

export default FTCDtl;