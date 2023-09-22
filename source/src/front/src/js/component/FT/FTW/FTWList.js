import React, {useState, useEffect} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {SERVER_URL} from "../../Common/constants";
import {useNavigate } from 'react-router-dom';
import styles from '../../../../css/component/Club/ClubList.module.css';

function FTWList(){
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () =>{
        fetch(SERVER_URL + "ftw")
            .then(response =>
                response.json())
            .then((data) => {
                // 필터링: delYN이 'N'인 게시물만 남김
                const filteredPosts = data.filter((post) => post.delYN === 'N');
                setPosts(filteredPosts);
            })
            .catch(err => console.error(err));
    };


    const columns = [
        {
            field: 'ftWorkerNum',
            headerName: 'DB',
            width: 50,
        },
        {
            field: 'member',
            headerName: '인재명',
            width: 100,
            valueGetter: (params) => {
                const members = Array.isArray(params.row.member) ? params.row.member : [params.row.member];
                return members.map((m) => m.name).join(', ');
            }
        },
        {
            field: 'speField',
            headerName: '분류',
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
            field: 'licenseYN',
            headerName: '자격증 유무',
            width: 100,
        },
        {
            field: 'ftStatus',
            headerName: '등록여부',
            width: 100,
        },
        {
            field: 'statusDtl',
            headerName: '거부사유',
            width: 300,
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
            renderCell: (params) => (
                <button
                    onClick={() => onDelClick(params.row)}
                >
                    삭제
                </button>
            ),
        }
    ];

    const onDelClick = (post) => {
        const updatedPostData = {
            memNum: post.member.memNum,
            speField: post.speField,
            licenseYN: post.licenseYN,
            licenseDtl: post.licenseDtl,
            ftDtl: post.ftDtl,
            ftStatus: post.ftStatus,
            writeDate: post.writeDate,
            editDate: new Date(),
            delYN : 'Y'
        };
        console.log(updatedPostData);


        // PUT 요청 보내기
        fetch(SERVER_URL + "ftw/edit/" + post.ftWorkerNum, {
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

        const rowId = params.row.ftWorkerNum;
        navigate(`/ftw/edit/${rowId}`);
    };


    const onRowClick = (params) => {
        console.log(params.row.ftWorkerNum);
        const rowId = params.row.ftWorkerNum;
        navigate(`/ftw/${rowId}`);
    };

    return(
        <div className={styles.List} style={{ height: 500, width: '100%' }}>
            <button  onClick = {() => navigate('/ftmain')}>DB 메인</button>

            <DataGrid columns={columns}
                      rows={posts}
                      disableRowSelectionOnClick={true}
                      getRowId={row => row.ftWorkerNum}
            />


        </div>
    );
}

export default FTWList;