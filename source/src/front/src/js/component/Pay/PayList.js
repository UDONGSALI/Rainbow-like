// 1. React 관련
import React, {useEffect, useState} from "react";
// 2. 외부 라이브러리 관련
import {DataGrid} from "@mui/x-data-grid";
import styled from '@emotion/styled';
// 3. 프로젝트 내 공통 모듈 관련
import {SERVER_URL} from '../Common/constants';
import {useLocation, useNavigate} from 'react-router-dom';
// 4. 컴포넌트 관련
import SearchComponent from "../Common/SearchComponent";
import InfoModal from "../Common/InfoModal";
import Pagination from "../Common/Pagination";
// 5. 훅 관련
import useSearch from "../hook/useSearch";
import usePagination from "../hook/usePagination";
import useFetch from "../hook/useFetch";
import DateCell from "../Common/DateCell";
import CurrencyCell from "./RenderCell/CurrencyCell";

function PayList() {
    // 1. 상수 및 상태
    const itemsPerPage = 10;
    const SEARCH_OPTIONS = [
        {label: "대여 번호", value: "rentHistNum", type: "number"},
        {label: "공간명", value: "spaceName", type: "text"},
        {label: "회원 ID", value: "memId", type: "text"},
    ];

    // 2. Router Hooks
    const navigate = useNavigate();
    const location = useLocation();
    // 3. 로컬 상태 관리
    const [pays, setPays] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [infoData, setInfoData] = useState(null);
    const [infoTitle, setInfoTitle] = useState("");
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    // 4. 커스텀 훅 사용
    const {activePage, setActivePage} = usePagination(1);
    const {searchTerm, setSearchTerm, handleSearch} = useSearch(`${SERVER_URL}pay`, setPays);
    const {data: fetchedPays, loading} = useFetch(`${SERVER_URL}pay`);

    useEffect(() => {
        if (!loading) {
            setPays(fetchedPays.reverse());
            setTotalPages(Math.ceil(fetchedPays.length / itemsPerPage));
        }
    }, [loading, fetchedPays]);

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(location.search);
        const currentActivePage = urlSearchParams.get("page");
        if (currentActivePage) {
            setActivePage(parseInt(currentActivePage));
        }
    }, [location.search]);

    const handlePageChange = (newPage) => {
        navigate(`${location.pathname}?page=${newPage}`);
        setActivePage(newPage);
    }

    const handleRentHistNumClick = (rentHist) => {
        setInfoTitle("대여 정보");
        setInfoData(rentHist);
        setIsInfoModalOpen(true);
    };

    const handleSpaceClick = (space) => {
        setInfoTitle("공간 정보");
        setInfoData(space);
        setIsInfoModalOpen(true);
    };

    const handleMemIdClick = (member) => {
        setInfoTitle("회원 정보");
        setInfoData(member);
        setIsInfoModalOpen(true);
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    const formatTime = (dateStr) => {
        const date = new Date(dateStr);
        return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    };

    const getMemTypeLabel = (typeValue) => {
        const option = SEARCH_OPTIONS.find(option => option.value === 'memType').options.find(opt => opt.value === typeValue);
        return option ? option.label : typeValue;
    };

    const columns = [
        {
            field: 'payHistNum',
            headerName: '번호',
            width: 50, // 임의의 폭 값 설정
        },
        {
            field: 'rentHistNum',
            headerName: '대여 번호',
            width: 100,
            renderCell: (row) => (
                <span
                    onClick={() => handleRentHistNumClick(row.row.rentHist)}
                    style={{cursor: "pointer"}}
                >
                {row.row.rentHist?.rentHistNum || ''}
            </span>
            )
        },
        {
            field: 'spaceName',
            headerName: '공간명',
            width: 150,
            renderCell: (row) => (
                <span
                    onClick={() => handleSpaceClick(row.row.rentHist.space)}
                    style={{cursor: "pointer"}}
                >
                {row.row.rentHist.space?.spaceName || ''}
            </span>
            )
        },
        {
            field: 'memId',
            headerName: '회원 ID',
            width: 100,
            renderCell: (row) => (
                <span
                    onClick={() => handleMemIdClick(row.row.rentHist.member)}
                    style={{cursor: "pointer"}}
                >
                {row.row.rentHist.member?.memId || ''}
            </span>
            )
        },
        {
            field: 'fee',
            headerName: '결제 금액',
            width: 100,
            renderCell: CurrencyCell
        },
        {
            field: 'payDate',
            headerName: '결제일시',
            width: 150,
            renderCell:DateCell
        },
    ];

    return (
        <Wrapper style={{textAlign: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <SearchComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    searchOptions={SEARCH_OPTIONS}
                    totalCount={pays.length}
                    currentPage={activePage}
                    totalPages={Math.ceil(pays.length / itemsPerPage)}
                />
                {loading ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '200px'
                    }}>로딩중...</div>
                ) : (
                    <StyledDataGrid
                        columns={columns}
                        rows={pays.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)}
                        getRowId={(row) => row.payHistNum}
                        hideFooter={true}
                    />
                )}
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={pays.length}
                    pageRangeDisplayed={10}
                    onChange={handlePageChange}
                    prevPageText="<"
                    nextPageText=">"
                />
            </div>
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

export default PayList;