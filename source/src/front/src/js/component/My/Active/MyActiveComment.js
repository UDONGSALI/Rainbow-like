
import React, {useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from "../../../../js/component/Common/constants";
import styles from "../../../../css/component/Mypage/MyActivePost.module.css";
import CustomDataGrid from "../../Common/CustomDataGrid";


export default function MyActiveComment() {
    const [memNum, setMemNum] = useState(null); // 멤버 ID 상태
    const [comments, setComments] = useState([]); // 게시글 데이터 상태
    const navigate = useNavigate();


    useEffect(() => {
        // 실제로 사용자 정보를 가져오는 방법에 따라서 구현
        // 예시로 사용자 정보를 가져온다고 가정
        const fetchedUserInfo = {memNum: sessionStorage.getItem("memNum")};
        setMemNum(fetchedUserInfo.memNum); // memNum 상태 업데이트
    }, []);

    useEffect(() => {
        // memNum 상태가 변경될 때마다 fetchCommentsByMember를 호출
        if (memNum !== null) {
            fetchCommentsByMember();
        }
    }, [memNum]);

    const fetchCommentsByMember = () => {
        if (memNum === null) {
            return;
        }

        // memNum을 사용하여 해당 멤버의 댓글만 가져오도록 수정
        fetch(`${SERVER_URL}comments/member/${memNum}`)
            .then((response) => response.json())
            .then((data) => {
                // 해당 멤버의 댓글만 필터링하여 상태(State)에 저장
                const memberComments = data.filter((comment) => comment.member.memNum === memNum);
                setComments(memberComments);
                // 번호를 추가하여 각 행에 할당
                const commentsWithNumbers = data.map((comment, index) => ({
                    ...comment,
                    id: comment.commNum,
                    number: index + 1, // 각 행에 번호를 순차적으로 할당
                }));
                setComments(commentsWithNumbers);

            })
            .catch((error) => {
                console.error("API 호출 중 오류 발생:", error);
            });
    };

    const onRowClick = (params) => {


        const rowId = params.row.postNum;
        const board = params.row.post && params.row.post.board;

        // board가 정의되어 있지 않으면 'N/A'로 설정
        const boardName = board ? board.boardName : 'N/A';

        console.log('rowId:', rowId);
        console.log('boardName:', boardName);

        let targetPath = ""; // 이동할 경로 초기화

        // boardName에 따라 다른 경로 설정
        if (boardName === '공지사항') {
            targetPath = `/post/detail/${rowId}`;
        } else if (boardName === '모임 페이지') {
            targetPath = `/clubs/${rowId}`;
        } else if (boardName === '세종시 기관 및 단체 소식') {
            targetPath = `/post/detail/${rowId}`;
        } else if (boardName === '대관 이용 후기') {
            targetPath = `/rent/review/${rowId}`;
        } else if (boardName === '온라인 상담') {
            targetPath = `/rent/review/${rowId}`;
        } else {
            targetPath = `/post/detail/${rowId}`;
        }

        // 실제로 경로 이동
        navigate(targetPath);
    };


    const columns = [
        {
            field: "number",
            headerName: "번호",
            width: 80,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: "boardName", // 게시판 구분을 "boardName"으로 변경
            headerName: "구분",
            width: 250,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            valueGetter: (params) => {
                // params.row.post가 없거나 params.row.post.board가 없으면 'N/A' 반환
                if (!params.row.post || !params.row.post.board) {
                    return 'N/A';
                }

                const board = params.row.post.board;
                return board.boardName || 'N/A';
            }

        },
        {
            field: "title",
            headerName: "게시글",
            width: 400,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,

            renderCell: (params) => {
                console.log(params.row);
                const postTitle = params.row.post && params.row.post.title;
                const displayTitle = postTitle || 'N/A';

                return (
                    <div
                        style={{cursor: "pointer"}}
                        onClick={() => onRowClick(params)}
                    >
                        {displayTitle}
                    </div>
                );
            },
        },
        {
            field: "content",
            headerName: "댓글 내용",
            width: 400,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,



        },
        {
            field: "writeDate",
            headerName: "작성일",
            width: 200,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (params) => {
                //작성일을 JS Date 객체로 파싱
                const writeDate = new Date(params.value);
                //원하는 형식으로 날짜 포맷
                const formattedDate = `${writeDate.getFullYear()}-${String(writeDate.getMonth() + 1).padStart(2, '0')}-${String(writeDate.getDate()).padStart(2, '0')}`;

                return formattedDate;
            },
        },
    ];


    function CustomNoRowsOverlay() {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    fontWeight: 'bold',
                    flexDirection: 'column',
                }}
            >
                <p>데이터가 없습니다.</p>
            </div>
        );
    }


    return (
        <div id={styles.active}>
            <div className={styles.main}>
                <h3>내가 쓴 댓글 관리</h3>
                <div
                    className={styles.posts}
                    style={{
                        height: 500,
                        width: "100%",

                    }}
                >
                    <CustomDataGrid
                        className={styles.customDataGrid}
                        columns={columns}
                        rows={comments}
                        pageSize={5} // 페이지당 5개의 행을 보여줍니다.
                        getRowId={(row) => row.commNum}
                        components={{
                            NoRowsOverlay: CustomNoRowsOverlay
                        }}
                        pagination={true}
                    />
                </div>
            </div>
        </div>
    );
}


