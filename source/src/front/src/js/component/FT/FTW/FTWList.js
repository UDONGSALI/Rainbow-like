import React, {useState, useEffect} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {SERVER_URL} from "../../Common/constants";
import {useNavigate } from 'react-router-dom';
import styles from '../../../../css/component/Club/ClubList.module.css';

function FTWList({ftcNum}){
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const ftmMode = ftcNum != null;
    const [checkedRows, setCheckedRows] = useState({}); // 개별 체크 상태를 저장하는 객체


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
                console.log(posts);

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


    ];

    //조건부 컬럼 설정
    if (ftmMode) {
        columns.unshift({
            field: 'checkbox',
            headerName: '체크박스',
            width: 120,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <input
                    type="checkbox"
                    checked={!!checkedRows[params.row.ftWorkerNum]}
                    onChange={() => handleRowCheckboxChange(params)}                />
            ),
        });
    }

    // ftmMode가 false일 때만 수정 버튼과 삭제 버튼 컬럼을 추가
    if (!ftmMode) {
        columns.push(
            // 수정 버튼 컬럼 정의
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
            // 삭제 버튼 컬럼 정의
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

    const onDelClick = (post) => {
        const updatedPostData = {
            memNum: post.member.memNum,
            speField: post.speField,
            licenseYN: post.licenseYN,
            licenseDtl: post.licenseDtl,
            ftDtl: post.ftDtl,
            ftStatus: post.ftStatus,
            statusDtl: post.statusDtl,
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

    const handleRowCheckboxChange = (params) => {
        const { ftWorkerNum } = params.row;

        // 개별 체크 상태를 복사한 후 해당 행의 체크 상태를 설정
        const newCheckedRows = { ...checkedRows };
        newCheckedRows[ftWorkerNum] = !newCheckedRows[ftWorkerNum]; // 상태를 토글

        if (!newCheckedRows[ftWorkerNum]) {
            // 체크 해제된 경우, 해당 행의 체크 상태를 삭제
            delete newCheckedRows[ftWorkerNum];
        }

        setCheckedRows(newCheckedRows);
        console.log(checkedRows);
    };

    const onEditClick = (params) => {

        const rowId = params.row.ftWorkerNum;
        navigate(`/ftw/edit/${rowId}`);
    };


    const onRowClick = (params) => {
        const rowId = params.row.ftWorkerNum;
        if (ftmMode) {
            const popupWindow = window.open(`/ftw/${rowId}`, '_blank', 'width=1000,height=600');
        } else {
            navigate(`/ftw/${rowId}`);
        }
    };

    return(
        <div className={styles.List} style={{ height: 500, width: '100%' }}>
            { ftmMode?
                null
                :
                <button  onClick = {() => navigate('/ftmain')}>DB 메인</button>
            }
            <DataGrid columns={columns}
                      rows={posts}
                      disableRowSelectionOnClick={true}
                      getRowId={row => row.ftWorkerNum}
            />
            {ftmMode ?
                <div>
                    <h2>선택된 Row 정보:</h2>
                    <ul>
                        {Object.keys(checkedRows).map(rowId => (
                            <li key={rowId}>
                                {/*{row.id}: {row.member.name}, {row.speField}*/}
                                {rowId}: {posts.find(post => post.ftWorkerNum === parseInt(rowId))?.member.name}, {posts.find(post => post.ftWorkerNum === parseInt(rowId))?.speField}
                            </li>
                        ))}
                    </ul>
                </div>
                :
                null
            }
        </div>
    );
}

export default FTWList;