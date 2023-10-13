import EduApply from "../../Edu/EduApply";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {SERVER_URL} from "../../Common/constants";
import styles from "../../../../css/component/Mypage/MypageComponent.module.css";
import CustomDataGrid from "../../Common/CustomDataGrid";
import useDelete from "../../hook/useDelete";

export default function MyEduList() {
    const [memNum, setMemNum] = useState(null); // 멤버 ID 상태
    const [eduHists, setEduHists] = useState([]); // 게시글 데이터 상태
    const [isCertificateOpen, setIsCertificateOpen] = useState(false);
    const [currentCertificateData, setCurrentCertificateData] = useState({name: "", eduName: ""});

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
            fetchEduHistsByMember();
        }
    }, [memNum]);

    const fetchEduHistsByMember = () => {
        if (memNum === null) {
            return;
        }

        // memNum을 사용하여 해당 멤버의 교육신청내역만 가져오도록 수정
        fetch(`${SERVER_URL}eduHist/memberEduHist/${memNum}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                const modifiedData = data.map(item => ({
                    ...item,
                    type: item.edu.type,
                    eduName: item.edu.eduName,
                    rentStdt: item.rentStdt,
                    rentEddt: item.rentEddt,
                }));
                const eduHistWithNumbers = modifiedData.map((eduHist, index) => ({
                    ...eduHist,
                    id: eduHist.eduHistNum,
                    number: index + 1, // 각 행에 번호를 순차적으로 할당
                }));

                setEduHists(eduHistWithNumbers);
            })
            .catch((error) => {
                console.error("API 호출 중 오류 발생:", error);
            });
    };

    const onRowClick = (params) => {
        const rowId = params.row.eduNum;

        console.log('rowId:', rowId);
        navigate(`/edu/list/detail/${rowId}`);
    };

    const handleTitleClick = (eduNum) => {
        navigate(`/edu/list/detail/${eduNum}`);
    }


    const handleDelete = async (eduHistNum) => {
        const isSuccess = await deleteItem('rent/' + eduHistNum, "취소");

        if (isSuccess) {
            const updatedRows = eduHists.filter(row => row.eduHistNum !== eduHistNum);
            setEduHists(updatedRows);
        }
    };
    const handleCertificatePrint = (status, name, eduName) => {
        if (status === 'COMPLETE') {
            setCurrentCertificateData({name, eduName});
            setIsCertificateOpen(true);
        } else {
            alert('교육 수료 후 출력이 가능합니다!');
        }
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
            width: 80,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (params) => convertEnumToKorean(params.value),

        },
        {
            field: "eduName",
            headerName: "교육명",
            width: 450,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            headerAlign: 'center',



        },
        {
            field: "eduPeriod",
            headerName: "교육일시",
            width: 200,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
           
        },
        {
            field: "applyDate",
            headerName: "신청일시",
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
            field: "status",
            headerName: "신청 상태",
            width: 80,
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
                            width: "50px",
                            height: "25px",
                            border:"1px solid #fff",
                            backgroundColor: "#a38ced",
                            color: "rgb(255,255,255)",
                            borderRadius: '5px',
                            fontSize: "13px",
                            fontWeight: "bold",
                        }}
                >
                    취소
                </button>
            ),

        },
        {
            field: "content",
            headerName: "상세 내용",
            width: 100,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <div style={{cursor: "pointer"}}
                     onClick={() => handleTitleClick(params.row.edu.eduNum)}
                     className="eduNameCell">
                    <img
                        src="https://storage.googleapis.com/rainbow_like/img/search2.png"
                        alt="상세내역"
                        style={{width: 30, height: 30}}
                    />
                </div>
            ),
        },
        {
            field: 'printCertificate',
            headerName: '수료증',
            width: 70,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <div
                    onClick={() => handleCertificatePrint(params.row.status, params.row.member?.name, params.row.edu?.eduName)}>
                    🖨️
                </div>
            ),
        }

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
                        rows={eduHists}
                        pageSize={5} // 페이지당 5개의 행을 보여줍니다.
                        getRowId={(row) => row.eduHistNum}
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
