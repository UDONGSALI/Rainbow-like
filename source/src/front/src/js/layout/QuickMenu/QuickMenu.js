import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from '../../../css/layout/QuickMenu/QuickMenu.module.css';

function QuickMenu({ useScrollTop, useChat, move, modal }) {

    const navigate = useNavigate();

    const onScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // smooth scrolling
        });
    };

    const onClickChat = () => {
        const width = 400;
        const height = 700;
        const left = (window.screen.width - width) / 1.8;
        const top = (window.screen.height - height) / 2.5;
        const popupWindow = window.open(`/chat`, '_blank', `width=${width},height=${height},left=${left},top=${top}`);
        // <Chatting  />
    };

    const onMove = () => {
        if (move && move.link) {
            navigate(move.link);  // navigate to the provided link
        }
    };

    const onOpenModal = () => {
        if (modal && modal.method) {
            modal.method();
        }
    };

    return (
        <div className={styles.quickMenu}>
            { useScrollTop && (
                <div className={styles.option}>
                    <span onClick={onScrollTop} style={{ fontSize: '30px', marginBottom: '5px' }}>▲</span>
                </div>
            )}
            { useChat && (
                <div className={`${styles.option} ${styles.chatBot}`}>
                    <span onClick={onClickChat}>챗봇</span>
                </div>
            )}
            { move && (
                <div className={styles.option}>
                    <span onClick={onMove}>{move.text}</span>
                </div>
            )}
            { modal && (
                <div className={styles.option}>
                    <span onClick={onOpenModal}>{modal.text}</span>
                </div>
            )}
        </div>
    );
}

export default QuickMenu;
