import React, {useEffect, useRef} from 'react';
import MapComponent from "./MapComponent";
import styles from '../../../css/component/Main/Main.module.css';
import ImgContainer from "./ImgContainer";

const Main = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        const mainDiv = document.querySelector(`.${styles.Main}`);
        mainDiv.addEventListener('wheel', handleScroll, { passive: false });

        return () => {
            mainDiv.removeEventListener('wheel', handleScroll);
        };
    }, []);

    const handleScroll = (e) => {
        e.preventDefault();

        const direction = (e.deltaY > 0) ? 'down' : 'up';
        if (direction === 'down') {
            mapRef.current.scrollIntoView({ behavior: 'smooth' });

        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className={styles.Main} onWheel={handleScroll}>
            <ImgContainer/>
            <div className={styles.slide} ref={mapRef}>
                <MapComponent />
            </div>
            {/* 추가적인 슬라이드 아이템을 여기에 추가 */}
        </div>
    );
};

export default Main;