import styles from "../../../css/pages/mypage/MyActivePage.module.css";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/MyHeader";
import React from "react";
import MyCounselList from "../../component/My/Counsel/MyCounselList";

const MyCouselPage = () => {
    return (

        <div id={styles.container}>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'상담 내역'}/>
            <MyCounselList/>
        </div>

    );
}

export default MyCouselPage;