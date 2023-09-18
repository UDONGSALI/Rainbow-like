import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../css/component/Common/NavigationButton.css';

function NavigationButton({ name, url, fontSize = "calc(1vw + 1vh)" }) { // 기본값 설정
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate(url);
    };

    return (
        <button
            className="NavButton"
            onClick={handleButtonClick}
            style={{ fontSize: fontSize }} // 인라인 스타일로 폰트 사이즈 적용
        >
            {name}
        </button>
    );
}

export default NavigationButton;