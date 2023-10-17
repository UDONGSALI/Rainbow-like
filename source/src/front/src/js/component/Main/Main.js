import React, { useEffect, useState } from 'react';
import styles from '../../../css/component/Main/Main.module.css';
import ImgContainer from "./Img/ImgContainer";
import EduContainer from "./Edu/EduContainer";
import RentContainer from "./Rent/RentContainer";
import TalentContainer from "./Talent/TalentContainer";
import { Element, scroller } from 'react-scroll';

function Main() {
    const [currentSlide, setCurrentSlide] = useState('imgContainer');

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
                case 'imgContainer':
                    setCurrentSlide('eduContainer');
                    scrollToElement('eduContainer');
                    break;
                case 'eduContainer':
                    setCurrentSlide('rentContainer');
                    scrollToElement('rentContainer');
                    break;
                case 'rentContainer':
                    setCurrentSlide('talentContainer');
                    scrollToElement('talentContainer');
                    break;
                default:
                    break;
            }
        } else {
            switch (currentId) {
                case 'talentContainer':
                    setCurrentSlide('rentContainer');
                    scrollToElement('rentContainer');
                    break;
                case 'rentContainer':
                    setCurrentSlide('eduContainer');
                    scrollToElement('eduContainer');
                    break;
                case 'eduContainer':
                    setCurrentSlide('imgContainer');
                    scrollToElement('imgContainer');
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
        const mainDiv = document.querySelector(`.${styles.Main}`);
        mainDiv.addEventListener('wheel', handleScroll, { passive: false });
        mainDiv.addEventListener('mousedown', preventDrag, { passive: false });

        return () => {
            mainDiv.removeEventListener('wheel', handleScroll);
            mainDiv.removeEventListener('mousedown', preventDrag);
        };
    }, []);

    return (
        <div className={styles.Main}>  {/* 이 부분에 position: 'relative' 추가 */}
            <Element name="imgContainer" id="imgContainer" onWheel={handleScroll}>
                <ImgContainer />
            </Element>
            <Element name="eduContainer" id="eduContainer" className={styles.slide} onWheel={handleScroll}>
                <EduContainer />
            </Element>
            <Element name="rentContainer" id="rentContainer" className={styles.slide} onWheel={handleScroll}>
                <RentContainer />
            </Element>
            <Element name="talentContainer" id="talentContainer" className={styles.slide} onWheel={handleScroll}>
                <TalentContainer />
            </Element>

            <div className={styles.dotIndicator}>
                <div className={`${styles.dot} ${currentSlide === 'imgContainer' ? styles.dotActive : styles.dotImgContainer}`}></div>
                <div className={`${styles.dot} ${currentSlide === 'eduContainer' ? styles.dotActive : styles.dotEduContainer}`}></div>
                <div className={`${styles.dot} ${currentSlide === 'rentContainer' ? styles.dotActive : styles.dotRentContainer}`}></div>
                <div className={`${styles.dot} ${currentSlide === 'talentContainer' ? styles.dotActive : styles.dotTalentContainer}`}></div>
            </div>
        </div>
    );
};

export default Main;
