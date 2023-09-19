import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from "../Common/constants";
import File from '../../../img/component/file.png'

function PostList(props) {
    const { boardNum } = props;
    const [files, setFiles] = useState([]);
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(SERVER_URL + "files")
            .then(res => res.json())
            .then(data => setFiles(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [boardNum]);

    const fetchPosts = () => {
        fetch(SERVER_URL + "post/" + boardNum)
            .then(response => response.json())
            .then(data => {
                // 게시물 데이터와 첨부 파일 정보를 조합하여 저장합니다.
                const postsWithFiles = data.map(post => {
                    const postFiles = files.filter(file => file.post && file.post.postNum === post.postNum);
                    return {
                        ...post,
                        postsFiles: postFiles,
                    };
                });
                setPosts(postsWithFiles);
            })
            .catch(err => console.error(err));
    };

    const onDelClick = (url) => {
        fetch(url, { method: 'DELETE' })
            .then(response => {
                setOpen(true);
                fetchPosts(); // 게시글 삭제 후 목록 다시 불러오기
            })
            .catch(err => console.error(err));
    };

    const onEditClick = (params) => {
        const rowId = params.row.postNum;
        navigate(`/posts/edit/${rowId}`);
    };

    const onRowClick = (params) => {
        const rowId = params.row.postNum;
        navigate(`/notice/detail/${rowId}`);
    };

    const getRowId = (row) => {
        return row.postNum.toString();
    };

    const columns = [
        {
            field: '_links.member.href',
            headerName: '번호',
            sortable: false,
            filterable: false,
            renderCell: (row) => (
                <div>{row.id}</div>
            ),
            width: 100
        },
        {
            field: 'title',
            headerName: '제목',
            width: 300,
            renderCell: (params) => (
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => onRowClick(params)}
                >
                    {params.value}
                </div>
            ),
        },
        {
            field: 'member',
            headerName: '작성자',
            width: 100,
            valueGetter: (params) => {
                const members = Array.isArray(params.row.member) ? params.row.member : [params.row.member];
                return members.map((m) => m.name).join(', ');
            }
        },
        {
            field: 'pageView',
            headerName: '조회수',
            width: 100,
        },
        {
            field: 'postsFiles',
            headerName: '파일',
            sortable: false,
            filterable: false,
            renderCell: (row) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {row.value && row.value.length > 0 && (
                        <div style={{ width: '24px', height: '24px', marginRight: '8px' }}>
                            <img
                                src={File}
                                alt="File"
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                            />
                        </div>
                    )}
                </div>
            ),
            width: 100, // 이미지를 표시하는 컬럼의 너비 조정
        },
        {
            field: 'editLink',
            headerName: '수정',
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <button
                    style={{ cursor: 'pointer' }}
                    onClick={() => onEditClick(params)}
                >
                    수정
                </button>
            ),
        },
        {
            field: 'deleteLink',
            headerName: '삭제',
            sortable: false,
            filterable: false,
            renderCell: (row) => (
                <button
                    onClick={() => onDelClick(row.deleteLink)}
                >
                    삭제
                </button>
            ),
        },
    ];

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                columns={columns}
                rows={posts}
                disableRowSelectionOnClick={true}
                getRowId={getRowId}
            />
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message="게시글을 지웠습니다."
            />
            <button onClick={() => navigate('/clubs/new')}>새 게시글 작성</button>
        </div>
    );
}

export default PostList;