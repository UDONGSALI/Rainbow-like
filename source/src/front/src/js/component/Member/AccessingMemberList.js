// 1. React 관련
import React, {memo, useEffect, useState} from "react";
// 2. 외부 라이브러리 관련
import {DataGrid} from "@mui/x-data-grid";
import styled from '@emotion/styled';
// 3. 프로젝트 내 공통 모듈 관련
import {SERVER_URL} from '../Common/constants';
// 4. 컴포넌트 관련
import SearchComponent from "../Common/SearchComponent";
// 5. 훅 관련
import useSearch from "../hook/useSearch";
import useFetch from "../hook/useFetch";
import useDelete from "../hook/useDelete";

function AccessingMemberList() {
    // 1. 상수 및 상태
    const SEARCH_OPTIONS = [
        {value: 'memId', label: 'ID', type: 'text'},
        {
            value: 'type',
            label: '유형',
            type: 'select',
            options: [
                {value: 'ADMIN', label: '관리자'},
                {value: 'USER', label: '일반 회원'},
                {value: 'LABOR', label: '노무사'},
                {value: 'COUNSELOR', label: '상담사'}
            ]
        },
    ];
    // 2. 로컬 상태 관리
    const [accessingMembers, setAccessingMembers] = useState([]);

    // 3. 커스텀 훅 사용
    const deleteItem = useDelete(SERVER_URL);

    const {searchTerm, setSearchTerm, handleSearch} = useSearch(`${SERVER_URL}token`, setAccessingMembers);
    const {data: fetchedAccessingMembers, loading} = useFetch(`${SERVER_URL}token`);

    useEffect(() => {
        if (!loading) {
            setAccessingMembers(fetchedAccessingMembers.reverse());
        }
    }, [loading, fetchedAccessingMembers]);

    const handleDelete = async (jti) => {
        const isSuccess = await deleteItem('token/' + jti, "강제 로그아웃");

        if (isSuccess) {
            const updatedRows = accessingMembers.filter(row => row.jti !== jti);
            setAccessingMembers(updatedRows);
        }
    };

    function formatLoginTime(dateString) {
        // 파싱
        let date = new Date(dateString);

        // 4 시간 더하기
        date.setTime(date.getTime() - 5 * 60 * 60 * 1000);

        // 출력 형식 만들기
        const HH = String(date.getHours()).padStart(2, '0');
        const MI = String(date.getMinutes()).padStart(2, '0');

        return `${HH}:${MI}`;
    }

    const columns = [
        {
            field: 'memId',
            headerName: '회원 아이디',
            width: 150,
        },
        {
            field: 'role',
            headerName: '유형',
            width: 150
        },
        {
            field: 'expirationDate',
            headerName: '로그인 시간',
            width: 200,
            valueFormatter: (params) => formatLoginTime(params.value)
        },
        {
            field: 'delete',
            headerName: '강제 로그아웃',
            sortable: false,
            filterable: false,
            renderCell: (row) => (
                <button onClick={() => handleDelete(row.row.jti)}>로그아웃</button>
            ),
            width: 150
        },
    ]
    return (
        <Wrapper style={{textAlign: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <SearchComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    searchOptions={SEARCH_OPTIONS}
                    totalCount={accessingMembers.length}
                    currentPage={0}
                    totalPages={0}
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
                        rows={accessingMembers}
                        getRowId={(row) => row.tokenNum}
                        hideFooter={true}
                    />
                )}
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
export default memo(AccessingMemberList);