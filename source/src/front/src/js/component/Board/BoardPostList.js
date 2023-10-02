import React, {useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {Pagination} from "@mui/material";
import styled from '@emotion/styled';
import {SERVER_URL} from '../Common/constants';
import useFetch from "../hook/useFetch";
import SearchComponent from "../Common/SearchComponent";
import useSearch from "../hook/useSearch";
import usePagination from "../hook/usePagination";

function BoardPostList({boardNum}) {
    const itemsPerPage = 10;
    const SEARCH_OPTIONS = [
        {label: "제목", value: "title", type: "text"},
        {label: "내용", value: "content", type: "text"},
        {label: "작성자", value: "member", type: "text", valueGetter: (post) => post.member.memId},
    ];
    const [posts, setPosts] = useState([]);
    const {activePage, setActivePage} = usePagination(1);
    const {searchTerm, setSearchTerm, handleSearch} = useSearch(`${SERVER_URL}post/${boardNum}`, setPosts);
    const {data: fetchedPosts, loading} = useFetch(`${SERVER_URL}post/${boardNum}`);


    useEffect(() => {
        if (!loading) {
            setPosts(fetchedPosts.reverse());
        }
    }, [loading, fetchedPosts]);

    const handleDelete = (postNum) => {
        // 사용자에게 삭제 확인 메시지 보여주기
        if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
            return;
        }
        // API 호출하여 게시글 삭제
        fetch(`${SERVER_URL}post/${postNum}`, {
            method: 'DELETE'
        })
            .then(response => {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    return response.json();
                } else {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return {};  // or some default value
                }
            })
            .then(data => {
                setPosts(posts.filter(post => post.postNum !== postNum));
                alert("삭제가 완료되었습니다.");
            })
            .catch(error => {
                console.error('Error deleting post:', error);
                alert("게시글 삭제 중 오류가 발생했습니다.");
            });
    };

    const columns = [
        {field: 'postNum', headerName: '번호', width: 100},
        {field: 'title', headerName: '제목', width: 300},
        {
            field: 'member',
            headerName: '작성자',
            width: 150,
            valueGetter: (params) => params.row.member.memId
        },
        {
            field: 'writeDate',
            headerName: '작성일시',
            width: 200,
            valueFormatter: (params) => {
                const formattedDate = new Date(params.value).toLocaleString();
                return formattedDate.replace('T', ' ');
            }
        },
        {
            field: 'editDate',
            headerName: '수정일시',
            width: 200,
            valueFormatter: (params) => {
                const formattedDate = new Date(params.value).toLocaleString();
                return formattedDate.replace('T', ' ');
            }
        },
        {field: 'pageView', headerName: '조회수', width: 100},
        {
            field: 'deleteAction',
            headerName: '삭제',
            width: 100,
            renderCell: (params) => (
                <button onClick={() => handleDelete(params.row.postNum)}>삭제</button>
            )
        }
    ];

    return (
        <Wrapper style={{textAlign: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <SearchComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    totalCount={posts.length}
                    searchOptions={SEARCH_OPTIONS}
                    currentPage={activePage}
                    totalPages={Math.ceil(posts.length / itemsPerPage)}
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
                        rows={posts.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)}
                        getRowId={(row) => row.postNum.toString()}
                        hideFooter={true}
                    />
                )}
                <div className="paginationContainer" style={{marginTop: '10px'}}>
                    <Pagination
                        count={Math.ceil(posts.length / itemsPerPage)}
                        page={activePage}
                        onChange={(event, newPage) => setActivePage(newPage)}
                        color="primary"
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

export default BoardPostList;