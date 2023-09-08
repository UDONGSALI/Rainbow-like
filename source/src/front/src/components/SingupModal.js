import React from 'react';
import SingUp from './SingUp';

function SingupModal({ open, handleClose }) {
    return (
        <div className={`모달 ${open ? '표시' : ''}`}>
            <div className="모달-내용">
                <span className="닫기" onClick={handleClose}>
                    &times;
                </span>
                <SingUp />
            </div>
        </div>
    );
}

export default SingupModal;
