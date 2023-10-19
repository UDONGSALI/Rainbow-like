
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {SERVER_URL} from "../../Common/constants";
import styles from "../../../../css/component/Mypage/MypageComponent.module.css";
import CustomDataGrid from "../../Common/CustomDataGrid";
import useDelete from "../../hook/useDelete";

export default function MyCounselList() {
    const [memNum, setMemNum] = useState(null); // 멤버 ID 상태
    const [counsels, setCounsels] = useState([]);
    const navigate = useNavigate();
    const deleteItem = useDelete(SERVER_URL);

    useEffect(() => {
        // 로그인한 사용자 정보를 가져오는 방법에 따라서 구현
        const fetchedUserInfo = {memNum: sessionStorage.getItem("memNum")};
        setMemNum(fetchedUserInfo.memNum); // memNum 상태 업데이트
    }, []);

    useEffect(() => {
        // memNum 상태가 변경될 때마다 fetchClubsByMember를 호출
        if (memNum !== null) {
            fetchCounselsByMember();
        }
    }, [memNum]);

    const fetchCounselsByMember = () => {
        if (memNum === null) {
            return;
        }

        // memNum을 사용하여 해당 멤버의 교육신청내역만 가져오도록 수정
        fetch(`${SERVER_URL}post/memberCounsel/${memNum}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const modifiedData = data.map(item => ({
                    ...item,
                    type:item.board.boardName,


                }));
                const counselsWithNumbers = modifiedData.map((counsel, index) => ({
                    ...counsel,
                    id: counsel.postNum,
                    number: index + 1, // 각 행에 번호를 순차적으로 할당
                }));

                setCounsels(counselsWithNumbers);
            })
            .catch((error) => {
                console.error("API 호출 중 오류 발생:", error);
            });
    };

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
        } else if (enumValue === "BUSINESS"){
            return "사업";
        } else {
            return "대기";
        }
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
                        {postTitle}
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
};
