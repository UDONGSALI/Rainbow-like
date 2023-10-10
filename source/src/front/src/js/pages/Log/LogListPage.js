import React from 'react';
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader";
import LogList from "../../component/Log/LogList";
import PieChartComponent from "../../component/Stats/PieChartComponent";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
function LogListPage() {
    return (
        <div >
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'로그'}/>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                navigation
                loop={true}
                style={{width:'70%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            >
                <SwiperSlide><LogList/></SwiperSlide>
                <SwiperSlide><PieChartComponent/></SwiperSlide>
            </Swiper>
        </div>
    );
}

export default LogListPage;