import styles from "../../../css/pages/mypage/MyActivePage.module.css";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/MyHeader";
import React from "react";

const MyInfoEditPage = () => {
    return (

        <div id={styles.container}>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'회원정보수정'}/>

        </div>

    );
}

export default MyInfoEditPage;