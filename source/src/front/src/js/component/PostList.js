import React, {useState, useEffect} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import { SERVER_URL} from "./constants";
import Snackbar from '@mui/material/Snackbar';
import {useNavigate } from 'react-router-dom';

function PostList() {
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();


    const columns = [
        {
            field: 'board',
            headerName: 'Board',
            width: 200,
            valueGetter: (params) => {
                const boards = Array.isArray(params.row.board) ? params.row.board : [params.row.board];
                return boards.map((b) => b.boardName).join(', ');
            }
        },
        {
            field: 'member',
            headerName: 'Members',
            width: 200,
            valueGetter: (params) => {
                const members = Array.isArray(params.row.member) ? params.row.member : [params.row.member];
                return members.map((m) => m.memNum).join(', ');
            }
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 200,
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
            field: 'pageView',
            headerName: 'PageView',
            width: 150,
        },
        {
            field: 'links.self.href',
            headerName: '수정',
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <button
                    style={{ cursor: 'pointer' }}
                    onClick={() => onEditClick(params)}
                >
                    {params.value}
                    수정
                </button>
            ),
        },
        {
            field: '_links.self.href',
            headerName: '삭제',
            sortable: false,
            filterable: false,
            renderCell: (row) => (
                <button
                    onClick={() => onDelClick(row.id)}
                >
                    삭제
                </button>
            ),
        }
    ];

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () =>{
        fetch(SERVER_URL + "posts/")
            .then(response =>
               response.json())
            .then(data =>
                setPosts(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetch(SERVER_URL + "posts/")
            .then(response =>
                response.json())
            .then(data =>
                setPosts(data))
            .catch(err => console.error(err));
    }, []);


    const onDelClick = ( url) => {

        fetch(url, {method: 'DELETE'})
            .then(response => {
                fetchPosts();
                setOpen(true);
            })
            .catch(err => console.error(err))
    };

    const onEditClick = (params) => {

        const rowId = params.row.postNum;
        navigate(`/posts/edit/${rowId}`);
    };


    const onRowClick = (params) => {
        const rowId = params.row.postNum;
        navigate(`/posts/${rowId}`);
    };

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid columns={columns}
                      rows={posts}
                      disableRowSelectionOnClick={true}
                      getRowId={row => SERVER_URL + "api/posts/" + row.postNum}
                    />


            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message="게시글을 지웠습니다."
            />
            <button onClick = {() => navigate('/clubs/new')}>새 게시글 작성</button>

        </div>


    );
}

export default PostList;