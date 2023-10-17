import React, {useState, useEffect} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import Snackbar from '@mui/material/Snackbar';
import {useNavigate} from 'react-router-dom';
import {SERVER_URL} from "../Common/constants";
import File from "../../../img/component/file.png";
import styled from '@emotion/styled';
import Pagination from "../Common/Pagination";
import useDeletePost from "../hook/useDeletePost";

function PostNoticeList(props) {
    const {boardNum} = props;
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";
    const { deletePost } = useDeletePost(); // 삭제 훅
    const [files, setFiles] = useState([]);
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    //페이지관련
    const [activePage, setActivePage] = useState(1);
    const itemsCountPerPage = 10;
    const totalItemsCount = posts.length;
    const pageRangeDisplayed = 5;

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    // 게시물 목록을 불러오는 로직을 함수로 분리
    const fetchPosts = () => {
        fetch(SERVER_URL + `post/board/${boardNum}`)
            .then(res => res.json())
            .then(data => {
                const reversedData = [...data].reverse();
                setPosts(reversedData);
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchPosts();  // 처음 마운트 될 때 게시물 목록 불러오기
    }, [boardNum]);


    useEffect(() => {
        fetch(SERVER_URL + "files/table/post")
            .then(res => res.json())
            .then(data => {
                setFiles(data);
            })
            .catch(err => console.error(err));
    }, [posts]);

    const postsWithFiles = posts.map((post) => {
        const postFiles = files.filter((file) => file.post && file.post.postNum === post.postNum);
        return {
            ...post,
            postFiles,
        };
    });
    const indexOfLastPost = activePage * itemsCountPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsCountPerPage;
    const currentPagePosts = postsWithFiles.slice(indexOfFirstPost, indexOfLastPost);

    // boardNum 기준으로 게시글들을 그룹화
    const groupedByBoardNum = postsWithFiles.reduce((acc, post) => {
        if (!acc[post.board.boardNum]) {
            acc[post.board.boardNum] = [];
        }
        acc[post.board.boardNum].push(post);
        return acc;
    }, {});

    Object.keys(groupedByBoardNum).forEach(board => {
        const totalPosts = groupedByBoardNum[board].length; // 해당 게시판의 총 게시글 수
        groupedByBoardNum[board].forEach((post, index) => {
            post.orderNumber = totalPosts - index; // 역순으로 순서 번호 부여
        });
    });

    const onDelClick = async (postNum, postFiles, boardNum) => {
        const success = await deletePost(postNum, postFiles, boardNum, SERVER_URL);  // 삭제 요청

        if (success) {
            setOpen(true);  // 삭제 성공 알림 표시
            fetchPosts();  // 게시물 목록 다시 불러오기
        }
    };

    const onEditClick = (params) => {
        const rowId = params.row.postNum;
        navigate(`/post/edit/${rowId}`, { state: { mode: "edit" } });
    };

    const getRowId = (row) => {
        return row.postNum.toString();
    };

    const onRowClick = (params) => {
        const rowId = params.row.postNum;
        const boardNumber = params.row.board.boardNum;

        navigate(`/post/detail/${boardNum}/${rowId}`, {
            state: { boardNum: boardNumber }
        });
    };

    const columns = [
        {
            field: 'orderNumber',
            headerName: '번호',
            headerAlign: 'center',
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <CenteredData>
                    <StyledCell>
                        {params.value}
                    </StyledCell>
                </CenteredData>
            ),
            width: 50
        },
        {
            field: 'title',
            headerName: '제목',
            headerAlign: 'center',
            width: isAdmin ? 350 : 420,  // 조건부 width 값 설정
            renderCell: (params) => (
                <div
                    style={{cursor: 'pointer'}}
                    onClick={() => onRowClick(params)}
                >
                    <StyledCell>{params.value}</StyledCell>
                </div>
            ),
        },
        {
            field: 'member',
            headerName: '작성자',
            headerAlign: 'center',
            width: isAdmin ? 80 : 100,  // 조건부 width 값 설정
            valueGetter: (params) => {
                const members = Array.isArray(params.row.member) ? params.row.member : [params.row.member];
                return members.map((m) => m.name).join(', ');
            },
            renderCell: (params) => (
                    <CenteredData>
                        <StyledCell>
                        {params.value}
                        </StyledCell>
                    </CenteredData>
            ),
        },
        {
            field: 'pageView',
            headerName: '조회수',
            headerAlign: 'center',
            width: isAdmin ? 80 : 110,  // 조건부 width 값 설정
            renderCell: (params) => (
                    <CenteredData>
                        <StyledCell>
                        {params.value}
                        </StyledCell>
                    </CenteredData>
            )
        },
        {
            field: 'postFiles',
            headerName: '파일',
            headerAlign: 'center',
            sortable: false,
            filterable: false,
            renderCell: (row) => {
                return (
                    <CenteredData>
                        <StyledCell>
                        {row.value && row.value[0] && ( // 첫 번째 파일만 확인
                            <div style={{width: '24px', height: '24px', marginRight: '8px'}}>
                                <img
                                    src={File}
                                    alt='file'
                                    style={{maxWidth: '100%', maxHeight: '100%'}}
                                />
                            </div>
                        )}
                        </StyledCell>
                    </CenteredData>
                );
            },
            width: isAdmin ? 50 : 80  // 조건부 width 값 설정
        },
        {
            field: 'writeDate',
            headerName: '작성일',
            headerAlign: 'center',
            width: isAdmin ? 100 : 120,  // 조건부 width 값 설정
            renderCell: (params) => (
                <CenteredData>
                    <StyledCell>
                    {params.value.slice(0, 10)}
                </StyledCell>
                </CenteredData>

            )
        },
        ...(isAdmin ? [
            {
                field: 'editLink',
                headerName: '수정',
                headerAlign: 'center',
                sortable: false,
                filterable: false,
                renderCell: (params) => (
                    <CenteredData>
                        <EditButton
                            style={{cursor: 'pointer'}}
                            onClick={() => onEditClick(params)}
                        >
                            수정
                        </EditButton>
                    </CenteredData>
                ),
            },
            {
                field: 'deleteLink',
                headerName: '삭제',
                headerAlign: 'center',
                sortable: false,
                filterable: false,
                renderCell: (params) => (
                    <CenteredData>
                        <DeleteButton
                            onClick={() => onDelClick(params.row.postNum, params.row.postFiles, params.row.board.boardNum)}
                        >
                            삭제
                        </DeleteButton>
                    </CenteredData>
                ),
            },
        ] : [])  // 조건부로 배열을 확장하여 추가
    ];

    return (
        <div style={{display: 'flex', flexDirection: 'column',
            alignItems: 'center',width:'100%' }}>
            <DataGrid
                columns={columns}
                rows={currentPagePosts}
                style={{ width: '920px', height: 400 }}
                disableRowSelectionOnClick={true}
                getRowId={getRowId}
                hideFooter={true}
            />
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message="게시글을 지웠습니다."
            />
            {isAdmin && (
                <NewPost onClick={() => navigate('/post/new', { state: { mode: "create", boardNum } })}>
                    등록
                </NewPost>
            )}
            <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={pageRangeDisplayed}
                onChange={handlePageChange}
                prevPageText="<"
                nextPageText=">"
            />
        </div>

    );
}

const EditButton = styled('button')({
    cursor: 'pointer',
    backgroundColor: '#a38ced',
    color: 'white',
    padding: '8px 12px',
    border: '1px solid #99959e',
    borderRadius: '5px',
    '&:hover': {
        backgroundColor: '#53468b',
    }
});

const DeleteButton = styled('button')({
    cursor: 'pointer',
    backgroundColor: '#a38ced',
    color: 'white',
    padding: '8px 12px',
    border: '1px solid #99959e',
    borderRadius: '5px',
    '&:hover': {
        backgroundColor: '#53468b'
    }
});
const CenteredData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const NewPost = styled.button`
  width: 80px;
  height: 35px;
  background-color: #a38ced;
  border: 1px solid #99959e;
  border-radius: 5px;
  color: white;
  display: block;
  margin-top: 40px;
  font-size: 14px;
  &:hover {
    background-color: #53468b;
  }
`;

const StyledCell = styled.span`
  font-size: 12px;
`;

export default PostNoticeList;
