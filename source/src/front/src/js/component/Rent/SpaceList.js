import React, {useEffect, useState} from "react";
import {SERVER_URL} from './constants';
import {DataGrid} from '@mui/x-data-grid';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";


function SpaceList() {
    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(true);
    //신청하기 버튼//
    function redirectToURL(){
        window.location.href="http://localhost:3000/rentApplication";
    };

    const columns = [
        {field: 'spaceName', headerName: '이름', width: 200},
        {field: 'maxPerson', headerName: '최대인원', width: 200},
        {field: 'spaceUsage', headerName: '공간용도', width: 200},
        {field: 'rentTime', headerName: '대관시간', width: 200},
        {field: 'rentFee', headerName: '이용료', width: 200},
        {field: 'facilities', headerName: '구비시설', width: 200},
        {field: 'date', headerName: '날짜', width: 200},
        {field: 'time', headerName: '시간', width: 200},
        {field: 'application', headerName: '예약신청', width: 200,
        renderCell :(params)=>(
            <Stack className="buttonWrap" spacing={2} direction="row">
                <Button className="button"
                        onClick={redirectToURL}
                        style={{
                            width: "80px",
                            height: "40px",
                            backgroundColor: "rgb(91,49,121)",
                            color: "rgb(255,255,255)",
                            borderRadius: '5px',
                            fontSize: "15px",
                            fontWeight: "bold",
                        }}>신청하기</Button>
            </Stack>
        )},

    ];

    useEffect(() => {
        fetch(SERVER_URL + 'api/spaces')
            .then(response => response.json())
            .then(data => {
                setSpaces(data._embedded.spaces);
                setLoading(false);
               })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);



    return (

    <div style={{height: 500, width: '100%'}}>

        {loading ? (
                <p>Loading....</p>
            ): (
            <DataGrid columns={columns}
                      rows={spaces}
                      getRowId={(row) => row._links.self.href}
                      />
            )}
    </div>
    );
}

export default SpaceList;