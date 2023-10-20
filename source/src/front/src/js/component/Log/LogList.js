// 1. React 관련
import React, {memo, useEffect, useState} from "react";
// 2. 외부 라이브러리 관련
import {DataGrid} from "@mui/x-data-grid";
import styled from '@emotion/styled';
// 3. 프로젝트 내 공통 모듈 관련
import {SERVER_URL} from '../Common/constants';
import {useLocation, useNavigate} from 'react-router-dom';
// 4. 컴포넌트 관련
import SearchComponent from "../Common/SearchComponent";
import Pagination from "../Common/Pagination";
// 5. 훅 관련
import useSearch from "../hook/useSearch";
import usePagination from "../hook/usePagination";
import useFetch from "../hook/useFetch";

// 1. 상수 및 상태
const itemsPerPage = 10;
const SEARCH_OPTIONS = [
    {
        label: "유형",
        value: "type",
        type: "select",
        options: [
            {label: "PageView", value: "PageView"},
            {label: "ButtonClick", value: "ButtonClick"}
        ]
    },
    {
        value: 'memType',
        label: '회원 유형',
        type: 'select',
        options: [
            { value: 'ADMIN', label: '관리자' },
            { value: 'USER', label: '일반 회원' },
            { value: 'LABOR', label: '노무사' },
            { value: 'COUNSELOR', label: '상담사' }
        ]
    },
    {label: "회원 ID", value: "memId", type: "text"},
    {label: "URL", value: "url", type: "text"},
];
function LogList() {
    // 2. Router Hooks
    const navigate = useNavigate();
    const location = useLocation();
    // 3. 로컬 상태 관리
    const [logs, setLogs] = useState([]);
    // 4. 커스텀 훅 사용
    const {activePage, setActivePage} = usePagination(1);
    const {searchTerm, setSearchTerm, handleSearch} = useSearch(`${SERVER_URL}log`, setLogs);
    const {data: fetchedLogs, loading} = useFetch(`${SERVER_URL}log`);

    useEffect(() => {
        if (!loading) {
            setLogs(fetchedLogs.reverse());
        }
    }, [loading, fetchedLogs]);

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
            field: 'logNum',
            headerName: '번호',
            width: 60,
        },
        {
            field: 'type',
            headerName: '유형',
            width: 100
        },
        {
            field: 'memId', // member.memId의 값을 직접 접근하기 어려울 수 있습니다.
            headerName: '회원 ID',
            width: 100,
            renderCell: (row) => row.row.member?.memId || ''
        },
        {
            field: 'memType',
            headerName: '회원 유형',
            width: 100,
            renderCell: (row) => getMemTypeLabel(row.row.member?.type) || ''
        },
        {
            field: 'url',
            headerName: 'URL',
            width: 250
        },
        {
            field: 'label',
            headerName: 'Label',
            width: 200
        },
        {
            field: 'date',
            headerName: '날짜',
            width: 100,
            valueGetter: (params) => formatDate(params.row.createdAt)
        },
        {
            field: 'time',
            headerName: '시간',
            width: 100,
            valueGetter: (params) => formatTime(params.row.createdAt)
        },
    ].map(col => ({ ...col, sortable: false }));

    return (
        <Wrapper style={{textAlign: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <SearchComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    searchOptions={SEARCH_OPTIONS}
                    totalCount={logs.length}
                    currentPage={activePage}
                    totalPages={Math.ceil(logs.length / itemsPerPage)}
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
                        rows={logs.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)}
                        getRowId={(row) => row.logNum}
                        hideFooter
                        disableColumnMenu
                    />
                )}
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={logs.length}
                        pageRangeDisplayed={10}
                        onChange={handlePageChange}
                        prevPageText="<"
                        nextPageText=">"
                    />
            </div>
        </Wrapper>
    );
}

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

export default memo(LogList);