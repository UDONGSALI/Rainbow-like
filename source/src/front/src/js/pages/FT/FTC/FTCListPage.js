import FTCList from "../../../component/FT/FTC/FTCList";
import styles from '../../../../css/pages/Club/ClubDtlPage.module.css';
import UrlComponent from "../../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../../layout/Header/Data/AdminHeader";
import React from "react";

function FTCListPage(){
    return(
        <>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'매칭 리스트'}/>
            <div className={styles.postDetailPage}>
            <FTCList />
        </div>
        </>
    );
}

export default FTCListPage;