import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from "../Common/constants";
import File from "../../../img/component/file.png";

function PostNoticeList(props) {
    const { boardNum } = props;
    const [files, setFiles] = useState([]);
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(SERVER_URL + "post/1")
            .then(res => res.json())
            .then(data => {
                setPosts(data);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetch(SERVER_URL + "files/post")
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
        fetch(url, { method: 'DELETE' })
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
        const rowId = params.row.postNum + 5;
        navigate(`/post/detail/${rowId}`);
    };

    const columns = [
        {
            field: 'postNum',
            headerName: '번호',
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <div>{params.row.postNum - 5}</div>
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
            field: 'postFiles',
            headerName: '파일',
            sortable: false,
            filterable: false,
            renderCell: (row) => {
                return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {row.value && row.value[0] && ( // 첫 번째 파일만 확인
                            <div style={{ width: '24px', height: '24px', marginRight: '8px', cursor: 'pointer' }}>
                                <img
                                    src={File}
                                    alt='file'
                                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                                />
                            </div>
                        )}
                    </div>
                );
            },
            width: 100,
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
            renderCell: (params) => (
                <button
                    onClick={() => onDelClick(params.row.deleteLink)}
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
                rows={postsWithFiles}
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

export default PostNoticeList;
