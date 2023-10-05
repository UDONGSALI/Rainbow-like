import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

function InfoModal({ title, data, open, onClose }) {
    if(!data) {

        return null;
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {Object.entries(data).map(([key, value]) => {
                    if (key === "pwd") return null; // key가 "pwd"이면 렌더링하지 않습니다.
                    return (
                        <div key={key}>
                            <strong>{key}:</strong> {value}
                        </div>
                    );
                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>닫기</Button>
            </DialogActions>
        </Dialog>
    );
}

export default InfoModal;