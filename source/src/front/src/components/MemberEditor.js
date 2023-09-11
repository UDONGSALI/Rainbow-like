import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import './MemberEditor.css';
import {SERVER_URL} from "../constants";

function MemberEditor({ member, open, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        memId: '',
        type: '',
        name: '',
        bir: '',
        tel: '',
        gender: '',
        email: '',
        addr: '',
        jdate: '',
    });

    useEffect(() => {
        if (member) {
            const memberDetailUrl = member.id;
            console.log(memberDetailUrl)
            fetch(memberDetailUrl)
                .then((response) => response.json())
                .then((data) => {
                    setFormData({
                        memId: data.memId,
                        type: data.type,
                        name: data.name,
                        bir: data.bir,
                        tel: data.tel,
                        gender: data.gender,
                        email: data.email,
                        addr: data.addr,
                        addrDtl: data.addrDtl,
                        addrPost: data.addrPost,
                        jdate: data.jdate,
                    });
                })
                .catch((error) => {
                    console.error('멤버 상세 정보를 가져오는 중 오류 발생:', error);
                });
        }
    }, [member]);

    const handleChange = (e) => {
        // 폼 데이터 업데이트
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSave = () => {
        const memberDetailUrl =member.id; // 서버 엔드포인트 URL
        console.log("확인"+ member.id+"확인")
        const requestOptions = {
            method: 'PATCH', // PATCH 요청 사용
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // 수정된 데이터를 JSON 형식으로 전송
        };

        fetch(memberDetailUrl, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('서버에 업데이트하는 중 문제가 발생했습니다.');
                }
                return response.json();
            })
            .then((data) => {
                // 서버로부터의 응답을 처리하거나 필요한 작업을 수행하세요.
                console.log('서버 응답:', data);

                onClose(); // 모달 닫기

                // onUpdate 함수 호출하여 멤버 목록 다시 불러오기
                onUpdate();
            })
            .catch((error) => {
                console.error('서버 요청 오류:', error);
                // 오류 처리 로직을 추가하세요.
            });
    };


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>회원정보 수정</DialogTitle>
            <DialogContent className="member-detail-container">
                {member && (
                    <div>
                        <div>
                            <label>회원 번호 : </label>
                            <span> {(member.id).slice(-1)}</span>
                        </div>
                        <div className="input-group">
                            <label>아이디 :</label>
                            <span>{formData.memId}</span>
                        </div>
                        <div>
                            <label>유형 : </label>
                            <select
                                name="type"
                                defaultValue={formData.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="">회원 유형 선택</option>
                                <option value="ADMIN">관리자</option>
                                <option value="USER">일반 사용자</option>
                                <option value="LABOR">노무사</option>
                                <option value="COUNSELOR">상담사</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label>이름 : </label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={formData.name}
                                onChange={handleChange}
                                placeholder="이름"
                                required
                            />
                        </div>
                        <div>
                            <label>성별 : </label>
                            <select
                                name="gender"
                                defaultValue={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">성별 선택</option>
                                <option value="MALE">남성</option>
                                <option value="FEMALE">여성</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>생년월일 : </label>
                            <input
                                type="date"
                                name="bir"
                                defaultValue={formData.bir}
                                onChange={handleChange}
                                placeholder="생년월일"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>전화번호 : </label>
                            <input
                                type="text"
                                name="tel"
                                defaultValue={formData.tel}
                                onChange={handleChange}
                                placeholder="전화번호"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>이메일 : </label>
                            <span>{formData.email}</span>
                        </div>
                        <div className="input-group">
                            <label>주소 : </label>
                            <input
                                type="text"
                                name="addr"
                                defaultValue={formData.addr}
                                onChange={handleChange}
                                placeholder="주소"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>상세 주소 : </label>
                            <input
                                type="text"
                                name="addrDtl"
                                defaultValue={formData.addrDtl}
                                onChange={handleChange}
                                placeholder="상세주소"
                            />
                        </div>
                        <div className="input-group">
                            <label>우편번호 : </label>
                            <input
                                type="text"
                                name="addrPost"
                                defaultValue={formData.addrPost}
                                onChange={handleChange}
                                placeholder="우편번호"
                            />
                        </div>
                        <div className="info-group">
                            <label>가입일 : </label>
                            <span>{formData.jdate}</span>
                        </div>
                    </div>
                )}
            </DialogContent>
            <DialogActions className="member-detail-container">
                    <Button onClick={handleSave}>수정완료</Button>
                <Button onClick={onClose}>닫기</Button>
            </DialogActions>
        </Dialog>
    );
}

export default MemberEditor;
