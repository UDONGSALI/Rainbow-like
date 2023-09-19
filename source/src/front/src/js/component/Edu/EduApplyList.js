import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { SERVER_URL } from "../Common/constants";

function EduApplyList() {
    const [eduApply, setEduApply] = useState([]);
    console.log(eduApply);

    useEffect(() => {
        // 데이터를 서버에서 가져옵니다.
        fetch(SERVER_URL + 'eduHist')
            .then(response => response.json())
            .then(data => {
                // 데이터에 id 필드가 필요합니다.
                // id 필드가 이미 있으면 이 단계는 건너뛸 수 있습니다.
                const formattedData = data.map((item, index) => ({ id: index, ...item }));
                setEduApply(formattedData);
            })
            .catch(error => console.error("Error fetching eduApply:", error));
    }, []);

    const columns = [
        { field: 'id', headerName: '번호', width: 70 },
        { field: 'eduName', headerName: '교육명', width: 250, valueGetter: (params) => params.row.edu?.eduName },
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
        { field: 'status', headerName: '승인 상태', width: 120 },
        {
            field: 'applyDate',
            headerName: '신청 일시',
            width: 200,
            valueGetter: (params) => {
                const date = new Date(params.row.applyDate);
                return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            }
        }
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={eduApply} columns={columns} pageSize={5} />
        </div>
    );
}

export default EduApplyList;