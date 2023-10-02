// 1. React 관련
import React, {useEffect, useState} from "react";
// 2. 외부 라이브러리 관련
import { DataGrid } from "@mui/x-data-grid";
import styled from "@emotion/styled";
import { Pagination } from "@mui/material";
// 3. 프로젝트 내 공통 모듈 관련
import { SERVER_URL } from "../Common/constants";
import { useLocation, useNavigate } from "react-router-dom";
// 4. 컴포넌트 관련
import SearchComponent from "../Common/SearchComponent";
import NavigationButton from "../Common/NavigationButton";
import OrgForm from "./OrgForm";
// 5. 훅 관련
import useSearch from "../hook/useSearch";
import usePagination from "../hook/usePagination";
import useFetch from "../hook/useFetch";

function OrgList() {
    // 상수 및 상태 정의
    const itemsPerPage = 10;
    const SEARCH_OPTIONS = [
        {label: "기관명", value: "name", type: "text"},
        {label: "주소", value: "addr", type: "text"},
    ];
    // Router Hooks
    const navigate = useNavigate();
    const location = useLocation();
    // 로컬 상태 관리
    const [orgs, setOrgs] = useState([]);
    const [selectedOrg, setSelectedOrg] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    // 커스텀 훅 사용
    const { activePage, setActivePage } = usePagination(1);
    const { searchTerm, setSearchTerm, handleSearch } = useSearch(`${SERVER_URL}org`,setOrgs);
    const { data: fetchedOrgs, loading } = useFetch(`${SERVER_URL}org`);

    useEffect(() => {
        if (!loading) {
            setOrgs(fetchedOrgs.reverse());
        }
    }, [loading, fetchedOrgs]);

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
    };

    const handleEdit = (orgNum) => {
        const org = orgs.find((o) => o.orgNum === orgNum);
        handleOpenModal(org);
    };

    const handleOpenModal = (org) => {
        setSelectedOrg(org);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedOrg(null);
        setOpenModal(false);
    };

    const handleAddOrg = () => {
        setSelectedOrg(null);
        handleOpenModal();
    };

    const handleOrgUpdate = (updatedOrg) => {
        const updatedOrgs = orgs.map((org) =>
            org.orgNum === updatedOrg.orgNum ? updatedOrg : org
        );
        setOrgs(updatedOrgs);
    };

    const orgDelete = (orgNum) => {
        if (window.confirm("정말 삭제 하시겠습니까?")) {
            fetch(`${SERVER_URL}org/${orgNum}`, { method: "DELETE" })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response;
                })
                .then(() => {
                    const updatedRows = orgs.filter((row) => row.orgNum !== orgNum);
                    setOrgs(updatedRows);
                    alert(`데이터가 삭제 되었습니다.`);
                })
                .catch((err) => {
                    console.error(err);
                    alert("삭제 중 오류가 발생했습니다.");
                });
        }
    };

    const columns = [
        {field: 'orgNum', headerName: '번호', width: 30},
        {field: 'name', headerName: '기관명', width: 200},
        {
            field: 'url',
            headerName: '웹사이트',
            width: 250,
            renderCell: (params) => (
                <a href={params.value} target="_blank" rel="noopener noreferrer">
                    {params.value}
                </a>
            )
        },
        {field: 'tel', headerName: '전화번호', width: 100},
        {field: 'addr', headerName: '주소', width: 250},
        {field: 'addrDtl', headerName: '세부 주소', width: 150},
        {field: 'addrPost', headerName: '우편 번호', width: 100},
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
                <button onClick={() => orgDelete(row.id)}>삭제</button>
            ),
            width: 60,
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
                    totalCount={orgs.length}
                    currentPage={activePage}
                    totalPages={Math.ceil(orgs.length / itemsPerPage)}
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
                        rows={orgs.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)}
                        getRowId={(row) => row.orgNum}
                        hideFooter={true}
                    />
                )}
                <div className="paginationContainer" style={{marginTop: '10px'}}>
                    <Pagination
                        count={Math.ceil(orgs.length / itemsPerPage)}
                        page={activePage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </div>
                <OrgForm
                    org={selectedOrg}
                    open={openModal}
                    onClose={handleCloseModal}
                    onUpdate={handleOrgUpdate}
                />
            </div>
            <NavigationButton name="기관 추가" onClick={handleAddOrg} fontSize={'6px'} />
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

export default OrgList;