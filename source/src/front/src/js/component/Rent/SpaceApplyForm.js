import React, {useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {SERVER_URL} from "../Common/constants";

import dayjs from 'dayjs';
import CustomDataGrid from "../Common/CustomDataGrid";
import SpaceModal from "./SpaceModal";

function SpaceApplyForm() {
    const [spaces, setSpaces] = useState([]);
    const [rent,setRent] =useState([]);
     const [loadingSpaces, setLoadingSpaces] = useState(true);
    const [loadingRent, setLoadingRent] = useState(true);
    const [selectedTimes, setSelectedTimes] = useState([]);

    //시간 선택 관련
    const times = Array(18)
        .fill()
        .map((_, index) => {
            const hours = Math.floor(index / 2) + 9; // 9시부터 시작
            const minutes = index % 2 === 0 ? "00" : "30";
            return `${hours}:${minutes}`;
        }); // "09:00" ~ "17:30"이 담긴 배열 생성

    const timesRows = times.reduce((acc, curr, index) => {
        const rowIndex = Math.floor(index / 9);
        if (!acc[rowIndex]) {
            acc[rowIndex] = [];
        }
        acc[rowIndex].push(curr);
        return acc;
    }, []);

    const handleSelectTime = (spaceName, time) => {



        // 최초 선택 시, 연속으로 3개 선택
        const indexOfTime = times.indexOf(time);
        const selectedRowTimes = times.slice(indexOfTime, indexOfTime + 3);
        setSelectedTimes((prev) => ({ ...prev, [spaceName]: selectedRowTimes }));




        // 이미 예약된 시간이 포함되어 있는지 확인
        if (selectedRowTimes.some((selectedTime) => isTimeAlreadyReserved(spaceName, selectedTime))) {
            window.alert("선택한 시간 중 이미 예약된 시간이 포함되어 있습니다. 다른 시간을 선택해주세요.");
            return;
        }

        // 추가로 시간 선택
        const remainingTimes = times.slice(indexOfTime);
        const nextSelectedTime = remainingTimes.length > 0 ? remainingTimes[0] : null;

        if (nextSelectedTime) {
            setSelectedTimes((prev) => ({ ...prev, [spaceName]: [...selectedRowTimes, nextSelectedTime] }));
        }
    };


   // 이미 예약된 시간인지 확인하는 함수
    const isTimeAlreadyReserved = (spaceName, selectedTime) => {

        const reservedTimes = {
            "공유오피스(폴짝)": ["09:00", "09:30", "10:00"],
            // 다른 공간들에 대한 정보 추가
        };

        return reservedTimes[spaceName]?.includes(selectedTime);
    };



    //신청하기 버튼//
    function redirectToURL() {
        window.location.href = `http://localhost:3000/rent/apply`;
    };

    useEffect(() => {
        fetch(SERVER_URL + 'api/spaces')
            .then(response => response.json())
            .then(data => {
                setSpaces(data._embedded.spaces);
                setLoadingSpaces(false);
            })
            .catch(err => {
                console.error(err);
                setLoadingSpaces(false);
            });
    }, []);




    //Space 목록
    const lists = [
        {
            id: 1,
            spaceName: "공유오피스(폴짝)",
            maxPerson: "6명",
            spaceUsage: "소모임",
            rentTime: "1회/2시간",
            rentFee: "무료",
            facilities: "회의용 테이블, 의자",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/1/space1.jpg",

        },
        {
            id: 2,
            spaceName: "공유오피스(반짝)",
            maxPerson: "6명",
            spaceUsage: "소모임",
            rentTime: "1회/2시간",
            rentFee: "무료",
            facilities: "회의용 테이블, 의자",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/2/space2.jpg",

        },
        {
            id: 3,
            spaceName: "공유오피스(활짝)",
            maxPerson: "8명",
            spaceUsage: "개인, 단체 사무",
            rentTime: "1회/2시간",
            rentFee: "무료",
            facilities: "공용 PC 2대, 테이블, 의자, 프린터 1대",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/3/space3.jpg",
            // 다른 행들...
        },
        {
            id: 4,
            spaceName: "상담실(꼼지락)",
            maxPerson: "4명",
            spaceUsage: "상담실, 소모임",
            rentTime: "1회/2시간",
            rentFee: "무료",
            facilities: "쇼파, 테이블, 의자",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/4/space4.jpg",
            // 다른 행들...
        }, {
            id: 5,
            spaceName: "상담실(어슬렁)",
            maxPerson: "4명",
            spaceUsage: "상담실, 소모임",
            rentTime: "1회/2시간",
            rentFee: "무료",
            facilities: "쇼파, 테이블, 의자",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/5/space5.jpg",
            // 다른 행들...
        }, {
            id: 6,
            spaceName: "강의실(혜윰)",
            maxPerson: "24명",
            spaceUsage: "강의실",
            rentTime: "1회/1시간",
            rentFee: "5,000원",
            facilities: "전자 칠판, 전자 교탁, 세미나 테이블, 의자",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/6/space6.jpg",
            // 다른 행들...
        }, {
            id: 7,
            spaceName: "다목적 활동실(라온)",
            maxPerson: "20명",
            spaceUsage: "예술활동 및 운동 등",
            rentTime: "1회/1시간",
            rentFee: "5,000원",
            facilities: "빔, 스크린, 스피커, 노트북(대여), 마이크(유/무선, 핀마이크)",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/7/space7.jpg",
            // 다른 행들...
        },
        {
            id: 8,
            spaceName: "멀티미디어실(하람)",
            maxPerson: "24명",
            spaceUsage: "컴퓨터 관련 강의실",
            rentTime: "1회/1시간",
            rentFee: "20,000원",
            facilities: "컴퓨터, 전자 칠판, 전자 교탁",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/8/space8.jpg",
            // 다른 행들...
        },

    ];

    //칼럼
    const columns = [
        {
            field: 'spaceName', headerName: '공간', width: 400,
            renderCell: (params) => (
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <span style={{fontSize: "23px", fontWeight: "bold"}}>{params.row.spaceName}</span>
                        <p style={{fontSize: "15px"}}>최대인원 <span
                            style={{fontSize: "18px", fontWeight: "bold"}}>{params.row.maxPerson}</span></p>
                    </div>
                    <div>
                        <img
                            alt={params.row.spaceName}
                            src={params.row.imageURL}
                            style={{width: "350px", height: "250px", padding: "3%",marginLeft:'3%'}}
                        />

                    </div>
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center'
                    }}>
                        <SpaceModal spaceInfo={params.row}/>
                    </div>
                </div>),

        },


        {
            field: 'time', headerName: '시간 선택', width: 650,
            renderCell: (params) => (
                <div>
                    <div>
                        {/* 시간 선택 버튼들을 표시 */}
                        {timesRows.map((row, rowIndex) => (
                            <div key={rowIndex}>
                                {row.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => handleSelectTime(params.row.spaceName, time)}
                                        disabled={isTimeAlreadyReserved(params.row.spaceName, time)}
                                        style={{
                                            alignItems:'center',
                                            fontSize:"15px",
                                            width: '60px',
                                            margin: '5px',
                                            padding: '10px',
                                            border: '1px solid #cccccc',
                                            backgroundColor: selectedTimes[params.row.spaceName]?.includes(time)
                                                ? "lightblue"
                                                : isTimeAlreadyReserved(params.row.spaceName, time)
                                                    ? "lightgray"
                                                    : "white",
                                        }}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="selectedTime">
                        {/* 선택된 시간을 표시 */}
                        <p>선택된 시간: {selectedTimes[params.row.spaceName]?.[0]} ~ {selectedTimes[params.row.spaceName]?.[selectedTimes[params.row.spaceName]?.length - 1]}</p>
                    </div>

                    <div>
                        <Stack className="buttonWrap" spacing={2} direction="row" direction="row-reverse">
                            <Button className="button"
                                    onClick={redirectToURL}
                                    style={{
                                        width: "100px",
                                        height: "50px",
                                        backgroundColor: "#a38ced",
                                        color: "#ffffff",
                                        borderRadius: '5px',
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                        marginRight: "2%"

                                    }}>신청하기</Button>
                        </Stack>
                    </div>
                </div>
            ),

        }
    ]


    return (

        <div>

            {loadingSpaces ? (
                <p>Loading....</p>
            ) : (
                <CustomDataGrid className="spaceList"
                                columns={columns}
                                rows={lists}
                                getRowId={(params) => params.id}
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    paddingLeft: "15%",
                                    paddingRight: "15%",

                                }}


                                hideFooter={true}
                                rowHeight={400}

                />

            )}

        </div>
    );
}

export default SpaceApplyForm;