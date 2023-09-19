import React, {useState, useEffect} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import { SERVER_URL} from "./constants";
import Snackbar from '@mui/material/Snackbar';
<<<<<<< HEAD
import {useNavigate } from 'react-router-dom';

function PostList(props) {
    const { boardNum } = props;
=======
import {useNavigate, useParams } from 'react-router-dom';

function PostList() {
>>>>>>> 4d1ef37 (no message)
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();


    const columns = [
<<<<<<< HEAD
        {
            field: 'board',
=======
        {field: 'board',
>>>>>>> 4d1ef37 (no message)
            headerName: 'Board',
            width: 200,
            valueGetter: (params) => {
                const boards = Array.isArray(params.row.board) ? params.row.board : [params.row.board];
                return boards.map((b) => b.boardName).join(', ');
            }
<<<<<<< HEAD
        },
=======
            },
>>>>>>> 4d1ef37 (no message)
        {
            field: 'member',
            headerName: 'Members',
            width: 200,
            valueGetter: (params) => {
<<<<<<< HEAD
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
=======
                // member 필드가 배열이 아닌 경우에 대비하여 체크합니다.
                const members = Array.isArray(params.row.member) ? params.row.member : [params.row.member];
                return members.map((m) => m.memNum).join(', ');
            }},
        {field: 'title', headerName: 'Title', width: 200},
        {field: 'pageView', headerName: 'PageView', width: 150},
        {field: '_links.self.href',
            headerName: '',
            sortable: false,
            filterable:false,
            renderCell:row =>
                <button
                    onClick={() => onDelClick(row.id)}>Delete
                </button>
>>>>>>> 4d1ef37 (no message)
        }
    ];

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () =>{
<<<<<<< HEAD
        fetch(SERVER_URL + "post/"+boardNum)
=======
        fetch(SERVER_URL + "posts/")
>>>>>>> 4d1ef37 (no message)
            .then(response =>
               response.json())
            .then(data =>
                setPosts(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
<<<<<<< HEAD
        fetch(SERVER_URL + "post/"+boardNum)
=======
        fetch(SERVER_URL + "posts/")
>>>>>>> 4d1ef37 (no message)
            .then(response =>
                response.json())
            .then(data =>
                setPosts(data))
            .catch(err => console.error(err));
    }, []);


<<<<<<< HEAD
    const onDelClick = ( url) => {

=======
    const onDelClick = (url) => {
>>>>>>> 4d1ef37 (no message)
        fetch(url, {method: 'DELETE'})
            .then(response => {
                fetchPosts();
                setOpen(true);
            })
            .catch(err => console.error(err))
<<<<<<< HEAD
    };

    const onEditClick = (params) => {

        const rowId = params.row.postNum;
        navigate(`/posts/edit/${rowId}`);
    };
=======
    }
>>>>>>> 4d1ef37 (no message)


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
<<<<<<< HEAD
                    />

=======
                      onRowClick={onRowClick}/>
>>>>>>> 4d1ef37 (no message)

            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message="게시글을 지웠습니다."
            />
<<<<<<< HEAD
            <button onClick = {() => navigate('/clubs/new')}>새 게시글 작성</button>

=======
>>>>>>> 4d1ef37 (no message)
        </div>


    );
}

export default PostList;