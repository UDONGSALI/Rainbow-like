import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { SERVER_URL } from "../Common/constants";
import { useNavigate, useLocation } from "react-router-dom";
import styled from '@emotion/styled';
import Pagination from "@mui/material/Pagination";
import SearchComponent from "../Common/SearchComponent";

function EduApplyList(props) {
    // 1. 초기 상태 및 Hooks 설정
    const [eduApply, setEduApply] = useState([]);
    const navigate = useNavigate();
    const { memId } = props;
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";
    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 10;
    const [searchTerm, setSearchTerm] = useState({ term: '', value: 'eduName' });
    const totalPageCount = Math.ceil(eduApply.length / itemsPerPage);
    const location = useLocation();

    useEffect(() => {
        let apiUrl;
        if (isAdmin) {
            apiUrl = SERVER_URL + 'eduHist';
        } else {
            apiUrl = SERVER_URL + `eduHist/memid/${memId}`;
        }

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const formattedData = data.map((item, index) => ({ id: index + 1, ...item }));
                setEduApply(formattedData);
            })
            .catch(error => console.error("Error fetching eduApply:", error));
    }, [memId, isAdmin]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const pageFromUrl = parseInt(params.get('page'), 10);

        if (!isNaN(pageFromUrl)) {
            setActivePage(pageFromUrl);
        }
    }, [location.search]);

    const handleTitleClick = (eduNum) => {
        navigate(`/edu/detail/${eduNum}`);
    }

    const handleStatusChange = (rowId, newStatus) => {
        // 서버에 PUT 요청을 보내서 데이터 업데이트
        fetch(SERVER_URL + 'eduHist/' + (rowId + 1), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status: newStatus}) // 여기서 전송하고 싶은 데이터를 설정하세요.
        })
            .then(response => {
                if (response.ok) {
                    // 프론트엔드 데이터 업데이트
                    const updatedRows = eduApply.map(row =>
                        row.id === rowId ? {...row, status: newStatus} : row
                    );
                    setEduApply(updatedRows);
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error("Error updating status:", error);
                // 여기서 사용자에게 오류 메시지를 보여주거나 다른 처리를 할 수 있습니다.
            });
    }

    const handleDelete = (rowId) => {
        // 서버에 DELETE 요청을 보내서 해당 EduHist 삭제
        fetch(SERVER_URL + 'eduHist/' + (rowId + 1), {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    // 프론트엔드 데이터 업데이트
                    const updatedRows = eduApply.filter(row => row.id !== rowId);
                    setEduApply(updatedRows);
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error("Error deleting eduHist:", error);
                // 여기서 사용자에게 오류 메시지를 보여주거나 다른 처리를 할 수 있습니다.
            });
    }

    const handleSearch = () => {
        let apiUrl = `${SERVER_URL}eduHist/search/${searchTerm.value}/${searchTerm.term}/${memId}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const formattedData = data.map((item, index) => ({ id: index + 1, ...item }));
                setEduApply(formattedData);
            })
            .catch(error => console.error("Error fetching search results:", error));
    };

    const handlePageChange = (event, newPage) => {
        navigate(`${location.pathname}?page=${newPage}`);
        setActivePage(newPage);
    }

    const getCurrentPageData = () => {
        const startIndex = (activePage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return eduApply.slice(startIndex, endIndex);
    }

    const baseSearchOptions = [
        { value: 'eduName', label: '프로그램명' },
        { value: 'status', label: '승인 상태' }
    ];

    const adminSearchOption = { value: 'memId', label: '신청자' };

    const searchOptions = isAdmin ? [...baseSearchOptions, adminSearchOption] : baseSearchOptions;

    const columns = [
        {field: 'id', headerName: '번호', width: 30},
        {
            field: 'type',
            headerName: '구분',
            width: 30,
            renderCell: (row) => (
                <div className={`typeCell ${row.row.edu.type}`}>
                    {row.row.edu.type === 'BUSINESS' ? '사업' :
                        row.row.edu.type === 'EDU' ? '교육' : ''}
                </div>
            ),
        },
        {
            field: 'eduName',
            headerName: '프로그램명',
            width: 300,
            renderCell: (params) => (
                <div onClick={() => handleTitleClick(params.row.id)} style={{cursor: 'pointer'}}
                     className="eduNameCell">
                    {params.row.edu?.eduName}
                </div>
            ),
        },
        {
            field: 'recuPerson+/+capacity',
            headerName: '신청인/정원',
            width: 100,
            valueGetter: (params) => {
                return `${params.row.edu?.recuPerson}/${params.row.edu?.capacity}`;
            },
        },
        {
            field: 'eduStatus',
            headerName: '교육 상태',
            width: 100,
            renderCell: (params) => {
                const currentDate = new Date();
                const recuStdt = new Date(params.row.edu?.recuStdt); // 모집 시작일
                const recuEddt = new Date(params.row.edu?.recuEddt); // 모집 종료일
                const eduStdt = new Date(params.row.edu?.eduStdt);   // 교육 시작일
                const eduEddt = new Date(params.row.edu?.eduEddt);   // 교육 종료일
                const recuPerson = params.row.edu?.recuPerson;      // 신청자 수
                const capacity = params.row.edu?.capacity;          // 정원

                let eduStatusText;
                let eduStatusClass = "eduStatusCell";

                if (currentDate < recuStdt) {
                    eduStatusText = '접수 대기';
                    eduStatusClass += ' WAITING';
                } else if (currentDate >= recuStdt && currentDate <= recuEddt) {
                    if (recuPerson >= capacity) {
                        eduStatusText = '접수 마감';
                        eduStatusClass += ' REGISTRATION_CLOSED';
                    } else {
                        eduStatusText = '접수 중';
                        eduStatusClass += ' REGISTRATION_OPEN';
                    }
                } else if (currentDate >= eduStdt && currentDate <= eduEddt) {
                    eduStatusText = '교육 중';
                    eduStatusClass += ' PROCESSING';
                } else if (currentDate > recuEddt && currentDate < eduEddt) {
                    eduStatusText = '교육 대기';
                    eduStatusClass += ' WAITING';
                } else if (currentDate >= eduEddt) {
                    eduStatusText = '교육 종료';
                    eduStatusClass += ' ENDED';
                } else {
                    eduStatusText = '기타 상태';
                }

                return (
                    <div className={eduStatusClass}>
                        {eduStatusText}
                    </div>
                );
            },
        },
        {field: 'memId', headerName: '신청자', width: 70, valueGetter: (params) => params.row.member?.memId},
        {
            field: 'applyDate',
            headerName: '신청 일시',
            width: 120,
            valueGetter: (params) => {
                const date = new Date(params.row.applyDate);
                return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            }
        },
        {
            field: 'status',
            headerName: '승인 상태',
            width: 100,
            renderCell: (params) => {
                let statusText;
                if (params.value === 'WAIT') {
                    statusText = '미승인';
                } else if (params.value === 'APPROVE') {
                    statusText = '승인';
                } else if (params.value === 'COMPLETE') {
                    statusText = '완료';
                } else {
                    statusText = params.value;
                }

                return (
                    isAdmin ? (
                        <select
                            value={params.value}
                            onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
                            className={`approvalStatus ${params.value}`}
                        >
                            <option value="WAIT">미승인</option>
                            <option value="APPROVE">승인</option>
                            <option value="COMPLETE">완료</option>
                        </select>
                    ) : (
                        <div className={`approvalStatus ${params.value}`}>
                            {statusText}
                        </div>
                    )
                );
            }
        },
        {
            field: 'cancel',
            headerName: '취소',
            width: 60,
            renderCell: (params) => (
                <button onClick={() => handleDelete(params.row.id)}>
                    취소
                </button>
            ),
        }
    ];

    return (
        <Wrapper style={{ textAlign: 'center' }}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <SearchComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    searchOptions={searchOptions}
                    totalCount={eduApply.length}  // 전체 게시글 수
                    currentPage={activePage}     // 현재 페이지
                    totalPages={totalPageCount}  // 전체 페이지 수
                />
                <StyledDataGrid
                    columns={columns}
                    rows={getCurrentPageData()} // 현재 페이지 데이터만 표시
                    pageSize={5}
                    hideFooter={true}
                />
                <div className="paginationContainer" style={{marginTop: '10px'}}>
                    <Pagination
                        count={Math.ceil(eduApply.length / itemsPerPage)}
                        page={activePage}
                        onChange={handlePageChange} // 이 부분을 수정했습니다.
                        color="primary"
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

  & .eduStatusCell {
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

export default EduApplyList;