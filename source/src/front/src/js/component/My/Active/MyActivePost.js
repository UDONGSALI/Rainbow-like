import React, {useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {SERVER_URL} from "../../../../js/component/Common/constants";
import {useNavigate} from "react-router-dom";
import styles from "../../../../css/component/Mypage/MyActivePost.module.css";



export default function MyActivePost(props) {
    const [memNum, setMemNum] = useState(null); // 멤버 ID 상태
    const [posts, setPosts] = useState([]); // 게시글 데이터 상태
    const navigate = useNavigate();


    useEffect(() => {
        // 실제로 사용자 정보를 가져오는 방법에 따라서 구현
        // 예시로 사용자 정보를 가져온다고 가정
        const fetchedUserInfo = { memNum: 1 }; // 예시로 1번 멤버 정보를 가져왔다고 가정
        setMemNum(fetchedUserInfo.memNum); // memNum 상태 업데이트
    }, []);

    useEffect(() => {
        // memNum 상태가 변경될 때마다 fetchPostsByMember를 호출
        if (memNum !== null) {
            fetchPostsByMember();
        }
    }, [memNum]);

    const fetchPostsByMember = () => {
        if (memNum === null) {
            return;
        }

        // memNum을 사용하여 해당 멤버의 게시글만 가져오도록 수정
        fetch(`${SERVER_URL}posts/member/${memNum}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // 해당 멤버의 게시글만 필터링하여 상태(State)에 저장
                const memberPosts = data.filter((post) => post.member.memNum === memNum);
                setPosts(memberPosts);
                // 필터링: delYN이 'N'인 게시물만 남김
                const filteredPosts = data.filter((post) => post.delYN === 'N');
                setPosts(filteredPosts);
                // 번호를 추가하여 각 행에 할당
                const postsWithNumbers = data.map((post, index) => ({
                    ...post,
                    id: post.postNum,
                    number: index + 1, // 각 행에 번호를 순차적으로 할당
                }));
                setPosts(postsWithNumbers);

            })
            .catch((error) => {
                console.error("API 호출 중 오류 발생:", error);
            });
    };

   const onRowClick = (params) => {
        const rowId = params.row.postNum;
        const boardName = params.row.board.boardName; // 게시글의 유형에 따른 필드 (예: type 필드)

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
            width: 100,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
        },
        {
            field: "boardName", // 게시판 구분을 "boardName"으로 변경
            headerName: "구분", // 열의 헤더 이름
            width: 300,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            valueGetter: (params) => {
                const boards = Array.isArray(params.row.board) ? params.row.board : [params.row.board];
                return boards.map((b) => b.boardName).join(', ');
            }
        },
        {
            field: "title",
            headerName: "제목",
            width: 500,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,

            renderCell: (params) => (
                <div
                    style={{ cursor: "pointer" }}
                    onClick={() => onRowClick(params)}
                >
                    {params.value}
                </div>
            ),
        },
        {
            field: "writeDate",
            headerName: "작성일",
            width: 200,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
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
                    fontWeight:'bold',
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
                <h3>내가 쓴 게시글 관리</h3>
                <div
                    className={styles.posts}
                    style={{
                        height: 500,
                        width: "100%",

                    }}
                >
                    <DataGrid
                        className={styles.customDataGrid}
                        columns={columns}
                        rows={posts}
                        getRowId={(row) => row.postNum}
                        components={{
                            NoRowsOverlay: CustomNoRowsOverlay}}
                        pagination={true} // 페이지네이션 활성화
                        // autoHeight={true} // 스크롤 영역 없애기

                    />
                </div>
            </div>
        </div>
    );
}