import styles from "../../../css/pages/mypage/MyActivePage.module.css";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/MyHeader";
import React from "react";
import MemberInfoEdit from "../../component/My/MemberEdit/MemberInfoEdit";

const MyInfoEditPage = () => {
    return (

        <div id={styles.container}>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'회원정보수정'}/>
            <MemberInfoEdit/>
        </div>

    );
}

export default MyInfoEditPage;