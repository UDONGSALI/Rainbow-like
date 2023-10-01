import React from 'react';
import UrlHeader from './UrlHeader';
import UrlItem from './UrlItem';
import styles from '../../../css/layout/Header/UrlComponent.module.css'

function UrlComponent({headerTitle, urlItems}) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <UrlHeader title={headerTitle}/>
            </div>
            <div className={styles.list}>
                {urlItems.map((item, index) => (
                    <UrlItem key={index} index={index} name={item.name} link={item.link}/>
                ))}
            </div>
        </div>
    );
}

export default UrlComponent;