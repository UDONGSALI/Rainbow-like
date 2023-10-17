import styles from '../../../css/component/Rent/RentSpace.module.css';
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from "../Common/constants";

function RentSpace() {
    const [spaces, setSpaces] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let spaceNum;
        fetch(SERVER_URL + `/spaces/${spaceNum}`)
            .then(response => response.json())
            .then(data => {
                setSpaces(data);

            })
            .catch(error => {
                alert('대관 장소 정보를 찾을 수 없습니다!');
                // window.location.href = '/rent/status';
            });
    }, []);

    return (
        <div id={styles.title}>
            <div className={styles.rentSpace}>

        </div>
        </div>
    );
}

export default RentSpace;