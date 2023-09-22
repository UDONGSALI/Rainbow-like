import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { SERVER_URL } from "../Common/constants";
import {useNavigate} from "react-router-dom";

function EduApplyList(props) {
    const [eduApply, setEduApply] = useState([]);
    const navigate = useNavigate();
    const {memId} = props;
    const isAdmin = sessionStorage.getItem("role") === "ADMIN"; // 사용자가 ADMIN인지 확인
    console.log(eduApply);

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
        // 데이터를 서버에서 가져옵니다.
        fetch(SERVER_URL + 'eduHist')
            .then(response => response.json())
            .then(data => {
                let filteredData = data;

                // 어드민이 아니라면 memId로 데이터를 필터링
                if (!isAdmin) {
                    filteredData = data.filter(item => item.member?.memId === memId);
                }

                // 데이터에 id 필드가 필요합니다.
                const formattedData = filteredData.map((item, index) => ({ id: index, ...item }));
                setEduApply(formattedData);
            })
            .catch(error => console.error("Error fetching eduApply:", error));
    }, [memId, isAdmin]);  // memId와 isAdmin 의존성을 추가

    const columns = [
        { field: 'id', headerName: '번호', width: 70 },{
            field: 'eduName',
            headerName: '프로그램명',
            width: 350,
            renderCell: (params) => (
                <div onClick={() => handleTitleClick(params.row.id)} style={{ cursor: 'pointer' }}>
                    {params.row.edu?.eduName}
                </div>
            ),
        },
        { field: 'recuPerson', headerName: '모집 인원', width: 100, valueGetter: (params) => params.row.edu?.recuPerson },
        { field: 'capacity', headerName: '정원', width: 70, valueGetter: (params) => params.row.edu?.capacity },
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
        { field: 'memId', headerName: '신청자', width: 150, valueGetter: (params) => params.row.member?.memId },
        {
            field: 'applyDate',
            headerName: '신청 일시',
            width: 200,
            valueGetter: (params) => {
                const date = new Date(params.row.applyDate);
                return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            }
        },
        {
            field: 'status',
            headerName: '승인 상태',
            width: 120,
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
            width: 80,
            renderCell: (params) => (
                <button onClick={() => handleDelete(params.row.id)}>
                    취소
                </button>
            ),
        }
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={eduApply} columns={columns} pageSize={5} />
        </div>
    );
}

export default EduApplyList;