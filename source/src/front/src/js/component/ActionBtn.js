import React from 'react';
import styles from '../../css/component/ActionBtn.module.css';

function ActionBtn({ onEditClick, onDeleteClick }) {
    return (
        <div className={styles.postButton}>
            <button onClick={onEditClick} className={styles.postEditButton}>
                수정
            </button>
            <button onClick={onDeleteClick} className={styles.postDeleteButton}>
                삭제
            </button>
        </div>
    );
}

export default ActionBtn;