import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from "../../Common/constants";
import styles from "../../../../css/component/Mypage/MypageComponent.module.css";
import CustomDataGrid from "../../Common/CustomDataGrid";

export default function MyClubList() {
        const [memNum, setMemNum] = useState(null); // 멤버 ID 상태
        const [clubs, setClubs] = useState([]); // 게시글 데이터 상태
        const navigate = useNavigate();


        useEffect(() => {
            // 로그인한 사용자 정보를 가져오는 방법에 따라서 구현
            const fetchedUserInfo = {memNum: sessionStorage.getItem("memNum")};
            setMemNum(fetchedUserInfo.memNum); // memNum 상태 업데이트
        }, []);

        useEffect(() => {
            // memNum 상태가 변경될 때마다 fetchClubsByMember를 호출
            if (memNum !== null) {
                fetchClubsByMember();
            }
        }, [memNum]);

        const fetchClubsByMember = () => {
            if (memNum === null) {
                return;
            }

            // memNum을 사용하여 해당 멤버의 모임정보만 가져오도록 수정
            fetch(`${SERVER_URL}memberClub/${memNum}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    const clubWithNumbers = data.map((club, index) => ({
                        ...club,
                        id: club.postNum,
                        number: index + 1, // 각 행에 번호를 순차적으로 할당
                    }));

                    setClubs(clubWithNumbers);
                })


                .catch((error) => {
                    console.error("API 호출 중 오류 발생:", error);
                });
        };

    const onRowClick = (params) => {
        const rowId = params.row.postNum;

        console.log('rowId:', rowId);
        navigate(`/clubs/${rowId}`);
    };


    function convertEnumToKorean(enumValue) {
        if (enumValue === "APPROVE") {
            return "승인";
        } else if (enumValue === "REJECT") {
            return "거부";
        } else if (enumValue === "COMPLETE") {
            return "완료";
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
            field: "title",
            headerName: "소모임 제목",
            width: 350,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',


        },
        
        {
            field: "clubAllowStatus",
            headerName: "허가 상태",
            width: 200,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (params) => convertEnumToKorean(params.value),

        },
        {
            field: "clubRecuStatus",
            headerName: "모집 상태",
            width: 200,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: "writeDate",
            headerName: "신청 일시",
            width: 150,
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
        {
            field: "content",
            headerName: "상세 내용",
            width: 135,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {



                return (
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() => onRowClick(params)}
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img
                                src="https://storage.googleapis.com/rainbow_like/img/search2.png"
                                alt="소모임 상세 이미지"
                                style={{ width: 30, height: 30 }}
                            />
                        </div>
                    </div>
                );
            }

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
                        rows={clubs}
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
