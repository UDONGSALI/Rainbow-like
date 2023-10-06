import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { SERVER_URL } from "../../component/Common/constants";
import { useNavigate } from 'react-router-dom';
import styles from '../../../css/component/Club/ClubList.module.css';
import SMSDtl from "./SMSDtl";

function SMSList() {
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSmsHistNum, setSelectedSmsHistNum] = useState(null); // 선택된 smsHistNum 상태 추가

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        fetch(SERVER_URL + "sms/hist")
            .then(response => response.json())
            .then((data) => {
                setPosts(data);
            })
            .catch(err => console.error(err));
    };

    const onModalClick = (smsHistNum) => { // smsHistNum 매개변수 추가
        setSelectedSmsHistNum(smsHistNum); // 선택된 smsHistNum 설정
        setIsModalOpen(true); // 모달 열기
    };

    const closeModal = () => {
        setSelectedSmsHistNum(null); // 모달이 닫힐 때 selectedSmsHistNum 초기화
        setIsModalOpen(false); // 모달 닫기
    };

    const columns = [
        {
            field: 'smsType',
            headerName: '타입',
            width: 100,
        },
        {
            field: 'sendTel',
            headerName: '송신번호',
            width: 200,
        },
        {
            field: 'content',
            headerName: '메세지',
            width: 400,
        },
        {
            field: 'sendDate',
            headerName: '보낸 일자',
            width: 300,
        }
    ];

    if (!posts) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.List} style={{ height: 500, width: '100%' }}>
            <DataGrid
                columns={columns}
                rows={posts}
                disableRowSelectionOnClick={true}
                getRowId={row => row.smsHistNum}
                onRowClick={(params) => onModalClick(params.row.smsHistNum)} // 모달 열릴 때 smsHistNum 전달
            />

            {isModalOpen && (
                <SMSDtl onClose={closeModal} histNum={selectedSmsHistNum} /> // 선택된 smsHistNum을 SMSDtl 컴포넌트로 전달
            )}
        </div>
    );
}

export default SMSList;
