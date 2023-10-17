import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../css/layout/QuickMenu/QuickMenu.module.css'

function QuickMenu() {

    const onClick = () => {
        const popupWindow = window.open(`/chat`, '_blank', 'width=400,height=650');
        // <Chatting  />
    };
    return (
        <div className={styles.quickMenu}>

                <div className={styles.quickMenuOptions}>
                    <ul>
                        <li onClick={onClick}>챗봇</li>
                    </ul>
                </div>

        </div>
    );
}

export default QuickMenu;
