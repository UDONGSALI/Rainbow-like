import React, {useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import styled from "@emotion/styled";
import {SERVER_URL} from "../Common/constants";
import useFetch from "../hook/useFetch";

function BoardList() {
    const [boards, setBoards] = useState([]);
    const {data: fetchedBoards, loading} = useFetch(`${SERVER_URL}api/boards`);

    useEffect(() => {
        if (!loading) {
            const processedBoards = fetchedBoards._embedded.boards.map(board => ({
                ...board,
                boardId: board._links.self.href.split('/').pop(),
                readRole: board.readRole ? 'Yes' : 'No',
                writeRole: board.writeRole ? 'Yes' : 'No',
                commAllowYn: board.commAllowYn ? 'Yes' : 'No',
            }));
            setBoards(processedBoards);
        }
    }, [loading, fetchedBoards]);

    const handleUpdatePermission = (boardId, field, newValue) => {
        fetch(`${SERVER_URL}api/boards/${boardId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                [field]: newValue === 'Yes',
            }),
        })
            .then(response => {
                if (!response.ok) throw new Error(response.statusText);
                return response.json();
            })
            .then(data => {
                console.log('Update successful:', data);
                setBoards(prevBoards => {
                    return prevBoards.map(board => {
                        if (board.boardId === boardId) {
                            return {
                                ...board,
                                [field]: newValue,
                            };
                        }
                        return board;
                    });
                });
                alert("설정을 변경 했습니다!");
            })
            .catch(error => {
                console.error('Error updating:', error);
            });
    };

    const columns = [
        {field: 'boardId', headerName: '번호', width: 50},
        {
            field: 'boardName',
            headerName: '게시판 이름',
            width: 200,
            renderCell: (params) => (
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/admin/board/post/${params.row.boardId}`;
                    }}
                    style={{color: 'inherit', textDecoration: 'none'}} // 이 부분을 추가
                >
                    {params.value}
                </a>
            ),
        },
        {
            field: 'readRole',
            headerName: '읽기 권한',
            width: 150,
            renderCell: (params) => (
                <select
                    value={params.value}
                    onChange={(e) => handleUpdatePermission(params.row.boardId, 'readRole', e.target.value)}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            ),
        },
        {
            field: 'writeRole',
            headerName: '쓰기 권한',
            width: 150,
            renderCell: (params) => (
                <select
                    value={params.value}
                    onChange={(e) => handleUpdatePermission(params.row.boardId, 'writeRole', e.target.value)}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            ),
        },
        {
            field: 'commAllowYn',
            headerName: '댓글 여부',
            width: 150,
            renderCell: (params) => (
                <select
                    value={params.value}
                    onChange={(e) => handleUpdatePermission(params.row.boardId, 'commAllowYn', e.target.value)}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            ),
        }
    ];

    return (
        <Wrapper style={{textAlign: 'center'}}>
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
                        rows={boards}
                        getRowId={(row) => row.boardId.toString()}
                        hideFooter={true}
                    />
                )}
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

export default BoardList;