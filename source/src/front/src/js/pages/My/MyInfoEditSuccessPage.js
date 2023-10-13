import styles from "../../../css/pages/mypage/MyActivePage.module.css";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/MyHeader";
import React from "react";
import EditSuccess from "../../component/My/MemberEdit/EditSuccess";

const MyInfoEditSuccessPage = () => {
    return (

        <div id={styles.container}>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'회원정보수정'}/>
            <EditSuccess/>
        </div>

    );
}

export default MyInfoEditSuccessPage;