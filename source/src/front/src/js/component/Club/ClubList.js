import React, {useState, useEffect} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import { SERVER_URL} from "../Common/constants";
import Snackbar from '@mui/material/Snackbar';

function ClubList() {
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);

    const columns = [
        {field: 'board',
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
                return members.map((m) => m.name).join(', ');
            }},
        {field: 'title', headerName: 'Title', width: 200},
        {field: 'content', headerName: 'Content', width: 150},
        {field: '_links.self.href',
            headerName: '',
            sortable: false,
            filterable:false,
            renderCell:row =>
                <button
                    onClick={() => onDelClick(row.id)}>Delete
                </button>
        }
    ];

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () =>{
        fetch(SERVER_URL + "clubs/")
            .then(response =>
               response.json())
            .then(data =>
                setPosts(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetch(SERVER_URL + "clubs/")
            .then(response =>
                response.json())
            .then(data =>
                setPosts(data))
            .catch(err => console.error(err));
    }, []);


    const onDelClick = (url) => {
        fetch(url, {method: 'DELETE'})
            .then(response => {
                fetchPosts();
                setOpen(true);
            })
            .catch(err => console.error(err))
    }


    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid columns={columns} rows={posts} disableRowSelectionOnClick={true} getRowId={row => "http://localhost:8090/api/posts/" + row.postNum} />

            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message="게시글을 지웠습니다."
            />
        </div>

<<<<<<< HEAD
=======

        // <div>
        //     <table>
        //         <tbody>
        //         {
        //             posts &&
        //             posts.map((post, index) =>
        //             <tr key={index}>
        //                 <td>{post.title}</td>
        //                 <td>{post.content}</td>
        //             </tr>)
        //         }
        //         </tbody>
        //     </table>
        // </div>



>>>>>>> 4d1ef37 (no message)
    );
}

export default ClubList;