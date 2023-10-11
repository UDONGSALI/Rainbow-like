import React, { useState } from 'react';
import SMSForm from '../../component/SMS/SMSForm';
import SMSList from '../../component/SMS/SMSList';
import styles from '../../../css/pages/Club/ClubPage.module.css';

function SMSPage() {
    const [refreshList, setRefreshList] = useState(false);

    const handleRefresh = () => {
        setRefreshList(!refreshList);
    };

    return (
        <div className={styles.ClubMainPage}>
            <SMSForm onFormSubmit={handleRefresh} />
            <div className={styles.List}>
                <SMSList refresh={refreshList} />
            </div>
        </div>
    );
}

export default SMSPage;
