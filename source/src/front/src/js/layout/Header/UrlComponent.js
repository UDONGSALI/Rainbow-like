import React from 'react';
import UrlHeader from './UrlHeader';
import UrlItem from './UrlItem';
import styles from '../../../css/layout/Header/UrlComponent.module.css'
import UrlFooter from "./UrlFooter";

function UrlComponent({headerTitle, urlItems, footerTitle}) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom:'15px'}}>
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
            <div>
                <UrlFooter title={footerTitle}/>
            </div>
        </div>
    );
}

export default UrlComponent;