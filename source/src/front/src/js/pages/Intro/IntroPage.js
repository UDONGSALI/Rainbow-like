import React, { useEffect, useState } from 'react';
import Purpose from '../../component/Intro/Purpose';
import AgenHistory from '../../component/Intro/AgenHistory';
import OrganizationChart from '../../component/Intro/OrganizationChart';
import SpaceIntro from '../../component/Intro/SpaceIntro';
import { Element, scroller } from 'react-scroll';
import Greeting from "../../component/Intro/Greeting";
import styles from '../../../css/pages/Intro/IntroPage.module.css';

function IntroPage() {
    const [currentSlide, setCurrentSlide] = useState('Greeting');

    const scrollToElement = (elementName) => {
        scroller.scrollTo(elementName, {
            duration: 50,
            delay: 0,
            smooth: 'easeInOutQuart'
        });
    };

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
                    setCurrentSlide('OrganizationChart');
                    scrollToElement('OrganizationChart');
                    break;
                case 'OrganizationChart':
                    setCurrentSlide('SpaceIntro');
                    scrollToElement('SpaceIntro');
                    break;
                default:
                    break;
            }
        } else {
            switch (currentId) {
                case 'SpaceIntro':
                    setCurrentSlide('OrganizationChart');
                    scrollToElement('OrganizationChart');
                    break;
                case 'OrganizationChart':
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
        <div className={styles.Intro}>  {/* 이 부분에 position: 'relative' 추가 */}
            <Element name="Greeting" id="Greeting" onWheel={handleScroll}>
                <Greeting />
            </Element>
            <Element name="Purpose" id="Purpose" className={styles.slide} onWheel={handleScroll}>
                <Purpose />
            </Element>
            <Element name="AgenHistory" id="AgenHistory" className={styles.slide} onWheel={handleScroll}>
                <AgenHistory />
            </Element>
            <Element name="OrganizationChart" id="OrganizationChart" className={styles.slide} onWheel={handleScroll}>
                <OrganizationChart />
            </Element>
            <Element name="SpaceIntro" id="SpaceIntro" className={styles.slide} onWheel={handleScroll}>
                <SpaceIntro />
            </Element>

            <div className={styles.dotIndicator}>
                <div className={`${styles.dot} ${currentSlide === 'Greeting' ? styles.dotActive : styles.dotImgContainer}`}></div>
                <div className={`${styles.dot} ${currentSlide === 'Purpose' ? styles.dotActive : styles.dotEduContainer}`}></div>
                <div className={`${styles.dot} ${currentSlide === 'AgenHistory' ? styles.dotActive : styles.dotRentContainer}`}></div>
                <div className={`${styles.dot} ${currentSlide === 'OrganizationChart' ? styles.dotActive : styles.dotTalentContainer}`}></div>
                <div className={`${styles.dot} ${currentSlide === 'SpaceIntro' ? styles.dotActive : styles.dotTalentContainer}`}></div>
            </div>
        </div>
    );
}

export default IntroPage;
