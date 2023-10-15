import React, {useEffect, useRef, useState} from 'react';
import MapComponent from "./Map/MapComponent";
import styles from '../../../css/component/Main/Main.module.css';
import ImgContainer from "./ImgContainer";
import EduContainer from "./Edu/EduContainer";

function Main() {
    const imgContainerRef = useRef(null);
    const eduContainerRef = useRef(null);
    const mapComponentRef = useRef(null);
    const [activeSlide, setActiveSlide] = useState(0);  // 현재 활성화된 슬라이드를 추적하는 상태

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
            if (activeSlide === 0) {
                eduContainerRef.current.scrollIntoView({ behavior: 'smooth' });
                setActiveSlide(1);
            } else if (activeSlide === 1) {
                mapComponentRef.current.scrollIntoView({ behavior: 'smooth' });
                setActiveSlide(2);
            }
        } else {
            if (activeSlide === 2) {
                eduContainerRef.current.scrollIntoView({ behavior: 'smooth' });
                setActiveSlide(1);
            } else if (activeSlide === 1) {
                imgContainerRef.current.scrollIntoView({ behavior: 'smooth' });
                setActiveSlide(0);
            }
        }
    };

    return (
        <div className={styles.Main} onWheel={handleScroll}>
            <div ref={imgContainerRef}>
                <ImgContainer />
            </div>
            <div className={styles.slide} ref={eduContainerRef}>
                <EduContainer />
            </div>
            <div className={styles.slide} ref={mapComponentRef}>
                <MapComponent />
            </div>
        </div>
    );
};


export default Main;