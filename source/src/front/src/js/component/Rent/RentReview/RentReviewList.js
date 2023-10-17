import {SERVER_URL} from "../../Common/constants";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import CustomDataGrid from "../../Common/CustomDataGrid";
import styles from "../../../../css/component/Mypage/MypageComponent.module.css";
import File from "../../../../img/component/file.png";

export default function RentReviewList() {
    const [rentReviews, setRentReviews] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRentReviewPosts();
    }, []);

    const fetchRentReviewPosts = () => {
        fetch(SERVER_URL + "rentReview/")
            .then(response =>
                response.json())
            .then((data) => {
                console.log(data);
                const rentReviewWithNumbers= data.map((rentReviews, index) => ({
                    ...rentReviews,
                    id: rentReviews.postNum,
                    number: data.length - index, // 내림차순으로 번호 할당
                }));
                setRentReviews(rentReviewWithNumbers);
            })
            .catch(err => console.error(err));
    };


    const onRowClick = (params) => {
        const rowId = params.row.postNum;

        navigate(`/rent/reviewPost/${rowId}`);
    };


    const columns = [

        {
            field: "number",
            headerName: "번호",
            width: 60,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',

        },
        {
            field: 'title',
            headerName: '제목',
            flex:1,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,

            headerAlign: 'center',
            renderCell: (params) => (
                <div
                    style={{cursor: 'pointer'}}
                    onClick={() => onRowClick(params)}
                >
                    {params.value}
                </div>
            ),
        },
        {
            field: 'member',
            headerName: '작성자',
            width: 150,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            valueGetter: (params) => {
                const members = Array.isArray(params.row.member) ? params.row.member : [params.row.member];
                return members.map((m) => m.name).join(', ');
            }
        },
        {
            field: 'writeDate',
            headerName: '작성일',
            width: 150,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (params) => {
                //작성일을 JS Date 객체로 파싱
                const writeDate = new Date(params.value);
                //원하는 형식으로 날짜 포맷
                const formattedDate = `${writeDate.getFullYear()}-${String(writeDate.getMonth() + 1).padStart(2, '0')}-${String(writeDate.getDate()).padStart(2, '0')}`;

                return formattedDate;
            },
        },
        {
            field: 'pageView',
            headerName: '조회수',
            width: 100,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'postFiles',
            headerName: '파일',
            width: 80,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            sortable: false,
            filterable: false,
            renderCell: (row) => {
                return (
                    <div>
                        {row.value && row.value[0] && ( // 첫 번째 파일만 확인
                            <div style={{width: '24px', height: '24px', marginRight: '8px'}}>
                                <img
                                    src={File}
                                    alt='file'
                                    style={{maxWidth: '100%', maxHeight: '100%'}}
                                />
                            </div>
                        )}
                    </div>
                );
            },

        },

    ];

    function CustomNoRowsOverlay() {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    fontWeight: 'bold',
                    flexDirection: 'column',
                }}
            >
                <p>데이터가 없습니다.</p>
            </div>
        );
    }

    return (

        <div id={styles.active}>
            <div className={styles.main}>
                <div className={styles.posts}>
                    <div style={{ width: '100%'}}>
                        <CustomDataGrid
                            className={styles.customDataGrid}
                            columns={columns}
                            rows={rentReviews}
                            pageSize={5} // 페이지당 5개의 행을 보여줍니다.
                            getRowId={(row) => row.postNum}
                            components={{
                                NoRowsOverlay: CustomNoRowsOverlay
                            }}
                            pagination={true}

                        />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button onClick={() => navigate('/rent/reviewEdit')}
                                style={{
                                    width: "100px",
                                    height: "40px",
                                    backgroundColor: "#a38ced",
                                    color: "#ffffff",
                                    border:"1px solid #cccccc",
                                    borderRadius: '5px',
                                    fontSize: "15px",
                                    fontWeight: "bold",
                                    marginTop : "5%",
                                    marginBottom : "15%" }}>글쓰기</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}