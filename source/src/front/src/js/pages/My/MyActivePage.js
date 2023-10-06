
import MyActivePost from "../../component/My/Active/MyActivePost";
import MyActiveComment from "../../component/My/Active/MyActiveComment";
import styles from '../../../css/pages/mypage/MyActivePage.module.css';
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/MyHeader";
import React from "react";
import Footer from "../../layout/Footer/footer";


const MyActivePage = () => {
    return (

            <div id={styles.container}>
                <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'활동 내역'}/>
                <MyActivePost/>
                <MyActiveComment/>
                <Footer/>
            </div>


    );
}

export default MyActivePage;