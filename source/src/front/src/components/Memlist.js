import React, {useEffect, useState} from 'react';
import {SERVER_URL} from "../constants";
import {DataGrid} from "@mui/x-data-grid";

function Memlist() {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetch(SERVER_URL + "members")
            .then(res => res.json())
            .then(data =>  setMembers(data._embedded.members))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetchMembers();
    }, []);

    const [open, setOpen] = useState(false);

    const jwtToken = sessionStorage.getItem("jwt");

    if (jwtToken !== null) {
        console.log(jwtToken);
    } else {
        console.log("토큰이 없습니다.");
    }


    const colums = [
        {
            field:
                '_links.member.href',
            headerName: '번호',
            sortable: false,
            filterable: false,
            renderCell: row =>
                <div>{(row.id).slice(-1)}</div>
        },
        {field: 'memId', headerName: '아이디' , width: 100},
        {field: 'type', headerName: '유형' , width: 100},
        {field: 'name', headerName: '이름' , width: 100},
        {field: 'bir', headerName: '생년월일' , width: 100},
        {field: 'tel', headerName: '전화번호' , width: 150},
        {field: 'gender', headerName: '성별' , width: 50},
        {field: 'email', headerName: '이메일' , width: 200},
        {field: 'addr', headerName: '주소' , width: 200},
        {field: 'jdate', headerName: '가일일' , width: 150},
        // {
        //     field:
        //         '_links.car.href',
        //     headerName: '',
        //     sortable: false,
        //     filterable: false,
        //     renderCell: row =>
        //         <button data={row} updateCar={updateCar}></button>
        // },
        {
            field:
                '_links.self.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =>
                <button onClick={() => onDelClick(row.id)}>Delete</button>
        }
    ]

    const fetchMembers = () => {

        const token = sessionStorage.getItem("jwt");

        fetch(SERVER_URL + 'api/members',{

            headers: { 'Authorization' : token}
        })
            .then(response => response.json())
            .then(data => setMembers(data._embedded.members))
            .catch(err => console.error(err))
    }
    const onDelClick = (url) => {
        if (window.confirm("삭제 전 한번 더 확인해 주세요")) {

            const token = sessionStorage.getItem("jwt");

            fetch(url, {method: 'DELETE',
                headers: { 'Authorization' : token}
            })
                .then(response => {
                    if (response.ok) {
                        fetchMembers();
                        setOpen(true);
                    } else {
                        alert('삭제에 실패 했습니다.');
                    }
                })
                .catch(err => console.error(err));
        }
    }

    return (
        <div style={{height: 500, width: '100%'}}>
            <DataGrid columns={colums} rows={members} getRowId={row => row._links.self.href}/>
        </div>
    );
}

export default Memlist;