import React, { useEffect, useState } from "react";
import { SERVER_URL } from '../Common/constants';
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useSearchParams, useLocation   } from 'react-router-dom';
import styled from '@emotion/styled';
import {Pagination} from "@mui/material";
import SearchComponent from "../Common/SearchComponent";

function EduList() {
    // 1. 상수 및 useState Hooks
    const navigate = useNavigate();
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";
    const itemsCountPerPage = 10;
    const [edus, setEdus] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState({ term: '', value: 'eduName' });
    const [filteredEdus, setFilteredEdus] = useState([]);
    const location = useLocation();



    const VALUE_TO_LABEL_MAPPING = {
        "EDU": "교육",
        "BUSINESS": "사업",
        "ADMIN_APPROVAL": "관리자 승인",
        "FIRST_COME": "선착순 모집"
    };

    // 2. useEffect Hooks
    useEffect(() => {
        if(edus.length) {
            setFilteredEdus(edus);
        }
    }, [edus]);

    useEffect(() => {
        fetchEdus();
    }, [activePage]);

    useEffect(() => {
        // useSearchParams 대신 useLocation 사용
        const urlSearchParams = new URLSearchParams(location.search);
        const currentActivePage = urlSearchParams.get("page");
        if (currentActivePage) {
            setActivePage(parseInt(currentActivePage));
        }
    }, [location.search]);

    // 3. Helper 함수 및 Event Handlers
    const fetchEdus = () => {
        fetch(`${SERVER_URL}api/edus?page=0&size=1000000`)
            .then((res) => res.json())
            .then((data) => {
                const formattedEdus = data._embedded.edus.map((edu) => ({
                    id: edu._links.edu.href,
                    ...edu,
                }));
                setEdus(formattedEdus);

                // 여기서 totalCount와 totalPages 상태를 업데이트합니다.
                setTotalCount(formattedEdus.length);
                setTotalPages(Math.ceil(formattedEdus.length / itemsCountPerPage));
            })
            .catch((err) => console.error(err));
    };

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
        fetchEdus(pageNumber);
        navigate({ pathname: location.pathname, search: `page=${pageNumber}` });
    };

    const handleTitleClick = (eduNum) => {
        navigate('/edu/detail/' + eduNum.split('/').pop());
    };

    const handleEdit = (eduNum) => {
        navigate('/admin/edu/edit/' + eduNum.split('/').pop());
    };

    const EduDelete = (url) => {
        // 해당 edu의 정보를 먼저 찾습니다.
        const eduToDelete = edus.find(edu => edu._links.edu.href === url);
        const eduName = eduToDelete?.eduName || "Unknown Program";

        fetch(url, { method: 'DELETE' })
            .then(() => {
                fetchEdus();
                // 삭제가 완료된 후에 알림을 표시합니다.
                alert(`${eduName} 데이터가 삭제 되었습니다.`);
            })
            .catch(err => {
                console.error(err);
                alert('삭제 중 오류가 발생했습니다.');
            });
    };

    const paginatedEdus = filteredEdus.slice((activePage - 1) * itemsCountPerPage, activePage * itemsCountPerPage);

    const handleSearch = () => {
        const filtered = edus.filter(edu => {
            // 검색 대상 필드 값
            const targetValue = edu[searchTerm.value];

            // 'type' 또는 'recuMethod'으로 검색하는 경우, 라벨로 검색
            if (searchTerm.value === "type" || searchTerm.value === "recuMethod") {
                const targetLabel = VALUE_TO_LABEL_MAPPING[targetValue];
                return targetLabel ? targetLabel.toLowerCase().includes(searchTerm.term.toLowerCase()) : false;
            }

            // 기본적인 텍스트 포함 검색
            return targetValue?.toLowerCase().includes(searchTerm.term.toLowerCase());
        });

        setFilteredEdus(filtered);
        setTotalPages(Math.ceil(filtered.length / itemsCountPerPage));
        setTotalCount(filtered.length);
        setActivePage(1);
    };

    const getColumns = () => {
        const baseColumns = [
            {
                field: '_links.edu.href',
                headerName: '번호',
                renderCell: (row) => (
                    <div>{row.id.split('/').pop()}</div>
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
                renderCell: (params) => {
                    const currentDate = new Date();
                    const recuStdt = new Date(params.row.recuStdt);
                    const recuEddt = new Date(params.row.recuEddt);
                    const eduStdt = new Date(params.row.eduStdt);
                    const eduEddt = new Date(params.row.eduEddt);
                    const recuPerson = params.row.recuPerson;
                    const capacity = params.row.capacity;

                    let statusText = "기타 상태";
                    let statusClass = "statusCell";

                    if (currentDate < recuStdt) {
                        statusText = '접수 대기';
                        statusClass += ' WAITING';
                    } else if (currentDate >= recuStdt && currentDate <= recuEddt) {
                        if (recuPerson >= capacity) {
                            statusText = '접수 마감';
                            statusClass += ' REGISTRATION_CLOSED';
                        } else {
                            statusText = '접수 중';
                            statusClass += ' REGISTRATION_OPEN';
                        }
                    } else if (currentDate >= eduStdt && currentDate <= eduEddt) {
                        statusText = params.row.type === 'BUSINESS' ? '사업 중' : '교육 중';
                        statusClass += ' PROCESSING';
                    } else if (currentDate > recuEddt && currentDate < eduEddt) {
                        statusText = params.row.type === 'BUSINESS' ? '사업 대기' : '교육 대기';
                        statusClass += ' WAITING';
                    } else if (currentDate >= eduEddt) {
                        statusText = params.row.type === 'BUSINESS' ? '사업 종료' : '교육 종료';
                        statusClass += ' ENDED';  // 변경된 부분
                    }

                    return (
                        <div className={statusClass}>
                            {statusText}
                        </div>
                    );
                },
            },
        ];

        if (isAdmin) {
            baseColumns.push(
                {
                    field: '_links.self.href.delete',
                    headerName: '삭제',
                    sortable: false,
                    filterable: false,
                    renderCell: (row) => (
                        <button onClick={() => EduDelete(row.id)}>삭제</button>
                    ),
                    width: 60,
                },
                {
                    field: '_links.self.href.edit',
                    headerName: '수정',
                    sortable: false,
                    filterable: false,
                    renderCell: (row) => (
                        <button onClick={() => handleEdit(row.id)}>수정</button>
                    ),
                    width: 60,
                },
            );
        }
        return baseColumns;
    };

    const columns = getColumns();

    const SEARCH_OPTIONS = [
        { label: "프로그램명", value: "eduName" },
        { label: "구분", value: "type" },
        { label: "내용", value: "content" },
        { label: "접수 방법", value: "recuMethod" } // 추가된 부분
    ];



    return (
        <Wrapper style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <SearchComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    totalCount={totalCount}
                    currentPage={activePage}
                    totalPages={totalPages}
                    searchOptions={SEARCH_OPTIONS}
                    onSearch={handleSearch}
                />
                <StyledDataGrid
                    columns={columns}
                    rows={paginatedEdus}
                    hideFooter={true}
                />
                <div className="paginationContainer" style={{ marginTop: '10px' }}>
                    <Pagination
                        className="pagination"
                        count={totalPages}
                        page={activePage}
                        onChange={(event, newPage) => handlePageChange(newPage)}
                        color="primary"
                        showFirstButton
                        showLastButton
                    />
                </div>
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
    border: none;
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
