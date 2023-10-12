import React, { useState } from 'react';
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader";
import LogList from "../../component/Log/LogList";
import Chart from "../../component/Stats/Chart";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function LogListPage() {
    const [footerTitle, setFooterTitle] = useState('로그'); // 초기값은 '로그'

    const handleSlideChange = (event) => {
        const realIndex = event.realIndex;
        if (realIndex === 0) {
            setFooterTitle('로그');
        } else if (realIndex === 1) {
            setFooterTitle('접속 통계');
        }
    };

    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={footerTitle} />
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                navigation
                loop={true}
                onSlideChange={handleSlideChange}
                style={{ width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            >
                <SwiperSlide><LogList /></SwiperSlide>
                <SwiperSlide><Chart /></SwiperSlide>
            </Swiper>
        </div>
    );
}

export default LogListPage;