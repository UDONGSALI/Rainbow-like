import React, { useEffect, useState } from "react";
import { SERVER_URL } from '../Common/constants';
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import SearchComponent from "../Common/SearchComponent";


function EduList() {
    const [edus, setEdus] = useState([]);
    const isAdmin = sessionStorage.getItem("role") === "ADMIN"; // 사용자가 ADMIN인지 확인
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
    const [selectedSearchOption, setSelectedSearchOption] = useState("");

    // 검색어 기반으로 edus 필터링
    const filteredEdus = edus.filter((edu) =>
        edu.eduName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const searchOptions = [
        { label: "프로그램명", value: "eduName" },
        { label: "구분", value: "type" },
    ];

    const StyledDataGrid = styled(DataGrid)`
      & .MuiDataGrid {
        display: flex;
        justify-content: center;
        align-items: center;
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
          color: mediumpurple;
        }

        &.EDU {
          color: skyblue;
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

    const fetchEdus = () => {
        fetch(SERVER_URL + 'api/edus')
            .then((res) => res.json())
            .then((data) => {
                const formattedEdus = data._embedded.edus.map((edu) => ({
                    id: edu._links.edu.href,
                    ...edu,
                }));
                setEdus(formattedEdus);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchEdus();
    }, []);

    const handleTitleClick = (eduNum) => {
        navigate('/edu/detail/' + eduNum.split('/').pop());
    };

    // 동적으로 열을 구성하는 함수
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
            // ADMIN인 경우 '삭제'와 '수정' 버튼 열을 추가
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
                        <button>수정</button>
                    ),
                    width: 60   ,
                },
            );
        }

        return baseColumns;
    };

    const columns = getColumns();
    const EduDelete = (url) => {
        fetch(url, { method: 'DELETE' })
            .then(response => fetchEdus())
            .catch(err => console.error(err));
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-block', alignItems: 'center', justifyContent: 'center', margin: '0 auto'}}>
                <SearchComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    searchOptions={searchOptions}
                    setSelectedSearchOption={setSelectedSearchOption}
                />
                <StyledDataGrid  columns={columns} rows={filteredEdus}  /> {/* 필터링된 데이터 사용 */}
            </div>
        </div>
    );
}


export default EduList;