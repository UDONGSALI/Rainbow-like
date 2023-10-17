import {useEffect, useRef, useState} from "react";
import useFetch from "../../hook/useFetch";
import {SERVER_URL} from "../../Common/constants";
import styles from "../../../../css/component/Main/Talent/TalentContainer.module.css"
import {Swiper, SwiperSlide} from "swiper/react";
import {useNavigate} from "react-router-dom";

function TalentContainer() {
    const [ftc, setFtc] = useState([]);
    const [ftw, setFtw] = useState([]);
    const { data: fetchedFtc, loadingFtc } = useFetch(`${SERVER_URL}ftc`);
    const { data: fetchedFtw, loadingFtw } = useFetch(`${SERVER_URL}ftw`);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loadingFtc) {
            setFtc(fetchedFtc);
        }
    }, [loadingFtc, fetchedFtc]);

    useEffect(() => {
        if (!loadingFtw) {
            setFtw(fetchedFtw);
        }
    }, [loadingFtw, fetchedFtw]);

    const handleSlideClick = () => {
        navigate("/ftmain");
    };
    return (
        <div className={styles.container}>
            <div className={styles.itemComponent}>
                <div style={{width: '100%', display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <h2 style={{fontWeight: "bold", color: '#4b3c8f'}}>인재를 찾고 있어요</h2>
                    <h1 style={{fontWeight: "bold"}}>여성 인재풀 DB를 이용해 보세요!</h1>
                </div>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={4}
                    loop={true}
                    autoplay={{
                        delay: 1000,
                    }}
                    speed={1000}
                    loopedSlides={ftc.length}
                    onClick={handleSlideClick}
                    style={{cursor: "pointer"}}
                >
                    {ftc.filter(item => !item.statusDtl).map(item => (
                        <SwiperSlide key={item.ftConsumerNum}>
                            <div className={styles.item}>
                                분야 : <strong>{item.speField}</strong>
                                <div>
                                    <p style={{marginTop: '10px'}}>{item.applyContent}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div>
                    <br/>
                    <h2 style={{fontWeight: "bold", color: '#4b3c8f'}}>인재가 준비하고 있어요</h2>
                </div>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={4}
                    loop={true}
                    autoplay={{
                        delay: 1000,
                        reverseDirection: true
                    }}
                    speed={1000}
                    loopedSlides={ftw.length}
                    onClick={handleSlideClick}
                    style={{cursor: "pointer"}}
                >
                    {ftw.filter(item => !item.statusDtl).map(item => (
                        <SwiperSlide key={item.ftWorkerNum}>
                            <div className={styles.item}>
                                분야 : <strong>{item.speField}</strong>
                                <div>
                                    <p style={{marginTop: '10px'}}>{item.ftDtl}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default TalentContainer;