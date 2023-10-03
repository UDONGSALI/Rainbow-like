// 1. React 관련
import React, { useEffect, useState } from 'react';
// 2. 외부 라이브러리 관련
import { DataGrid } from '@mui/x-data-grid';
import styled from '@emotion/styled';
import Pagination from "@mui/material/Pagination";
// 3. 프로젝트 내 공통 모듈 관련
import { SERVER_URL } from '../Common/constants';
import { useLocation, useNavigate } from 'react-router-dom';
// 4. 컴포넌트 관련
import MemberEditor from "./MemberEditor";
import SearchComponent from "../Common/SearchComponent";
// 5. 훅 관련
import useFetch from "../hook/useFetch";
import usePagination from "../hook/usePagination";
import useSearch from "../hook/useSearch";

function MemList() {
    // 1. Router Hooks
    const navigate = useNavigate();
    const location = useLocation();

    // 2. 상수 및 상태
    const itemsPerPage = 10;
    const SEARCH_OPTIONS = [
        { value: 'memId', label: 'ID', type: 'text' },
        {
            value: 'type',
            label: '유형',
            type: 'select',
            options: [
                { value: 'ADMIN', label: '관리자' },
                { value: 'USER', label: '일반 회원' },
                { value: 'LABOR', label: '노무사' },
                { value: 'COUNSELOR', label: '상담사' }
            ]
        },
        { value: 'name', label: '이름', type: 'text' },
        { value: 'addr', label: '주소', type: 'text' },
        {
            value: 'gender',
            label: '성별',
            type: 'select',
            options: [
                { value: 'FEMALE', label: '여자' },
                { value: 'MALE', label: '남자' }
            ]
        }
    ];

    // 3. 로컬 상태 관리
    const [openModal, setOpenModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [pageInfo, setPageInfo] = useState(null);
    const [membersWithFiles, setMembersWithFiles] = useState([]);

    // 4. 커스텀 훅 사용
    const { activePage, setActivePage } = usePagination(1);
    const { searchTerm, setSearchTerm, handleSearch } = useSearch(`${SERVER_URL}members`, setMembersWithFiles);
    const { data: members, loading: membersLoading } = useFetch(SERVER_URL + 'members', []);
    const { data: files, loading: filesLoading } = useFetch(SERVER_URL + 'files/table/member', []);


    useEffect(() => {
        if (files.length > 0) {
            const fileMap = {};
            files.forEach(file => {
                if (!fileMap[file.member.memNum]) {
                    fileMap[file.member.memNum] = [];
                }
                fileMap[file.member.memNum].push(file);
            });

            const updatedMembers = members.map(item => {
                const matchingFiles = fileMap[item.memNum];
                if (matchingFiles && matchingFiles.length) {
                    return {
                        ...item,
                        files: matchingFiles
                    };
                }
                return item;
            });

            const hasChanged = !members.every((item, index) => JSON.stringify(item) === JSON.stringify(updatedMembers[index]));

            if (hasChanged) {
                setMembersWithFiles(updatedMembers.reverse());
            }
        } else {
            // files가 비어있을 때 members를 그대로 membersWithFiles로 설정
            setMembersWithFiles(members);
        }
    }, [files, members]);

    const handleOpenModal = (member) => {
        setSelectedMember(member);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedMember(null);
        setOpenModal(false);
    };

    const handlePageChange = (event, newPage) => {
        navigate(`${location.pathname}?page=${newPage}`);
        setActivePage(newPage);
    }

    const handleUpdate = (updatedMember) => {
        setMembersWithFiles((prevMembers) => {
            return prevMembers.map((member) => {
                if (member.memNum == updatedMember._links.self.href.split("/").pop()) {
                    return {
                        ...member,
                        ...updatedMember,
                    };
                }
                return member;
            });
        });

    };

    const MemberDelete = (memNum) => {
        const isConfirmed = window.confirm("정말 삭제 하시겠습니까?");
        if (!isConfirmed) return;

        fetch(`${SERVER_URL}api/members/${memNum}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    const updatedRows = membersWithFiles.filter(row => row.memNum !== memNum);
                    setMembersWithFiles(updatedRows);
                    alert(`데이터가 삭제 되었습니다.`);
                } else {
                    throw new Error();
                }
            })
            .catch(err => console.error(err))
    }

    const columns = [
        {
            field: 'memNum',
            headerName: '번호',
            width: 40
        },
        {
            field: 'type',
            headerName: '유형',
            width: 80,
            renderCell: (params) => (
                <select
                    value={params.value}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        fetch(`${SERVER_URL}api/members/${params.row.memNum}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                type: newValue,
                            }),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                console.log('Update successful:', data);
                                // members 상태를 업데이트하여 화면 갱신
                                setMembersWithFiles((prevMembers) => {
                                    return prevMembers.map((member) => {
                                        if (member.memNum === params.row.memNum) {
                                            return {
                                                ...member,
                                                type: newValue
                                            };
                                        }
                                        return member;
                                    });
                                });
                                alert("회원 유형을 변경 했습니다!");
                            })
                            .catch((error) => {
                                console.error('Error updating type:', error);
                            });
                    }}
                >
                    <option value="ADMIN">관리자</option>
                    <option value="USER">일반 회원</option>
                    <option value="LABOR">노무사</option>
                    <option value="COUNSELOR">상담사</option>
                </select>
            ),
        },
        {field: 'memId', headerName: '아이디', width: 100},
        {field: 'name', headerName: '이름', width: 100},
        {field: 'bir', headerName: '생년월일', width: 100},
        {field: 'tel', headerName: '전화번호', width: 120},
        {
            field: 'gender',
            headerName: '성별',
            width: 50,
            renderCell: (row) => (
                <div>{row.value === 'FEMALE' ? '여자' : row.value === 'MALE' ? '남자' : ''}</div>
            ),
        },
        {field: 'email', headerName: '이메일', width: 130},
        {field: 'jdate', headerName: '가입일', width: 100},
        {
            field: 'memberFiles',
            headerName: '제출 문서',
            width: 150,
            renderCell: (row) => {
                if (!row.row.files || row.row.files.length === 0) {
                    return <div>파일 없음</div>;
                }
                return (
                    <StyledScrollHideDiv>
                        {row.row.files.map((file, index) => (
                            <div key={index}><a href={file.fileUri}>{file.fileOriName}</a></div>
                        ))}
                    </StyledScrollHideDiv>
                );
            },
        },
        {
            field: 'detail',
            headerName: '정보 수정',
            sortable: false,
            filterable: false,
            renderCell: (row) => (
                <button onClick={() => handleOpenModal(row)}>수정</button>
            ),
            width: 100
        },
        {
            field: 'delete',
            headerName: '회원 삭제',
            sortable: false,
            filterable: false,
            renderCell: (row) => (
                <button onClick={() => MemberDelete(row.id)}>삭제</button>
            ),
            width: 100
        },
    ];

    return (
        <Wrapper style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <SearchComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    searchOptions={SEARCH_OPTIONS}
                    totalCount={membersWithFiles.length}
                    currentPage={activePage}
                    totalPages={Math.ceil(membersWithFiles.length / itemsPerPage)}
                />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {membersLoading ? (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '200px'
                        }}>로딩중...</div>
                    ) : (
                        <StyledDataGrid
                            columns={columns}
                            rows={membersWithFiles.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)}
                            getRowId={(row) => row.memNum}
                            hideFooter={true}
                        />
                    )}
                    <div className="paginationContainer" style={{ marginTop: '10px' }}>
                        <Pagination
                            count={Math.ceil(membersWithFiles.length / itemsPerPage)}
                            page={activePage}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </div>
                    <MemberEditor
                        member={selectedMember}
                        open={openModal}
                        onClose={handleCloseModal}
                        onUpdate={handleUpdate}  // 추가
                    />
                </div>
            </div>
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

export default MemList;
