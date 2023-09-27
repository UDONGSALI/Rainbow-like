
import React, {useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {SERVER_URL} from "../../../../js/component/Common/constants";
import {useNavigate} from "react-router-dom";
import styles from "../../../../css/component/Mypage/MyActivePost.module.css";


export default function MyActiveComment () {

    function CustomNoRowsOverlay() {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    fontWeight:'bold',
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
                <h3>내가 쓴 게시글 관리</h3>

            </div>
        </div>
    );
}

