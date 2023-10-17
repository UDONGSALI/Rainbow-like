import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {SERVER_URL} from "../../Common/constants";
import styles from "../../../../css/component/Rent/RentReviewPost.module.css";
import Comment from "../../Comment/Comment";

const RentReviewDetails = () => {
    const {postNum} = useParams();
    const [postDetails, setPostDetails] = useState(null);
    const [post, setPost] = useState(null);
    const [open, setOpen] = useState(false);
    const memId = sessionStorage.getItem("memId");
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";
    const navigate = useNavigate();

    // 서버로부터 데이터를 가져오는 함수
    const fetchPostDetails = async () => {
        try {
            const [detailsResponse, postResponse] = await Promise.all([
                fetch(SERVER_URL + `rentReview/${postNum}`),
                fetch(`${SERVER_URL}posts/${postNum}/increase-view`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }),
            ]);

            if (!detailsResponse.ok) {
                throw new Error("서버 응답 실패");
            }

            const detailsData = await detailsResponse.json();
            setPostDetails(detailsData);

            if (!postResponse.ok) {
                throw new Error("서버 응답 실패");
            }

            // postResponse에서는 JSON을 읽지 않습니다.
            // const postData = await postResponse.json();
            // setPost(postData);

            console.log(detailsData);
        } catch (error) {
            console.error("데이터 가져오기 실패:", error);
        }
    };
    useEffect(() => {
        // 데이터 가져오는 함수 호출
        fetchPostDetails();
    }, [postNum]);


    if (!postDetails) {
        // 데이터가 아직 로드되지 않았을 때의 상태를 처리
        return <div>Loading...</div>;
    }


    const writeDate = new Date(postDetails.writeDate);
    const formattedDate = writeDate.toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const onEditClick = () => {
        // 수정 페이지로 이동
        navigate(`/rent/reviewEdit/${postNum}`);
    };

    const onDeleteClick = () => {
        const shouldDelete = window.confirm('정말로 삭제하시겠습니까?');
        if (shouldDelete) {
            // 삭제 API 호출
            const updatedPostData = {
                memNum: postDetails.member.memNum,
                boardNum: postDetails.board.boardNum,
                title: postDetails.title,
                content: postDetails.content,
                writeDate: postDetails.writeDate,
                editDate: postDetails.editDate,
                pageView: postDetails.pageView,
            };

            // PUT 요청 보내기
            fetch(SERVER_URL + `post/${postNum}`, {
                method: 'DELETE', // PUT 요청을 사용
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
                .catch((err) => console.error(err))
                .then((data) => {
                    alert('게시글을 삭제했습니다.');
                    setOpen(true);
                    navigate('/rent/review');
                })
                .catch((error) => {
                    console.error('게시글 삭제 중 오류 발생:', error);
                });
        }
    };


    // 데이터가 로드되면 UI를 렌더링
    return (
        <div id={styles.review}>
            <p><b>글번호</b> {postDetails.postNum} <b>｜</b></p>
            <div className={styles.postBox}>
                <div className={styles.titleWrap}>
                    <div className={styles.title}>
                        <h2><b>제목</b> {postDetails.title}</h2>
                    </div>
                    <div className={styles.info}>
                        <p><b>작성자｜</b> {postDetails.member.memId}</p>
                        <p><b>조회수｜</b> {postDetails.pageView}</p>
                        <p><b>작성일｜</b> {formattedDate}</p>
                    </div>
                </div>
                <hr/>
                <div className={styles.content}>
                    <p>{postDetails.content}</p>
                </div>

                <div>
                    <div className={styles.postButton}>
                        {postDetails.member.memId === memId || isAdmin ? (
                            <>
                                <div className={styles.button1}>
                                    <button onClick={onEditClick}
                                            style={{
                                                width: "80px",
                                                height: "40px",
                                                backgroundColor: "rgba(118,83,253,0.5)",
                                                color: "#ffffff",
                                                border: "1px solid #cccccc",
                                                borderRadius: '5px',
                                                fontSize: "15px",
                                                fontWeight: "bold",
                                                marginTop: "5%",
                                                marginBottom: "15%"
                                            }}> 수정
                                    </button>
                                    <button onClick={onDeleteClick}
                                            style={{
                                                width: "80px",
                                                height: "40px",
                                                backgroundColor: "rgba(61,12,105,0.73)",
                                                color: "#ffffff",
                                                border: "1px solid #cccccc",
                                                borderRadius: '5px',
                                                fontSize: "15px",
                                                fontWeight: "bold",
                                                marginTop: "5%",
                                                marginBottom: "15%"
                                            }}> 삭제
                                    </button>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.button2} style={{display: 'flex', justifyContent: 'center'}}>

                <button onClick={() => navigate('/rent/reviewWrite')}
                        style={{
                            width: "100px",
                            height: "40px",
                            backgroundColor: "#a38ced",
                            color: "#ffffff",
                            border: "1px solid #cccccc",
                            borderRadius: '5px',
                            fontSize: "15px",
                            fontWeight: "bold",
                            marginTop: "5%",
                            marginBottom: "15%"
                        }}>새글쓰기
                </button>

                <button onClick={() => navigate('/rent/review')}
                        style={{
                            width: "100px",
                            height: "40px",
                            backgroundColor: "#3d0c69",
                            color: "#ffffff",
                            border: "1px solid #cccccc",
                            borderRadius: '5px',
                            fontSize: "15px",
                            fontWeight: "bold",
                            marginTop: "5%",
                            marginBottom: "15%"
                        }}> 목록으로
                </button>

            </div>
        </div>
    );
};

export default RentReviewDetails;