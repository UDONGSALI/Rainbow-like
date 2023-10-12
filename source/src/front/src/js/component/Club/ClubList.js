import React, {useState, useEffect} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import { SERVER_URL} from "../Common/constants";
import Snackbar from '@mui/material/Snackbar';
import {useNavigate } from 'react-router-dom';
import styles from '../../../css/component/Club/ClubList.module.css';


function ClubList(props) {
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const memId = sessionStorage.getItem("memId");
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";


    const columns = [

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
            field: 'title',
            headerName: '제목',
            width: 450,
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
            field: 'clubAllowStatus',
            headerName: '허가 현황',
            width: 100,
            renderCell: (params) => {
                switch (params.value) {
                    case 'WAIT':
                        return "대기";
                    case 'APPROVE':
                        return "허가";
                    case 'REJECT':
                        return "거부";
                }
            }
        },
        {
            field: 'clubRecuStatus',
            headerName: '현황',
            width: 100,
        },
        {
            field: 'pageView',
            headerName: '조회수',
            width: 100,
        },

    ];

    if (isAdmin) {
        columns.push(
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
                renderCell: (params) => (
                    <button
                        onClick={() => onDelClick(params.row)}
                    >
                        삭제
                    </button>
                ),
            }
        );
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () =>{
        fetch(SERVER_URL + "post/9")
            .then(response =>
                response.json())
            .then((data) => {
                // 필터링: delYN이 'N'인 게시물만 남김
                const filteredPosts = data.filter((post) => post.delYN === 'N');
                setPosts(filteredPosts);
            })
            .catch(err => console.error(err));
    };

    const onDelClick = (post) => {
        console.log(post);
        const updatedPostData = {

            memNum: post.member.memNum,
            boardNum: post.board.boardNum,
            title: post.title,
            content: post.content,
            writeDate: post.writeDate,
            editDate: post.editDate,
            pageView: post.pageView,
            parentsNum: post.parentsNum,
            clubAllowStatus: post.clubAllowStatus,
            clubRecuStatus: post.clubRecuStatus,
            delYN : 'Y'
        };

        // PUT 요청 보내기
        fetch(SERVER_URL + "posts/edit/" + post.postNum, {
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
                alert('게시글을 삭제했습니다.');
                fetchPosts();
                setOpen(true);

            })
            .catch((error) => {
                console.error('게시글 삭제 중 오류 발생:', error);
            });
    };

    const onEditClick = (params) => {

        const rowId = params.row.postNum;
        navigate(`/clubs/edit/${rowId}`);
    };


    const onRowClick = (params) => {
        const rowId = params.row.postNum;
        navigate(`/clubs/${rowId}`);
    };

    return (
        <div className={styles.List} style={{ height: 500, width: '100%' }}>
            <button onClick = {() => navigate('/clubs/new')}>소모임 신청</button>

            <DataGrid columns={columns}
                      rows={posts}
                      disableRowSelectionOnClick={true}
                      getRowId={row => row.postNum}
            />


            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message="게시글을 삭제했습니다."
            />

        </div>
    );
}

export default ClubList;