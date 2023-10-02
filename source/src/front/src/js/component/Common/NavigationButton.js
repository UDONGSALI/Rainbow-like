    import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import styles from '../../../css/component/Common/NavigationButton.module.css';

    function NavigationButton({ name, url, onClick, fontSize = "calc(1vw + 1vh)" }) {
        const navigate = useNavigate();

        const handleButtonClick = () => {
            if (url) {
                navigate(url);
            }

            if (onClick) {
                onClick();
            }
        };

        return (
            <button
                className={styles.navButton} // CSS module 적용
                onClick={handleButtonClick}
                style={{ fontSize: fontSize }}
            >
                <span>{name}</span>
            </button>
        );
    }

    export default NavigationButton;
