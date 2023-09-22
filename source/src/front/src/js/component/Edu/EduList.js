import React, { useEffect, useState } from "react";
import { SERVER_URL } from '../Common/constants';
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from 'react-router-dom';

function EduList() {
    const [edus, setEdus] = useState([]);
    const isAdmin = sessionStorage.getItem("role") === "ADMIN"; // 사용자가 ADMIN인지 확인
    const navigate = useNavigate();


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
        navigate('/edu/detail/' + eduNum.slice(-1));
    };

    // 동적으로 열을 구성하는 함수
    const getColumns = () => {
        const baseColumns = [
            {
                field: '_links.edu.href',
                headerName: '번호',
                sortable: false,
                filterable: false,
                renderCell: (row) => (
                    <div>{(row.id).slice(-1)}</div>
                ),
                width: 50
            },
            {
                field: 'type',
                headerName: '구분',
                width: 80,
                renderCell: (row) => (
                    <div>
                        {row.value === 'BUSINESS' ? '사업' :
                            row.value === 'EDU' ? '교육' : ''}
                    </div>
                ),
            },
            {
                field: 'eduName',
                headerName: '프로그램명',
                width: 350,
                renderCell: (row) => (
                    <div onClick={() => handleTitleClick(row.id)} style={{ cursor: 'pointer' }}>
                        {row.value}
                    </div>
                ),
            },
            {field: 'recuMethod', headerName: '접수 방법', width: 100},
            {
                field: 'recuStdt~recuEddt',
                headerName: '모집 기간',
                width: 180,
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
                width: 100,
                valueGetter: (params) => {
                    const currentDate = new Date();
                    const recuStdt = new Date(params.row.recuStdt);
                    const recuEddt = new Date(params.row.recuEddt);
                    const recuStartDate = new Date(params.row.recuStartDate);
                    const recuEndDate = new Date(params.row.recuEndDate);
                    const eduStdt = new Date(params.row.eduStdt);
                    const eduEddt = new Date(params.row.eduEddt);
                    const recuPerson = new Date(params.row.recuPerson);
                    const capacity = new Date(params.row.capacity);

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
        ];

        if (isAdmin) {
            // ADMIN인 경우 '삭제'와 '수정' 버튼 열을 추가
            baseColumns.push(
                {
                    field: '_links.self.href.delete',
                    headerName: '교육 삭제',
                    sortable: false,
                    filterable: false,
                    renderCell: (row) => (
                        <button onClick={() => EduDelete(row.id)}>삭제</button>
                    ),
                    width: 100,
                },
                {
                    field: '_links.self.href.edit',
                    headerName: '교육 수정',
                    sortable: false,
                    filterable: false,
                    renderCell: (row) => (
                        <button>수정</button>
                    ),
                    width: 100,
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
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid columns={columns} rows={edus} />
        </div>
    );
}


export default EduList;