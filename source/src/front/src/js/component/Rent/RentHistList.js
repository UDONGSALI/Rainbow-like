// 1. React 관련
import React, {useEffect, useState} from "react";
// 2. 외부 라이브러리 관련
import {DataGrid} from "@mui/x-data-grid";
import styled from '@emotion/styled';
import {Pagination} from "@mui/material";
// 3. 프로젝트 내 공통 모듈 관련
import {SERVER_URL} from "../Common/constants";
import {useLocation, useNavigate} from "react-router-dom";
// 4. 컴포넌트 관련
import SearchComponent from "../Common/SearchComponent";
import Permit from "./RenderCell/Permit";
// 5. 훅 관련
import useSearch from "../hook/useSearch";
import useFetch from "../hook/useFetch";
import usePagination from "../hook/usePagination";
import StatusCell from "./RenderCell/StatusCell";
import payStatusCell from "./RenderCell/PayStatusCell";
import ApplyDateCell from "./RenderCell/ApplyDateCell";
import InfoModal from "../../../css/component/Common/InfoModal";
// 6. Helper 함수나 Renderer 관련

const ADMIN_ROLE = "ADMIN";

function RentHistList(props) {
    // 1. React Router 관련
    const navigate = useNavigate();
    const location = useLocation();
// 2. 사용자 관련
    const {memId} = props;
    const userRole = sessionStorage.getItem("role");
    const isAdmin = userRole === ADMIN_ROLE;
// 3. 로컬 상태 관리
    const {activePage, setActivePage} = usePagination(1);
    const [isPermitOpen, setIsPermitOpen] = useState(false);
    const [currentPermitData, setCurrentPermitData] = useState({spaceName: "", getRentDate: "", getRentTime: ""});
    const [rentHist, setRentHist] = useState([]);
    const [infoData, setInfoData] = useState(null);
    const [infoTitle, setInfoTitle] = useState("");
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
// 4. 커스텀 훅
    const {searchTerm, setSearchTerm, handleSearch} = useSearch(`${SERVER_URL}rent`, setRentHist, undefined, memId);
// 상수
    const itemsPerPage = 10;
    const SEARCH_OPTIONS = [
        {value: 'spaceName', label: '공간명', type: 'text'},
        ...(isAdmin ? [
            {value: 'memId', label: '회원 ID', type: 'text'}
        ] : []),
        {
            value: 'applyStatus', label: '신청 상태', type: 'select', options: [
                {label: "대기", value: "WAIT"},
                {label: "승인", value: "APPROVE"},
                {label: "거부", value: "REJECT"}
            ]
        },
        {
            value: 'payStatus', label: '결제 상태', type: 'select', options: [
                {label: "대기", value: "WAIT"},
                {label: "완료", value: "COMPLETE"},
            ]
        },
    ];

    const rentHistUrl = isAdmin ? SERVER_URL + 'rent' : SERVER_URL + `rent/search/memId/${memId}/${memId}`;

    const {data: rawRentHistData, loading: RentHistLoading} = useFetch(rentHistUrl, []);

    useEffect(() => {
        if (!RentHistLoading && rawRentHistData) {
            const formattedData = rawRentHistData.map((item) => ({
                id: item.rentHistNum, ...item
            }));
            setRentHist(formattedData.reverse());
        }
    }, [rawRentHistData, RentHistLoading]);


    const handleStatusChange = (rentHistNum, newStatus) => {
        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({status: newStatus})
        };

        fetch(SERVER_URL + 'rent/' + rentHistNum, requestOptions)
            .then(response => {
                if (response.ok) {
                    const updatedRows = rentHist.map(row =>
                        row.rentHistNum === rentHistNum ? {...row, status: newStatus} : row
                    );
                    setRentHist(updatedRows);
                    alert('신청 상태를 변경 했습니다!');
                } else {
                    throw new Error();
                }
            })
            .catch(error => {
                console.error("Error updating status:", error);
                alert('신청 상태 변경 중 문제가 발생했습니다.');
            });
    }

    const handleDelete = (rentHistNum) => {
        const isConfirmed = window.confirm("정말 취소 하시겠습니까?");
        if (!isConfirmed) return;

        fetch(SERVER_URL + 'rent/' + rentHistNum, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    const updatedRows = rentHist.filter(row => row.rentHistNum !== rentHistNum);
                    setRentHist(updatedRows);
                    alert('성공적으로 취소 했습니다!');
                } else {
                    throw new Error();
                }
            })
            .catch(error => {
                console.error("Error deleting eduHist:", error);
                alert('취소 중 문제가 발생했습니다.');
            });
    }


    const handlePageChange = (event, newPage) => {
        navigate(`${location.pathname}?page=${newPage}`);
        setActivePage(newPage);
    }

    const handlePermitPrint = (applyStatus, payStatus, spaceName, getRentDate, getRentTime) => {
        if (applyStatus === 'APPROVE' && payStatus === 'COMPLETE') {
            setCurrentPermitData({spaceName, getRentDate, getRentTime});
            setIsPermitOpen(true);
        } else {
            alert('대여 승인 및 결제 완료 후 출력이 가능합니다!');
        }
    };

    const handleSpaceClick = (space) => {
        setInfoTitle("공간 정보");
        setInfoData(space);
        setIsInfoModalOpen(true);
    };

    const handleMemIdClick = (member) => {
        if (isAdmin) {
            setInfoTitle("회원 정보");
            setInfoData(member);
            setIsInfoModalOpen(true);
        }
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

    const columns = [
        {field: 'rentHistNum', headerName: '번호', width: 40},
        {
            field: 'spaceName',
            headerName: '공간명',
            width: 100,
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
            field: 'memId',
            headerName: '회원 ID',
            width: 100,
            renderCell: (row) => (
                <span
                    onClick={() => handleMemIdClick(row.row.member)}
                    style={{cursor: isAdmin ? "pointer" : "default"}}
                >
                {row.row.member?.memId || ''}
            </span>
            )
        },
        {
            field: 'rentDate',
            headerName: '대여 일',
            width: 100,
            renderCell: getRentDate
        },
        {
            field: 'rentTime',
            headerName: '대여 시간',
            width: 150,
            renderCell: getRentTime
        },
        {
            field: 'applyDate',
            headerName: '신청 일시',
            width: 150,
            renderCell: ApplyDateCell
        },
        {
            field: 'applyStatus',
            headerName: '신청 상태',
            width: 100,
            renderCell: (params) => <StatusCell params={params} handleStatusChange={handleStatusChange}/>
        },
        {
            field: 'payStatus',
            headerName: '결제 상태',
            width: 100,
            renderCell: payStatusCell,
        },
        {
            field: 'permit',
            headerName: '허가증',
            width: 70,
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
        {
            field: 'cancel',
            headerName: '취소',
            width: 40,
            renderCell: (params) => (
                <button onClick={() => handleDelete(params.row.rentHistNum)}>
                    취소
                </button>
            ),
        }
    ];

    return (
        <Wrapper style={{textAlign: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <SearchComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    searchOptions={SEARCH_OPTIONS}
                    totalCount={rentHist.length}
                    currentPage={activePage}
                    totalPages={Math.ceil(rentHist.length / itemsPerPage)}
                />
                {RentHistLoading ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '200px'
                    }}>로딩중...</div>
                ) : (
                    <StyledDataGrid
                        columns={columns}
                        rows={rentHist.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)}
                        pageSize={5}
                        hideFooter={true}
                    />
                )}
                <div className="paginationContainer" style={{marginTop: '10px'}}>
                    <Pagination
                        count={Math.ceil(rentHist.length / itemsPerPage)}
                        page={activePage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </div>
            </div>
            <Permit
                isOpen={isPermitOpen}
                onClose={() => setIsPermitOpen(false)}
                spaceName={currentPermitData.spaceName}
                getRentDate={currentPermitData.getRentDate}
                getRentTime={currentPermitData.getRentTime}
            />
            <InfoModal
                title={infoTitle}
                data={infoData}
                open={isInfoModalOpen}
                onClose={() => setIsInfoModalOpen(false)}
            />
        </Wrapper>
    );
}

const StyledScrollHideDiv = styled.div`
  max-height: 50px;
  overflow-y: auto;
  width: 100%;
  scrollbar-width: none; // Firefox
  -ms-overflow-style: none; // IE and Edge

  &::-webkit-scrollbar {
    display: none; // Chrome, Safari, and Opera
  }
`;

const Wrapper = styled.div`
  width: fit-content;
  margin: 0 auto; // 중앙 정렬을 위한 스타일
`;

const StyledDataGrid = styled(DataGrid)`

  width: 100%;

  & .MuiDataGrid {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .MuiDataGrid-columnHeader {
    background-color: #ececec; // 옅은 회색으로 설정
  }

  & .MuiDataGrid-columnHeaderTitle {
    font-size: 14px;
  }

  & .MuiDataGrid-columnHeaderTitleContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 10px;
  }

  & .MuiDataGrid-cell {
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    padding: 3px 5px;
    margin: 0 5px;
    border: none;
    cursor: pointer;
    background-color: #3498db;
    color: white;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #2980b9;
    }
  }

  & .MuiDataGrid-cell[data-field="eduName"] {
    justify-content: left;
  }

  & .typeCell {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;

    &.BUSINESS {
      color: #855cdc;
    }

    &.EDU {
      color: #1e6bfa;
    }
  }

  & .eduNameCell {
    cursor: pointer;
    white-space: nowrap; // 내용을 한 줄에 표시
    overflow: hidden; // 내용이 넘치면 숨김
    text-overflow: ellipsis; // 넘치는 내용을 '...'로 표시
    max-width: 280px; // 셀의 최대 너비. 필요에 따라 조절하세요.
  }

  & .statusCell {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    border-radius: 3px;

    &.WAITING {
      background-color: #a38ced;
      color: white; // 글자 색상 추가
    }

    &.PROCESSING {
      background-color: #53468b;
      color: white; // 글자 색상 추가
    }

    &.REGISTRATION_CLOSED {
      background-color: gray;
      color: white; // 글자 색상 추가
    }

    &.REGISTRATION_OPEN {
      background-color: #5ae507;
      color: white; // 글자 색상 추가
    }
  }
`;

export default RentHistList;