import React, { useEffect, useState } from 'react';
import Purpose from '../../component/Intro/Purpose';
import SpaceIntro from '../../component/Intro/SpaceIntro';
import { Element, scroller } from 'react-scroll';
import Greeting from "../../component/Intro/Greeting";
import styles from '../../../css/pages/Intro/IntroPage.module.css';
import AgenHistory from "../../component/Intro/AgenHistory";
import MapComponent from "../../component/Intro/Map/MapComponent";
import {useLocation} from "react-router-dom";

function IntroPage() {
    const [currentSlide, setCurrentSlide] = useState('Greeting');
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const slide = params.get('slide');
        if (slide) {
            scrollToElement(slide);
        }
    }, [location.search]);

    const scrollToElement = (slideName) => {
        const element = document.getElementById(slideName);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }
    const handleScroll = (e) => {
        e.preventDefault();

        const direction = (e.deltaY > 0) ? 'down' : 'up';
        const currentId = e.currentTarget.id;

        if (direction === 'down') {
            switch (currentId) {
                case 'Greeting':
                    setCurrentSlide('Purpose');
                    scrollToElement('Purpose');
                    break;
                case 'Purpose':
                    setCurrentSlide('AgenHistory');
                    scrollToElement('AgenHistory');
                    break;
                case 'AgenHistory':
                    setCurrentSlide('SpaceIntro');
                    scrollToElement('SpaceIntro');
                    break;
                case 'SpaceIntro':
                    setCurrentSlide('MapComponent');
                    scrollToElement('MapComponent');
                    break;
                default:
                    break;
            }
        } else {
            switch (currentId) {
                case 'MapComponent':
                    setCurrentSlide('SpaceIntro');
                    scrollToElement('SpaceIntro');
                    break;
                case 'SpaceIntro':
                    setCurrentSlide('AgenHistory');
                    scrollToElement('AgenHistory');
                    break;
                case 'AgenHistory':
                    setCurrentSlide('Purpose');
                    scrollToElement('Purpose');
                    break;
                case 'Purpose':
                    setCurrentSlide('Greeting');
                    scrollToElement('Greeting');
                    break;
                default:
                    break;
            }
        }
    };

    const preventDrag = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        const mainDiv = document.querySelector(`.${styles.Intro}`);
        mainDiv.addEventListener('wheel', handleScroll, { passive: false });
        mainDiv.addEventListener('mousedown', preventDrag, { passive: false });

        return () => {
            mainDiv.removeEventListener('wheel', handleScroll);
            mainDiv.removeEventListener('mousedown', preventDrag);
        };
    }, []);

    return (
        <div className={styles.Intro}>
            <Element name="Greeting" id="Greeting" className={styles.slide} onWheel={handleScroll}>
                <Greeting />
            </Element>
            <Element name="Purpose" id="Purpose" className={styles.slide} onWheel={handleScroll}>
                <Purpose />
            </Element>
            <Element name="AgenHistory" id="AgenHistory" className={styles.slide} onWheel={handleScroll}>
                <AgenHistory />
            </Element>
            <Element name="SpaceIntro" id="SpaceIntro" className={styles.slide} onWheel={handleScroll}>
                <SpaceIntro />
            </Element>
            <Element name="MapComponent" id="MapComponent" className={styles.slide} onWheel={handleScroll}>
                <MapComponent />
            </Element>

            <div className={styles.dotIndicator}>
                <div className={`${styles.dot} ${currentSlide === 'Greeting' ? styles.dotActive : styles.dotImgContainer}`}></div>
                <div className={`${styles.dot} ${currentSlide === 'Purpose' ? styles.dotActive : styles.dotEduContainer}`}></div>
                <div className={`${styles.dot} ${currentSlide === 'AgenHistory' ? styles.dotActive : styles.dotRentContainer}`}></div>
                <div className={`${styles.dot} ${currentSlide === 'SpaceIntro' ? styles.dotActive : styles.dotTalentContainer}`}></div>
                <div className={`${styles.dot} ${currentSlide === 'MapComponent' ? styles.dotActive : styles.dotMapContainer}`}></div>
            </div>
        </div>
    );
}

export default IntroPage;