import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { SERVER_URL } from "../Common/constants";
import { useNavigate } from "react-router-dom";
import styled from '@emotion/styled';

function EduApplyList(props) {
    const [eduApply, setEduApply] = useState([]);
    const navigate = useNavigate();
    const {memId} = props;
    const isAdmin = sessionStorage.getItem("role") === "ADMIN"; // 사용자가 ADMIN인지 확인

    const handleTitleClick = (eduNum) => {
        navigate(`/edu/detail/${eduNum}`);
    }

    const handleStatusChange = (rowId, newStatus) => {
        // 서버에 PUT 요청을 보내서 데이터 업데이트
        fetch(SERVER_URL + 'eduHist/' + (rowId+1), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus }) // 여기서 전송하고 싶은 데이터를 설정하세요.
        })
            .then(response => {
                if (response.ok) {
                    // 프론트엔드 데이터 업데이트
                    const updatedRows = eduApply.map(row =>
                        row.id === rowId ? { ...row, status: newStatus } : row
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
        fetch(SERVER_URL + 'eduHist/' + (rowId+1), {
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

    useEffect(() => {
        // URL을 결정하는 로직
        let apiUrl;
        if (isAdmin) {
            apiUrl = SERVER_URL + 'eduHist'; // 어드민인 경우 일반적인 엔드포인트 사용
        } else {
            apiUrl = SERVER_URL + `eduHist/memid/${memId}`; // 어드민이 아닌 경우 memId를 사용하여 엔드포인트 설정
        }

        // 데이터를 서버에서 가져옵니다.
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // 데이터에 id 필드가 필요합니다.
                const formattedData = data.map((item, index) => ({ id: index + 1, ...item }));
                setEduApply(formattedData);
            })
            .catch(error => console.error("Error fetching eduApply:", error));
    }, [memId, isAdmin]);

    const columns = [
        { field: 'id', headerName: '번호', width: 30 },
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
                <div onClick={() => handleTitleClick(params.row.id)} style={{ cursor: 'pointer' }} className="eduNameCell">
                    {params.row.edu?.eduName}
                </div>
            ),
        },
        { field: 'recuPerson', headerName: '모집 인원', width: 100, valueGetter: (params) => params.row.edu?.recuPerson },
        { field: 'capacity', headerName: '정원', width: 40, valueGetter: (params) => params.row.edu?.capacity },
        {
            field: 'eduStatus',
            headerName: '교육 상태',
            width: 100,
            valueGetter: (params) => {
                const currentDate = new Date();
                const recuStdt = new Date(params.row.edu?.recuStdt); // 모집 시작일
                const recuEddt = new Date(params.row.edu?.recuEddt); // 모집 종료일
                const eduStdt = new Date(params.row.edu?.eduStdt);   // 교육 시작일
                const eduEddt = new Date(params.row.edu?.eduEddt);   // 교육 종료일
                const recuPerson = params.row.edu?.recuPerson;      // 신청자 수
                const capacity = params.row.edu?.capacity;          // 정원

                if (currentDate < recuStdt) {
                    return '접수 대기';
                } else if (currentDate >= recuStdt && currentDate <= recuEddt) {
                    if (recuPerson >= capacity) {
                        return '접수 마감'; // 신청자가 정원보다 많거나 같으면 '접수 마감'
                    }
                    return '접수 중';
                } else if (currentDate >= eduStdt && currentDate <= eduEddt) {
                    return '교육 중';
                } else if (currentDate > recuEddt && currentDate < eduEddt) {
                    return '교육 대기';
                } else if (currentDate >= eduEddt) {
                    return '교육 종료';
                } else {
                    return '기타 상태';
                }
            },
        },
        { field: 'memId', headerName: '신청자', width: 70, valueGetter: (params) => params.row.member?.memId },
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
            renderCell: (params) => (
                isAdmin ? (
                    <select
                        value={params.value}
                        onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
                    >
                        <option value="WAIT">미승인</option>
                        <option value="APPROVE">승인</option>
                        <option value="COMPLETE">완료</option>
                    </select>
                ) : (
                    params.value  // 어드민이 아니면 단순 텍스트로 상태를 표시
                )
            ),
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <StyledDataGrid
                    columns={columns}
                    rows={eduApply}
                    pageSize={5}
                    hideFooter={true}
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

export default EduApplyList;