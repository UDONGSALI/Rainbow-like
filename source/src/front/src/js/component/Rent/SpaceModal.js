import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {SERVER_URL} from '../Common/constants';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    padding: 0,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function SpaceList({spaceInfo}) {
    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const colums = [
        {field: 'spaceName', headerName: '공간명', width: 200},
        {field: 'maxPerson', headerName: '최대인원', width: 100},
        {field: 'spaceUsage', headerName: '공간용도', width: 200},
        {field: 'rentTime', headerName: '대관시간', width: 100},
        {field: 'rentFee', headerName: '이용료', width: 100},
        {field: 'facilities', headerName: '구비시설', width: 200},

    ];

    useEffect(() => {
        fetch(SERVER_URL + 'api/spaces')
            .then((response) => response.json())
            .then((data) => {
                setSpaces(data._embedded.spaces);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading....</p>
            ) : (
                <div>
                    <Button onClick={handleOpen} style={{
                        fontSize: '15px',
                        fontWeight: 'bold',
                        color: '#ffffff',
                        backgroundColor: '#c1a1fa',
                    }}>더보기</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div className="modalForm" style={{display:"flex"}}>
                                <div className="img" style={{padding :'5%'}}>
                                    이미지 자리
                                </div>
                                <div className="spaceInfo">
                                    <Typography>
                                        {spaceInfo.spaceName} 스페이스이름
                                        <img alt={spaceInfo.spaceName} src={spaceInfo.imageUrl} style={{ width: '100%', height: 'auto' }} />
                                    </Typography>
                                    <hr/>
                                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                                        {/* Use spaceInfo to display space-specific information */}
                                        {spaceInfo && (
                                            <>
                                                <p>{spaceInfo.spaceName}</p>
                                                <p>최대인원 ㅣ {spaceInfo.maxPerson}</p>
                                                <p>공간용도 ㅣ {spaceInfo.spaceUsage}</p>
                                                <p>대관시간 ㅣ {spaceInfo.rentTime}</p>
                                                <p>기본이용료 ㅣ {spaceInfo.rentFee}</p>
                                                <p>구비시설 ㅣ {spaceInfo.facilities}</p>

                                            </>
                                        )}
                                    </Typography>
                                </div>
                            </div>
                        </Box>
                    </Modal>

                </div>
            )}
        </div>
    );
}