import styles from "../../../css/pages/mypage/MyActivePage.module.css";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/MyHeader";
import React from "react";

const MyRentPage = () => {
    return (

        <div id={styles.container}>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'공간대관 신청내역'}/>

        </div>

    );
}

export default MyRentPage;