import React, {useEffect, useState} from 'react';
import {SERVER_URL} from '../Common/constants';
import {DataGrid} from '@mui/x-data-grid';
import MemberEditor from "./MemberEditor";
import styled from '@emotion/styled';
import Pagination from "@mui/material/Pagination";
import SearchComponent from "../Common/SearchComponent";


function MemList() {
    // 멤버 목록과 모달 상태를 관리하는 상태 변수들을 정의합니다.
    const [members, setMembers] = useState([]);
    const [files, setFiles] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [pageInfo, setPageInfo] = useState(null);
    const [searchTerm, setSearchTerm] = useState({
        value: '',  // 검색 옵션
        term: ''   // 검색어
    });
    const SEARCH_OPTIONS = [
        { value: 'memId', label: '아이디', type: 'text' },
        { value: 'type', label: '유형', type: 'select', options: ['ADMIN', 'USER', 'LABOR', 'COUNSELOR'] },
        { value: 'name', label: '이름', type: 'text' },
        { value: 'addr', label: '주소', type: 'text' },
        { value: 'gender', label: '성별', type: 'select', options: ['FEMALE', 'MALE'] },
    ];

    const handleSearch = () => {
        // 현재 페이지를 1로 리셋하고 검색 진행
        setCurrentPage(1);
    };

    const membersWithFiles = members.map((member) => {

        // 각 멤버에 대한 파일 정보를 찾는 로직 작성
        const memberFiles = files.filter((file) => {
            if (!file.member) return false;
            return file.member.memNum == member._links.member.href.split('/').pop();
        });
        return {
            ...member,
            memberFiles, // 각 멤버의 파일 정보를 추가합니다.
        };
    });

    // 컴포넌트가 마운트될 때 멤버 목록을 불러오는 효과를 정의합니다.
    useEffect(() => {
        const url = `${SERVER_URL}api/members?page=${currentPage-1}&size=${itemsPerPage}&${searchTerm.value}=${searchTerm.term}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setMembers(data._embedded.members);
                setPageInfo(data.page);
            })
            .catch((err) => console.error(err));
    }, [currentPage, searchTerm]);


    // 컴포넌트가 마운트될 때 파일 목록을 불러오는 효과를 정의합니다.
    useEffect(() => {
        fetch(SERVER_URL + "files/table/member")
            .then(res => {
                return res.json();
            })
            .then(data => {
                setFiles(data);
            })
            .catch(err => console.error(err));
    }, []);

    // 데이터 그리드의 컬럼 설정을 정의합니다.
    const columns = [
        {
            field: '_links.member.href',
            headerName: '번호',
            sortable: false,
            filterable: false,
            renderCell: (row) => (
                <div>{(row.id).split('/').pop()}</div>
            ),
            width: 40

        },
        {field: 'memId', headerName: '아이디', width: 100},
        {
            field: 'type',
            headerName: '유형',
            width: 80,
            renderCell: (params) => (
                <select
                    value={params.value}
                    onChange={(e) => {
                        const newValue = e.target.value;

                        fetch(`${SERVER_URL}api/members/${params.id.split('/').pop()}`, {
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
                                setMembers((prevMembers) => {
                                    return prevMembers.map((member) => {
                                        if (member._links.self.href === params.row._links.self.href) {
                                            return {
                                                ...member,
                                                type: newValue
                                            };
                                        }
                                        return member;
                                    });
                                });
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
        {field: 'name', headerName: '이름', width: 100},
        {field: 'bir', headerName: '생년월일', width: 100},
        {field: 'tel', headerName: '전화번호', width: 100},
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
            field: '_links.self.href.detail',
            headerName: '정보 수정',
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
        {
            field: 'memberFiles',
            headerName: '제출 문서',
            width: 150,
            renderCell: (row) => (
                <StyledScrollHideDiv>
                    {row.value && row.value.map((file, index) => (
                        // key prop 추가
                        <div key={index}>
                            <p><a href={file.fileUri}>{file.fileOriName}</a></p>
                        </div>
                    ))}
                </StyledScrollHideDiv>
            ),
        }
    ];

    // 멤버 목록을 다시 불러오는 함수를 정의합니다.
    const fetchMembers = () => {
        const token = sessionStorage.getItem('jwt');
        fetch(SERVER_URL + 'api/members', {
            headers: {Authorization: token},
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

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    //멤버를 삭제합니다.
    const MemberDelete = (url) => {
        fetch(url, {method: 'DELETE'})
            .then(response => fetchMembers())
            .catch(err => console.error(err))
    }


    return (
        <Wrapper style={{textAlign: 'center'}}>
            <SearchComponent
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                totalCount={pageInfo ? pageInfo.totalElements : 0}
                currentPage={currentPage}
                totalPages={pageInfo ? pageInfo.totalPages : 1}
                onSearch={handleSearch}
                searchOptions={SEARCH_OPTIONS}
            />
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <StyledDataGrid
                    columns={columns}
                    rows={membersWithFiles}  // 현재 페이지에 맞는 데이터만 사용
                    getRowId={(row) => row._links.self.href}
                    hideFooter={true}
                />
                <div className="paginationContainer" style={{marginTop: '10px'}}>
                    <Pagination
                        count={pageInfo ? pageInfo.totalPages : 1}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </div>
                <MemberEditor member={selectedMember} open={openModal} onClose={handleCloseModal}
                              onUpdate={fetchMembers}/>
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

  & button {
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
`;

const MemberFileList = styled.div`
  overflow: auto;
  max-height: 50px;
  line-height: 0.5;
  width: 200px;
  scrollbar-width: none; // Firefox

  &::-webkit-scrollbar {
    display: none; // Chrome, Safari, and Opera
  }
`;

export default MemList;
