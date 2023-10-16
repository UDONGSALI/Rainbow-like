// EduContainer.jsx
import React, { useState, useEffect } from 'react';
import CustomCalendar from "./CustomCalendar";
import ThumbnailComponent from "./ThumbnailComponent";
import useFetch from "../../hook/useFetch";
import { SERVER_URL } from "../../Common/constants";
import styles from '../../../../css/component/Main/Edu/EduContainer.module.css'

function EduContainer() {
    const [edus, setEdus] = useState([]);
    const { data: fetchedEdus, loading } = useFetch(`${SERVER_URL}edus`);

    useEffect(() => {
        if (!loading) {
            setEdus(fetchedEdus.reverse().slice(0, 4));
        }
    }, [loading, fetchedEdus]);

    return (
        <div className={styles.EduContainer}>
            <h1><strong>교육 및 사업 일정</strong></h1>
            <CustomCalendar edus={edus}/>
            <ThumbnailComponent basicEdus={edus}/>
        </div>
    )
}

export default EduContainer;