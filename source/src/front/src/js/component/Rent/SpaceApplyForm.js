import React, {useEffect, useState} from "react";

import {DataGrid} from '@mui/x-data-grid';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {SERVER_URL} from "../Common/constants";
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';

function SpaceList() {
    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = React.useState(dayjs('2022-01-01 T09:00'));
    const [selectedTime, setSelectedTime] = useState(null);

    // 허용할 최소 및 최대 시간 설정
    const minTime = dayjs().hour(9).minute(0); // 오전 9:00
    const maxTime = dayjs().hour(17).minute(30); // 오후 5:30

    // 비활성화할 시간대 설정 (9:00 이전과 17:30 이후)
    const disabledHours = () => {
        const hours = [];
        for (let i = 0; i < 24; i++) {
            if (i < minTime.hour() || i > maxTime.hour()) {
                hours.push(i);
            }
        }
        return hours;
    };

    const disabledMinutes = (hour) => {
        const minutes = [];
        if (hour === minTime.hour()) {
            // 허용하는 시간대의 시작 시간인 경우
            for (let i = 0; i < minTime.minute(); i++) {
                minutes.push(i);
            }
        }
        if (hour === maxTime.hour()) {
            // 허용하는 시간대의 종료 시간인 경우
            for (let i = maxTime.minute() + 1; i < 60; i++) {
                minutes.push(i);
            }
        }
        return minutes;
    };


    //신청하기 버튼//
    function redirectToURL() {
        window.location.href = "http://localhost:3000/rent/application/{:spaceNum}";
    };

    const rows = [
        {
            id: 1,
            spaceName: "공유오피스(폴짝)",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/1/space1.jpg", // 첫 번째 행의 이미지 URL

        },
        {
            id: 2,
            spaceName: "공유오피스(반짝)",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/2/space2.jpg", // 첫 번째 행의 이미지 URL

        },
        {
            id: 3,
            spaceName: "공유오피스(활짝)",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/3/space3.jpg", // 첫 번째 행의 이미지 URL
            // 다른 행들...
        },
        {
            id: 4,
            spaceName: "상담실(꼼지락)",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/4/space4.jpg", // 첫 번째 행의 이미지 URL
            // 다른 행들...
        }, {
            id: 5,
            spaceName: "상담실(어슬렁)",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/5/space5.jpg", // 첫 번째 행의 이미지 URL
            // 다른 행들...
        }, {
            id: 6,
            spaceName: "강의실(혜윰)",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/6/space6.jpg", // 첫 번째 행의 이미지 URL
            // 다른 행들...
        }, {
            id: 7,
            spaceName: "다목적 활동실(라온)",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/7/space7.jpg", // 첫 번째 행의 이미지 URL
            // 다른 행들...
        },
        {
            id: 8,
            spaceName: "멀티미디어실(하람)",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/8/space8.jpg", // 첫 번째 행의 이미지 URL
            // 다른 행들...
        },

    ];


    const columns = [
            {field: 'spaceName', headerName: '공간명', width: 400,
                renderCell: (params) => (
                    <img
                        alt={params.row.spaceName}
                        src={params.row.imageURL}
                        style={{ width: "100%", height: "100%", padding:"5%" }} // 이미지 크기 설정
                    />),

            },

            {
                field: 'time', headerName: '시간', width: 700,
                renderCell: () => (
                    <Stack className="buttonWrap" spacing={2} direction="row">
                        {/* TimePicker를 사용하여 시간 선택 */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker', 'TimePicker']}>
                                <TimePicker
                                    label="시작시간"
                                    defaultValue={dayjs('2022-01-01 T09:00')}
                                    ampm={false}
                                    minutesStep={30}
                                    views={['hours','minutes']}
                                    minTime={minTime}
                                    maxTime={maxTime}
                                    disabledHours={disabledHours}
                                    disabledMinutes={disabledMinutes}
                                />
                                <TimePicker
                                    label="종료시간"
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                    ampm={false}
                                    minutesStep={30}
                                    views={['hours','minutes']}
                                    disabledHours={disabledHours}
                                    disabledMinutes={disabledMinutes}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Stack>
                )
            },
            {
                field: 'application', headerName:
                    '예약신청', width:
                    200,
                renderCell:
                    () => (
                        <Stack className="buttonWrap" spacing={2} direction="row">
                            <Button className="button"
                                    onClick={redirectToURL}
                                    style={{
                                        width: "80px",
                                        height: "40px",
                                        backgroundColor: "#a38ced",
                                        color: "#ffffff",
                                        borderRadius: '5px',
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                    }}>신청하기</Button>
                        </Stack>
                    )
            }
            ,

        ]
    ;



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

        <div>

            {loading ? (
                <p>Loading....</p>
            ) : (
                <DataGrid className="spaceList"
                          columns={columns}
                          rows={rows}
                          getRowId={(row) => row.id}
                          style={{
                              position: "relative",
                              width: "100%",
                              paddingLeft: "15%",
                              paddingRight: "15%",

                          }}
                          hideFooter={true}
                          rowHeight={250}
                />
            )}
        </div>
    );
}

export default SpaceList;