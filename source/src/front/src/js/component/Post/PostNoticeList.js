import React, {useState, useEffect} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import Snackbar from '@mui/material/Snackbar';
import {useNavigate} from 'react-router-dom';
import {SERVER_URL} from "../Common/constants";
import File from "../../../img/component/file.png";
import styled from '@emotion/styled';
import Pagination from "../Common/Pagination";

function PostNoticeList(props) {
    const {boardNum} = props;
    const [files, setFiles] = useState([]);
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState(1);
    const itemsCountPerPage = 10;
    const totalItemsCount = posts.length;
    const pageRangeDisplayed = 5;
    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    useEffect(() => {
        fetch(SERVER_URL + `post/${boardNum}`)
            .then(res => res.json())
            .then(data => {
                const reversedData = [...data].reverse();
                setPosts(reversedData);
            })
            .catch(err => console.error(err));
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

    const onDelClick = (url) => {
        fetch(url, {method: 'DELETE'})
            .then(response => {
                setOpen(true);
            })
            .catch(err => console.error(err));
    };

    const onEditClick = (params) => {
        const rowId = params.row.postNum;
        navigate(`/posts/edit/${rowId}`);
    };

    const getRowId = (row) => {
        return row.postNum.toString();
    };

    const onRowClick = (params) => {
        const rowId = params.row.postNum;
        navigate(`/post/detail/${rowId}`);
    };
    const columns = [
        {
            field: 'postNum',
            headerName: '번호',
            headerAlign: 'center',
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                    <CenteredData>
                        <StyledCell>
                        {params.row.postNum - 5}
                        </StyledCell>
                    </CenteredData>
            ),
            width: 50
        },
        {
            field: 'title',
            headerName: '제목',
            headerAlign: 'center',
            width: 350,
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
            width: 80,
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
            width: 80,
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
                       <div>
                        {row.value && row.value[0] && ( // 첫 번째 파일만 확인
                            <div style={{width: '24px', height: '24px', marginRight: '8px'}}>
                                <img
                                    src={File}
                                    alt='file'
                                    style={{maxWidth: '100%', maxHeight: '100%'}}
                                />
                            </div>
                        )}
                       </div>
                );
            },
            width: 50,
        },
        {
            field: 'writeDate',
            headerName: '작성일',
            headerAlign: 'center',
            width: 100,
            renderCell: (params) => (
                <CenteredData>
                    <StyledCell>
                    {params.value.slice(0, 10)}
                </StyledCell>
                </CenteredData>

            )
        },
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
                        onClick={() => onDelClick(params.row.deleteLink)}
                    >
                        삭제
                    </DeleteButton>
                </CenteredData>
            ),
        },
    ];

    return (
        <div style={{display: 'flex', flexDirection: 'column',
            alignItems: 'center',width:'100%' }}>
            <DataGrid
                columns={columns}
                rows={postsWithFiles}
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
            <NewPost onClick={() => navigate('/clubs/new')}>
                등록
            </NewPost>
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
