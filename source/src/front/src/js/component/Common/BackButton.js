import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../css/component/BackButton.css';

function BackButton() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // 이전 페이지로 돌아갑니다.
    };

    return (
        <button className="BackButton" onClick={handleBackClick}>
            &lt;
        </button>
    );
}

export default BackButton;