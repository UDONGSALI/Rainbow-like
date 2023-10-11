import FTCDtl from "../../../component/FT/FTC/FTCDtl";
import styles from '../../../../css/pages/Club/ClubDtlPage.module.css';
import {useParams} from 'react-router-dom';
import UrlComponent from "../../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../../layout/Header/Data/FtHeader";
import React from "react";


function FTCDtlPage(props) {
    const {memId} = props;
    const {id} = useParams();


    return (
        <>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={""}/>
            <div className={styles.postDetailPage}>
                <FTCDtl memId={memId}/>
            </div>
        </>
    );
}

export default FTCDtlPage;