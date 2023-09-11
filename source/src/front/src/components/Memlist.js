import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../constants';
import { DataGrid } from '@mui/x-data-grid';
import MemberEditor from './MemberEditor';

function Memlist() {
    // 멤버 목록과 모달 상태를 관리하는 상태 변수들을 정의합니다.
    const [members, setMembers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    // 컴포넌트가 마운트될 때 멤버 목록을 불러오는 효과를 정의합니다.
    useEffect(() => {
        fetch(SERVER_URL + 'api/members')
            .then((res) => res.json())
            .then((data) => setMembers(data._embedded.members))
            .catch((err) => console.error(err));
    }, []);

    // 데이터 그리드의 컬럼 설정을 정의합니다.
    const columns = [
        {
            field: '_links.member.href',
            headerName: '번호',
            sortable: false,
            filterable: false,
            renderCell: (row) => (
                <div>{(row.id).slice(-1)}</div>
            ),
            width: 50

        },
        { field: 'memId', headerName: '아이디', width: 100 },
        { field: 'type', headerName: '유형', width: 130 },
        { field: 'name', headerName: '이름', width: 100 },
        { field: 'bir', headerName: '생년월일', width: 100 },
        { field: 'tel', headerName: '전화번호', width: 120 },
        { field: 'gender', headerName: '성별', width: 80 },
        { field: 'email', headerName: '이메일', width: 180 },
        { field: 'jdate', headerName: '가입일', width: 100 },
        {
            field: '_links.self.href.detail',
            headerName: '수정',
            sortable: false,
            filterable: false,
            renderCell: (row) => (
                <button onClick={() => handleOpenModal(row)}>수정</button>
            ),
            width: 100
        },
        {
            field: '_links.self.href.delete',
            headerName: '회원 삭제',
            sortable: false,
            filterable: false,
            renderCell: (row) => (
                <button onClick={() => MemberDelete(row.id)}>삭제</button>
            ),
            width: 100
        },

    ];

    // 멤버 목록을 다시 불러오는 함수를 정의합니다.
    const fetchMembers = () => {
        const token = sessionStorage.getItem('jwt');
        fetch(SERVER_URL + 'api/members', {
            headers: { Authorization: token },
        })
            .then((response) => response.json())
            .then((data) => setMembers(data._embedded.members))
            .catch((err) => console.error(err));
    };

    // 상세 정보 모달을 열기 위한 함수를 정의합니다.
    const handleOpenModal = (member) => {
        setSelectedMember(member);
        setOpenModal(true);
    };

    // 상세 정보 모달을 닫기 위한 함수를 정의합니다.
    const handleCloseModal = () => {
        setSelectedMember(null);
        setOpenModal(false);
    };

    //멤버를 삭제합니다.
    const MemberDelete = (url) =>{
        fetch(url, {method: 'DELETE'})
            .then(response => fetchMembers())
            .catch(err => console.error(err))
    }



    return (
        <div style={{ height: 500, width: '100%' }}>
            {/* 데이터 그리드 컴포넌트를 렌더링합니다. */}
            <DataGrid columns={columns} rows={members} getRowId={(row) => row._links.self.href} />

            {/* 멤버 상세 정보 모달을 렌더링합니다. */}
            <MemberEditor member={selectedMember} open={openModal} onClose={handleCloseModal} onUpdate={fetchMembers} />
        </div>
    );
}

export default Memlist;
