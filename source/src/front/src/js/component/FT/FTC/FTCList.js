import React, {useState, useEffect} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {SERVER_URL} from "../../Common/constants";
import {useNavigate } from 'react-router-dom';
import styles from '../../../../css/component/Club/ClubList.module.css';

function FTCList(){
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";

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
        },

        {
            field: 'ftmYN',
            headerName: '매칭여부',
            width: 100,
        },
        {
            field: 'statusDtl',
            headerName: '거부사유',
            width: 500,
        },
    ];

    const onEditClick = (params) => {

        const rowId = params.row.ftConsumerNum;
        navigate(`/ftc/edit/${rowId}`);
    };


    const onRowClick = (params) => {
        console.log(params.row.ftConsumerNum);
        const rowId = params.row.ftConsumerNum;
        navigate(`/ftc/dtl/${rowId}`);
    };

    return(
        <div className={styles.List} style={{ height: 500, width: '100%' }}>
            <button onClick={() => {
                const path = isAdmin ? '/admin/ftmain' : '/ftmain';
                navigate(path);
            }}>
                DB 메인
            </button>

            <DataGrid columns={columns}
                      rows={posts}
                      disableRowSelectionOnClick={true}
                      getRowId={row => row.ftConsumerNum}
                      onRowClick={onRowClick}
            />


        </div>
    );
}

export default FTCList;