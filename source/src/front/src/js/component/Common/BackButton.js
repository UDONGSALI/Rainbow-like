import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../css/component/Common/BackButton.module.css';

function BackButton() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // 이전 페이지로 돌아갑니다.
    };

    return (
        <button className={styles.backButton} onClick={handleBackClick}>
            &lt;
        </button>
    );
}

export default BackButton;
