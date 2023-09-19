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
                    onClick={() => onDelClick(row)}>Delete
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


    const onDelClick = (post) => {
        console.log(post);
        const updatedPostData = {

            memNum: post.member.memNum,
            boardNum: post.board.boardNum,
            title: post.post.title,
            content: post.post.content,
            writeDate: post.post.writeDate,
            editDate: post.post.editDate,
            pageView: post.post.pageView,
            parentsNum: post.post.parentsNum,
            clubAllowStatus: post.post.clubAllowStatus,
            clubRecuStatus: post.post.clubRecuStatus,
            delYN : post.post.delYN
        };

        // PUT 요청 보내기
        fetch(SERVER_URL + "posts/edit" + post.postNum, {
            method: 'PUT', // PUT 요청을 사용
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPostData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                alert('댓글을 삭제했습니다.');
                fetchPosts();
                setOpen(true);
            })
            .catch((error) => {
                console.error('댓글 삭제 중 오류 발생:', error);
            });
    };


    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid columns={columns} rows={posts} disableRowSelectionOnClick={true} getRowId={row => row.postNum} />

            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message="게시글을 지웠습니다."
            />
        </div>


    );
}

export default ClubList;