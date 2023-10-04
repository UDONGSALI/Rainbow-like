import React, {useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {SERVER_URL} from "../Common/constants";
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import CustomDataGrid from "../Common/CustomDataGrid";
import SpaceModal from "./SpaceModal";

function SpaceApplyForm() {
    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = React.useState(dayjs('2022-01-01 T09:00'));
    const [selectedTime, setSelectedTime] = useState(null);

    //시간 관련
    // 허용할 최소 및 최대 시간 설정
    const minTime = dayjs().hour(9).minute(0); // 오전 9:00
    const maxTime = dayjs().hour(17).minute(30); // 오후 5:30

    // 비활성화할 시간대 설정 (9:00 이전과 17:30 이후)
    const disabledHours = (hour) => {
        if (hour >= minTime.hour()) {
            return true;
        }
        return false;
    };

    const disabledMinutes = (hour, minute) => {
        if (hour === minTime.hour() && minute >= minTime.minute()) {
            return true;
        }
        return false;
    };


    //신청하기 버튼//
    function redirectToURL() {
        window.location.href = "http://localhost:3000/rent/application/{:spaceNum}";
    };

    //이미지 목록
    const rows = [
        {
            id: 1,
            spaceName: "공유오피스(폴짝)",
            maxPerson: "6명",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/1/space1.jpg", // 첫 번째 행의 이미지 URL

        },
        {
            id: 2,
            spaceName: "공유오피스(반짝)",
            maxPerson: "6명",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/2/space2.jpg", // 첫 번째 행의 이미지 URL

        },
        {
            id: 3,
            spaceName: "공유오피스(활짝)",
            maxPerson: "8명",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/3/space3.jpg", // 첫 번째 행의 이미지 URL
            // 다른 행들...
        },
        {
            id: 4,
            spaceName: "상담실(꼼지락)",
            maxPerson: "4명",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/4/space4.jpg", // 첫 번째 행의 이미지 URL
            // 다른 행들...
        }, {
            id: 5,
            spaceName: "상담실(어슬렁)",
            maxPerson: "4명",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/5/space5.jpg", // 첫 번째 행의 이미지 URL
            // 다른 행들...
        }, {
            id: 6,
            spaceName: "강의실(혜윰)",
            maxPerson: "24명",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/6/space6.jpg", // 첫 번째 행의 이미지 URL
            // 다른 행들...
        }, {
            id: 7,
            spaceName: "다목적 활동실(라온)",
            maxPerson: "20명",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/7/space7.jpg", // 첫 번째 행의 이미지 URL
            // 다른 행들...
        },
        {
            id: 8,
            spaceName: "멀티미디어실(하람)",
            maxPerson: "24명",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/8/space8.jpg", // 첫 번째 행의 이미지 URL
            // 다른 행들...
        },

    ];

    //칼럼
    const columns = [
            {
                field: 'spaceName', headerName: '공간', width: 420,
                renderCell: (params) => (
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <span style={{fontSize: "23px", fontWeight: "bold"}}>{params.row.spaceName}</span>
                            <p style={{fontSize: "15px"}}>최대인원 <span
                                style={{fontSize: "18px", fontWeight: "bold"}}>{params.row.maxPerson}</span></p>
                        </div>
                        <div>
                            <img
                                alt={params.row.spaceName}
                                src={params.row.imageURL}
                                style={{width: "400px", height: "250px", padding: "3%"}}
                            />

                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'
                        }}>
                            <SpaceModal spaceInfo={params.row.spaceName}/>
                        </div>
                    </div>),

            },


            {
                field: 'time', headerName: '시간 선택', width: 600,
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
                                    views={['hours', 'minutes']}
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
                                    views={['hours', 'minutes']}
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
                <CustomDataGrid className="spaceList"
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
                                rowHeight={400}

                />

            )}

        </div>
    );
}

export default SpaceApplyForm;