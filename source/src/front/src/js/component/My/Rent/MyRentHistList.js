import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from "../../Common/constants";
import styles from "../../../../css/component/Mypage/MypageComponent.module.css";
import CustomDataGrid from "../../Common/CustomDataGrid";
import useDelete from "../../hook/useDelete";
import PayStatusCell from "../../Rent/RenderCell/PayStatusCell";
import Pagination from "../../Common/Pagination";

export default function MyRentHistList() {
    const [memNum, setMemNum] = useState(null);
    const [rentHists, setRentHists] = useState([]);
    const [infoData, setInfoData] = useState(null);
    const [infoTitle, setInfoTitle] = useState("");
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [isPermitOpen, setIsPermitOpen] = useState(false);
    const [currentPermitData, setCurrentPermitData] = useState({spaceName: "", getRentDate: "", getRentTime: ""});
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSpace, setSelectedSpace] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 페이지당 표시할 항목 수
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
            fetchRentHistsByMember();
        }
    }, [memNum]);

    const fetchRentHistsByMember = () => {
        if (memNum === null) {
            return;
        }

        // memNum을 사용하여 해당 멤버의 정보만 가져오도록 수정
        fetch(`${SERVER_URL}rent/memberRent/${memNum}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const modifiedData = data.map(item => ({
                    ...item,
                    spaceName: item.space.spaceName,
                    rentFee: item.space.rentFee,
                    payStatus: item.payStatus, // Add payStatus to each rentHist object
                }));

                const rentHistsWithNumbers = modifiedData.map((rentHist, index) => ({
                    ...rentHist,
                    id: rentHist.rentHistNum,
                    number: index +1, // 각 행에 번호를 순차적으로 할당
                }));

                setRentHists(rentHistsWithNumbers);
            })
            .catch((error) => {
                console.error("API 호출 중 오류 발생:", error);
            });
    };

    const handleSpaceClick = (space) => {
        setInfoTitle("공간 정보");
        setInfoData(space);
        setIsInfoModalOpen(true);
    };

    function getRentDate(params) {
        const date = new Date(params.row.rentStdt); // 대여 시작일을 기준으로 합니다.
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }

    function getRentTime(params) {
        const startTime = new Date(params.row.rentStdt);
        const endTime = new Date(params.row.rentEddt);
        return `${String(startTime.getHours()).padStart(2, '0')}:${String(startTime.getMinutes()).padStart(2, '0')} - ${String(endTime.getHours()).padStart(2, '0')}:${String(endTime.getMinutes()).padStart(2, '0')}`;
    }


    const handleDelete = async (rentHistNum) => {
        const isSuccess = await deleteItem('rent/' + rentHistNum, "취소");

        if (isSuccess) {
            const updatedRows = rentHists.filter(row => row.rentHistNum !== rentHistNum);
            setRentHists(updatedRows);
        }
    };

    function handleOpenPaymentPopup(rentHist) {
        const totalAmount = calculateTotalAmount(rentHist.space.rentFee, rentHist.rentStdt, rentHist.rentEddt);
        const width = 500;
        const height = 650;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        const popupOptions = `scrollbars=no, width=${width}, height=${height}, top=${top}, left=${left}`;

        // rentHistNum와 fee 값을 URL에 포함시키기
        window.open(`/pay/${rentHist.id}/${totalAmount}`, 'PaymentPopup', popupOptions);
    }
    const handlePermitPrint = (applyStatus, payStatus, spaceName, getRentDate, getRentTime) => {
        if (applyStatus === 'APPROVE' && payStatus === 'COMPLETE') {
            setCurrentPermitData({spaceName, getRentDate, getRentTime});
            setIsPermitOpen(true);
        } else {
            alert('대여 승인 및 결제 완료 후 출력이 가능합니다!');
        }
    };

    function calculateRentDuration(rentStdt, rentEddt) {
        const startTime = new Date(rentStdt);
        const endTime = new Date(rentEddt);
        const duration = endTime - startTime;
        return duration / (60 * 60 * 1000);  // 시간으로 변환
    }

    function calculateTotalAmount(rentFee, rentStdt, rentEddt) {
        const cleanFee = parseInt(rentFee.replace('원', '').replace(/,/g, ''), 10);
        const duration = calculateRentDuration(rentStdt, rentEddt);
        return cleanFee * duration;
    }

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

    // 모달을 열기 위한 함수
    const handleSpaceInfoClick = (space) => {
        setSelectedSpace(space);
        setModalOpen(true);
    };

   // 모달을 닫기 위한 함수
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleChangePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const columns = [
        {
            field: "number",
            headerName: "번호",
            width: 60,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',

        },
        {
            field: "spaceName",
            headerName: "공간명",
            flex: 1,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            renderCell: (row) => (
                <span
                    onClick={() => handleSpaceClick(row.row.space)}
                    style={{cursor: "pointer"}}
                >
                {row.row.space?.spaceName || ''}
            </span>
            )
        },
        {
            field: "rentFee",
            headerName: "대관료",
            flex: 1,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',

        },
        {
            field: "rentDate",
            headerName: "대관일",
            flex: 1,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            renderCell: getRentDate
        },
        {
            field: "rentTime",
            headerName: "대관 시간",
            flex: 1,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            renderCell: getRentTime
        },

        {
            field: "applyDate",
            headerName: "신청 일시",
            flex: 1,
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
            headerName: "신청 상태",
            flex: 1,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (params) => convertEnumToKorean(params.value),
        },
        {
            field: "payStatus",
            headerName: "결제 상태",
            flex: 1,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (params) => convertEnumToKorean(params.value),
            renderCell: (params) => <PayStatusCell {...params} onPayment={handleOpenPaymentPopup} setRentHist={setRentHists}/>,
        },
        {
            field: "cancel",
            headerName: "취소",
            width:130,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <button onClick={() => handleDelete(params.row.rentHistNum)}
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
            field: 'permit',
            headerName: '허가증',
            width: 100,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <div
                    onClick={() => handlePermitPrint(
                        params.row.applyStatus,
                        params.row.payStatus,  // 여기에 payStatus를 추가합니다.
                        params.row.space?.spaceName,
                        getRentDate(params),
                        getRentTime(params)
                    )}>
                    🖨️
                </div>
            ),
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
                        maxHeight: 600,
                        height:"100%",
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
                        autoHeight={true}

                    />
                </div>
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={rentHists.length}
                    pageRangeDisplayed={5} // 원하는 범위로 조절
                    onChange={handleChangePage}
                    prevPageText="<"
                    nextPageText=">"
                />
            </div>
        </div>
    );
}
