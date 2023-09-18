import React, {useState, useEffect} from "react";
import '../../../css/component/Club/ClubForm.css';
import { useParams} from "react-router-dom";
import {SERVER_URL} from "../Common/constants";
import {DataGrid} from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";

function Comment(){
    const { id } = useParams();
    const [comms, setComms] = useState('');
    const [open, setOpen] = useState(false);



    // 코멘트 불러오기
    const columns = [
        {
            field: 'commNum',
            headerName: '댓글 번호',
            width: 100
        },
        {
            field: 'post',
            headerName: '게시글 번호',
            width: 50,
            valueGetter: (params) => {
                const Posts = Array.isArray(params.row.post) ? params.row.post : [params.row.post];
                return Posts.map((p) => p.postNum).join(', ');
            }
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
            field: 'content',
            headerName: '댓글 본문',
            width: 400
        },
        {
            field: 'parentNum',
            headerName: '댓글부모번호',
            width: 100
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
        fetchComms();
    }, []);

    const fetchComms = () =>{
        fetch(SERVER_URL + "postnumcomm/" + id)
            .then(response =>
                response.json())
            .then(data =>
                setComms(data))
            .catch(err => console.error(err));
    };


    const onDelClick = (url) => {
        //코멘트 삭제
        fetch(url, {method: 'DELETE'})
            .then(response => {
                fetchComms();
                setOpen(true);
            })
            .catch(err => console.error(err))
    };

    const onEditClick = (params) => {
        //코멘트 수정
        const rowId = params.row.commNum;

    };





    //코멘트 입력
    const [formData, setFormData] = useState({
        postNum: id,
        memNum: 1,
        content: '',
        parentNum: ''

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        // 서버 메서드 호출하여 댓글 정보 전송
        fetch('http://localhost:8090/comments/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                alert('댓글을 작성했습니다.');

                setFormData({
                    postNum: id,
                    memNum: 1,
                    content: '',
                    parentNum: ''
                })




            })
            .then(response => {
                fetchComms();
                setOpen(true);
            })
            .catch((error) => {
                // 오류 처리
                console.error('Error:', error);
            });
    };


    return(
        <div className="comment">

            <div className="commList" style={{ height: 500, width: '100%' }}>
                <DataGrid columns={columns}
                          rows={comms}
                          disableRowSelectionOnClick={true}
                          getRowId={row => SERVER_URL + "api/comments/" + row.commNum}
                />


                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="댓글을 지웠습니다."
                />
            </div>
            <form onSubmit={handleSubmit} className="comment-form">
                <textarea name="content" cols='100'
                          value={formData.content}
                          onChange={handleChange}
                >
                </textarea>
                <button type={"submit"}>댓글작성</button>
            </form>
        </div>

    );
}

export default Comment;
