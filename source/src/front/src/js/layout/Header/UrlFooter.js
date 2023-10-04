import React from 'react';
import styles from "../../../css/layout/Header/UrlFooter.module.css";

function UrlFooter({title}) {
    return (
        <div className={styles.urlFooter}>
            <h1><strong>{title}</strong></h1>
        </div>
    );
}

export default UrlFooter;