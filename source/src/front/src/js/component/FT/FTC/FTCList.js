import React, {useState, useEffect} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {SERVER_URL} from "../../Common/constants";
import {useNavigate } from 'react-router-dom';
import styles from '../../../../css/component/Club/ClubList.module.css';

function FTCList(){
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () =>{
        fetch(SERVER_URL + "ftc")
            .then(response =>
                response.json())
            .then((data) => {
                setPosts(data);
            })
            .catch(err => console.error(err));
    };


    const columns = [
        {
            field: 'ftConsumerNum',
            headerName: 'DB',
            width: 50,
        },
        {
            field: 'member',
            headerName: '신청자',
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
            field: 'FtmYN',
            headerName: '매칭여부',
            width: 100,
        },
        {
            field: 'statusDtl',
            headerName: '거부사유',
            width: 400,
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
    ];

    const onEditClick = (params) => {

        const rowId = params.row.ftConsumerNum;
        navigate(`/ftc/edit/${rowId}`);
    };


    const onRowClick = (params) => {
        console.log(params.row.ftConsumerNum);
        const rowId = params.row.ftConsumerNum;
        navigate(`/ftc/${rowId}`);
    };

    return(
        <div className={styles.List} style={{ height: 500, width: '100%' }}>
            <button  onClick = {() => navigate('/ftmain')}>DB 메인</button>

            <DataGrid columns={columns}
                      rows={posts}
                      disableRowSelectionOnClick={true}
                      getRowId={row => row.ftConsumerNum}
            />


        </div>
    );
}

export default FTCList;