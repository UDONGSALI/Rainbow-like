import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from "../../Common/constants";
import styles from "../../../../css/component/Mypage/MyActivePost.module.css";
import CustomDataGrid from "../../Common/CustomDataGrid";
import useDelete from "../../hook/useDelete";

export default function MyRentHistList() {
    const [memNum, setMemNum] = useState(null); // 멤버 ID 상태
    const [rentHists, setRentHists] = useState([]); // 게시글 데이터 상태
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
            fetchClubsByMember();
        }
    }, [memNum]);

    const fetchClubsByMember = () => {
        if (memNum === null) {
            return;
        }

        // memNum을 사용하여 해당 멤버의 모임정보만 가져오도록 수정
        fetch(`${SERVER_URL}rent/memberRent/${memNum}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const modifiedData = data.map(item => ({
                    ...item,
                    spaceName: item.space.spaceName,
                    rentFee: item.space.rentFee,
                    rentStdt: item.rentStdt,
                    rentEddt: item.rentEddt,
                }));
                setRentHists(modifiedData);
            })
            .catch((error) => {
                console.error("API 호출 중 오류 발생:", error);
            });
    };

    const onRowClick = (params) => {
        const rowId = params.row.rentHistNum;

        console.log('rowId:', rowId);
        navigate(`/clubs/${rowId}`);
    };

    const handleDelete = async (rentHistNum) => {
        const isSuccess = await deleteItem('rent/' + rentHistNum, "취소");

        if (isSuccess) {
            const updatedRows = rentHists.filter(row => row.rentHistNum !== rentHistNum);
            setRentHists(updatedRows);
        }
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
            field: "rentHistNum",
            headerName: "번호",
            width: 80,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: "spaceName",
            headerName: "공간명",
            width: 200,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',


        },
        {
            field: "rentFee",
            headerName: "대관료",
            width: 100,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',


        },
        {
            field: "rentPeriod",
            headerName: "대관 기간",
            width: 250,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (params) => {
                const startDate = params.row && params.row.rentStdt ? new Date(params.row.rentStdt) : null;
                const endDate = params.row && params.row.rentEddt ? new Date(params.row.rentEddt) : null;


                console.log(startDate);
                console.log(endDate);

            }
        },


        {
            field: "applyDate",
            headerName: "신청일자",
            width: 100,
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
            field: "applyStatus",
            headerName: "신청현황",
            width: 150,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (params) => convertEnumToKorean(params.value),
        },
        {
            field: "cancel",
            headerName: "취소",
            width:100,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <button onClick={() => handleDelete(params.row.eduHistNum)}
                        style={{
                    width: "60px",
                    height: "30px",
                    border:"1px solid #fff",
                    backgroundColor: "#a38ced",
                    color: "rgb(255,255,255)",
                    borderRadius: '5px',
                    fontSize: "15px",
                    fontWeight: "bold",
                }}
                >
                    취소
                </button>
            ),

        },
        {
            field: "writeDate",
            headerName: "상세내역",
            width: 140,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                const postTitle = params.row.title;


                return (
                    <div
                        style={{cursor: "pointer"}}
                        onClick={() => onRowClick(params)}
                    >
                        <div style={{display: "flex", alignItems: "center"}}>
                            <img
                                src="https://storage.googleapis.com/rainbow_like/img/search2.png"
                                alt="소모임 상세 이미지"
                                style={{width: 30, height: 30}}
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
                        rows={rentHists}
                        pageSize={5} // 페이지당 5개의 행을 보여줍니다.
                        getRowId={(row) => row.rentHistNum}
                        components={{
                            NoRowsOverlay: CustomNoRowsOverlay
                        }}
                        pagination={true}
                        sortModel={[
                            {
                                field: "postNum",
                                sort: "desc", // 내림차순 정렬
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
