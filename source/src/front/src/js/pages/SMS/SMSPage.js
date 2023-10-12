import React, {useState} from 'react';
import SMSForm from '../../component/SMS/SMSForm';
import SMSList from '../../component/SMS/SMSList';
import styles from '../../../css/pages/Club/ClubPage.module.css';
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader";

function SMSPage() {
    const [refreshList, setRefreshList] = useState(false);

    const handleRefresh = () => {
        setRefreshList(!refreshList);
    };

    return (
        <>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'SMS'}/>
            <div className={styles.ClubMainPage}>
                <SMSForm onFormSubmit={handleRefresh}/>
                <div className={styles.List}>
                    <SMSList refresh={refreshList}/>
                </div>
            </div>
        </>
    );
}

export default SMSPage;
