import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from "../../Common/constants";
import styles from "../../../../css/component/Mypage/MypageComponent.module.css";
import CustomDataGrid from "../../Common/CustomDataGrid";
import useDelete from "../../hook/useDelete";
import useFetch from "../../hook/useFetch";

export default function MyCounselList() {
    const [memNum, setMemNum] = useState(null); // 멤버 ID 상태
    const [counsels, setCounsels] = useState([]);
    const navigate = useNavigate();
    const deleteItem = useDelete(SERVER_URL);

    const {data: fetchedCounsels, loading} = useFetch(`${SERVER_URL}post/memberCounsel/${memNum}`);


    useEffect(() => {
        // 로그인한 사용자 정보를 가져오는 방법에 따라서 구현
        const fetchedUserInfo = {memNum: sessionStorage.getItem("memNum")};
        setMemNum(fetchedUserInfo.memNum); // memNum 상태 업데이트
    }, []);


    useEffect(() => {
        if (!loading) {
            // Post 객체에 type 속성 설정
            fetchedCounsels.forEach(post => {
                switch (post.board.boardNum) {
                    case 7:
                        post.type = '노무 상담';
                        break;
                    case 8:
                        post.type = '온라인 상담';
                        break;
                    default:
                        break;
                }
            });

            const primaryCounsels = fetchedCounsels.filter(post => !post.parentsNum).sort((a, b) => b.postNum - a.postNum);

            const replyMap = fetchedCounsels.reduce((acc, post) => {
                if (post.parentsNum) {
                    if (!acc[post.parentsNum]) {
                        acc[post.parentsNum] = [];
                    }
                    acc[post.parentsNum].push(post);
                }
                return acc;
            }, {});

            const sortedCounsels = [];

            primaryCounsels.forEach(primaryCounsel => {
                sortedCounsels.push(primaryCounsel);
                if (replyMap[primaryCounsel.postNum]) {
                    sortedCounsels.push(...replyMap[primaryCounsel.postNum]);
                }
            });

            setCounsels(sortedCounsels);
        }
    },[loading, fetchedCounsels, memNum]);


    console.log(counsels)
    const onRowClick = (params) => {
        const rowId = params.row.postNum;
        const boardNum = params.row.board.boardNum;

        console.log('rowId:', rowId);
        navigate(`/post/detail/${boardNum}/${rowId}`);
    };

    function convertEnumToKorean(enumValue) {
        if (enumValue === "APPROVE") {
            return "승인";
        } else if (enumValue === "REJECT") {
            return "거부";
        } else if (enumValue === "COMPLETE") {
            return "완료";
        } else if (enumValue === "EDU") {
            return "교육";
        } else if (enumValue === "BUSINESS") {
            return "사업";
        } else {
            return "대기";
        }
    };

    const columns = [
        {
            field: "postNum",
            headerName: "번호",
            width: 80,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: "type",
            headerName: "구분",
            width: 200,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',

        },
        {
            field: "title",
            headerName: "제목",
            flex: 1,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            headerAlign: 'center',
            renderCell: (params) => {

                const postTitle = params.row.title


                return (
                    <div
                        style={{cursor: "pointer"}}
                        onClick={() => onRowClick(params)}
                    >
                        {params.row.parentsNum ? "ㄴ [답글] " : ""}{params.row.title}
                    </div>
                );
            }

        },
        {
            field: "writeDate",
            headerName: "등록 일시",
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
                        rows={counsels}
                        pageSize={5} // 페이지당 5개의 행을 보여줍니다.
                        getRowId={(row) => row.postNum}
                        components={{
                            NoRowsOverlay: CustomNoRowsOverlay
                        }}
                        pagination={true}
                        sortModel={[
                            {
                                field: "number",
                                sort: "desc", // 내림차순 정렬
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
;
