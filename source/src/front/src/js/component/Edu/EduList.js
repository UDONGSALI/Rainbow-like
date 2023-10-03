// 1. React 관련
import React, {useEffect, useState} from "react";
// 2. 외부 라이브러리 관련
import {DataGrid} from "@mui/x-data-grid";
import styled from '@emotion/styled';
import {Pagination} from "@mui/material";
// 3. 프로젝트 내 공통 모듈 관련
import {SERVER_URL} from '../Common/constants';
import {useLocation, useNavigate} from 'react-router-dom';
// 4. 컴포넌트 관련
import SearchComponent from "../Common/SearchComponent";
// 5. 훅 관련
import useSearch from "../hook/useSearch";
import usePagination from "../hook/usePagination";
import useFetch from "../hook/useFetch";
// 6. Helper 함수나 Renderer 관련
import {renderStatusCell} from "./statusRenderer";

function EduList() {
    // 1. 상수 및 상태
    const itemsPerPage = 10;
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";
    const SEARCH_OPTIONS = [
        {label: "프로그램명", value: "eduName", type: "text"},
        {
            label: "구분",
            value: "type",
            type: "select",
            options: [
                {label: "교육", value: "EDU"},
                {label: "사업", value: "BUSINESS"}
            ]
        },
        {label: "내용", value: "content", type: "text"},
        {
            label: "접수 방법",
            value: "recuMethod",
            type: "select",
            options: [
                {label: "관리자 승인", value: "ADMIN_APPROVAL"},
                {label: "선착순 모집", value: "FIRST_COME"}
            ]
        }
    ];

    // 2. Router Hooks
    const navigate = useNavigate();
    const location = useLocation();
    // 3. 로컬 상태 관리
    const [edus, setEdus] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    // 4. 커스텀 훅 사용
    const {activePage, setActivePage} = usePagination(1);
    const {searchTerm, setSearchTerm, handleSearch} = useSearch(`${SERVER_URL}edus`, setEdus);
    const {data: fetchedEdus, loading} = useFetch(`${SERVER_URL}edus`);

    useEffect(() => {
        if (!loading) {
            setEdus(fetchedEdus.reverse());
            setTotalPages(Math.ceil(fetchedEdus.length / itemsPerPage));
        }
    }, [loading, fetchedEdus]);

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(location.search);
        const currentActivePage = urlSearchParams.get("page");
        if (currentActivePage) {
            setActivePage(parseInt(currentActivePage));
        }
    }, [location.search]);

    const handlePageChange = (event, newPage) => {
        navigate(`${location.pathname}?page=${newPage}`);
        setActivePage(newPage);
    }

    const handleTitleClick = (eduNum) => navigate('/edu/list/detail/' + eduNum);
    const handleEdit = (eduNum) => navigate('/admin/edu/edit/' + eduNum);

    const EduDelete = (eduNum) => {
        if (window.confirm("정말 삭제 하시겠습니까?")) {
            fetch(`${SERVER_URL}api/edus/${eduNum}`, {method: 'DELETE'})
                .then(() => {
                    const updatedRows = edus.filter(row => row.eduNum !== eduNum);
                    setEdus(updatedRows);
                    alert(`데이터가 삭제 되었습니다.`);
                })
                .catch(err => {
                    console.error(err);
                    alert('삭제 중 오류가 발생했습니다.');
                });
        }
    };

    const columns = [
        {
            field: 'eduNum',
            headerName: '번호',
            renderCell: (row) => (
                <div>{row.id}</div>
            ),
            width: 30
        },
        {
            field: 'type',
            headerName: '구분',
            width: 30,
            renderCell: (row) => (
                <div className={`typeCell ${row.value}`}>
                    {row.value === 'BUSINESS' ? '사업' :
                        row.value === 'EDU' ? '교육' : ''}
                </div>
            ),
        },
        {
            field: 'eduName',
            headerName: '프로그램명',
            width: 300,
            renderCell: (row) => (
                <div onClick={() => handleTitleClick(row.id)} className="eduNameCell">
                    {row.value}
                </div>
            ),
        },
        {
            field: 'recuMethod',
            headerName: '접수 방법',
            width: 100,
            renderCell: (row) => (
                <div>
                    {row.value === 'ADMIN_APPROVAL' ? '관리자 승인' :
                        row.value === 'FIRST_COME' ? '선착순 모집' : row.value}
                </div>
            ),
        },
        {
            field: 'recuStdt~recuEddt',
            headerName: '모집 기간',
            width: 170,
            valueGetter: (params) => {
                return `${params.row.recuStdt}~${params.row.recuEddt}`;
            },
        },
        {
            field: 'recuPerson+/+capacity',
            headerName: '신청인/정원',
            width: 100,
            valueGetter: (params) => {
                return `${params.row.recuPerson}/${params.row.capacity}`;
            },
        },
        {
            field: 'status',
            headerName: '상태',
            width: 80,
            renderCell: (params) => renderStatusCell(params.row),
        },
        ...(isAdmin ? [
            {
                field: 'edit',
                headerName: '수정',
                sortable: false,
                filterable: false,
                renderCell: (row) => (
                    <button onClick={() => handleEdit(row.id)}>수정</button>
                ),
                width: 60,
            },
            {
                field: 'delete',
                headerName: '삭제',
                sortable: false,
                filterable: false,
                renderCell: (row) => (
                    <button onClick={() => EduDelete(row.id)}>삭제</button>
                ),
                width: 60,
            },
        ] : []),
    ];

    return (
        <Wrapper style={{textAlign: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <SearchComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    searchOptions={SEARCH_OPTIONS}
                    totalCount={edus.length}
                    currentPage={activePage}
                    totalPages={Math.ceil(edus.length / itemsPerPage)}
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
                        rows={edus.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)}
                        getRowId={(row) => row.eduNum}
                        hideFooter={true}
                    />
                )}
                <div className="paginationContainer" style={{marginTop: '10px'}}>
                    <Pagination
                        count={Math.ceil(edus.length / itemsPerPage)}
                        page={activePage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </div>
            </div>
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

export default EduList;