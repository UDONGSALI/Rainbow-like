<<<<<<< HEAD
import React, {useState} from 'react';
=======
import React, { useState } from 'react';
>>>>>>> 4d1ef37 (no message)
import bcrypt from 'bcryptjs'; // bcryptjs 라이브러리를 임포트
import '../../../css/component/Login/SingUp.css';
import FileUpload from "../Common/FileUpload";
import axios from "axios";
import {SERVER_URL} from "../Common/constants"; // CSS 파일을 임포트

function SignUp() {
    const [formData, setFormData] = useState({
        memId: '',
        pwd: '',
        type: '',
        name: '',
        gender: '',
        bir: '',
        tel: '',
        email: '',
        addr: '',
        addrDtl: '',
        addrPost: '',
        jdate: new Date().toISOString().split('T')[0],
    });

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleChange = (e) => {
<<<<<<< HEAD
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
=======
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
>>>>>>> 4d1ef37 (no message)
    };

    const handleFileChange = (files) => {
        setSelectedFiles(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


<<<<<<< HEAD
        // 회원가입 정보 전송
        const hashedPwd = bcrypt.hashSync(formData.pwd, 10);
        setFormData({...formData, pwd: hashedPwd});
=======

        // 회원가입 정보 전송
        const hashedPwd = bcrypt.hashSync(formData.pwd, 10);
        setFormData({ ...formData, pwd: hashedPwd });
>>>>>>> 4d1ef37 (no message)

        try {
            const response = await fetch(SERVER_URL + 'api/members', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.status === 409) {
                alert('이미 존재하는 회원입니다.');
            } else {
                const data = await response.json();
                alert('회원가입에 성공 했습니다!');
                setFormData({
                    memId: '',
                    pwd: '',
                    type: '',
                    name: '',
                    gender: '',
                    bir: '',
                    tel: '',
                    email: '',
                    addr: '',
                    addrDtl: '',
                    addrPost: '',
                    jdate: new Date().toISOString().split('T')[0],
                });

                // 파일 업로드
                const formDataWithFiles = new FormData();
<<<<<<< HEAD

=======
>>>>>>> 4d1ef37 (no message)
                for (const file of selectedFiles) {
                    formDataWithFiles.append('file', file);
                }
                formDataWithFiles.append('tableName', "member");
                try {
                    const response = await axios.post('http://localhost:8090/files', formDataWithFiles, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    console.log('File upload response:', response.data);
                } catch (error) {
                    console.error('File upload error:', error);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="registration-form-container">
            <h2>회원가입 폼</h2>
            <form onSubmit={handleSubmit} className="registration-form">
<<<<<<< HEAD
                <div className="input-group">
=======
                <div className="input-group" >
>>>>>>> 4d1ef37 (no message)
                    <input
                        type="text"
                        name="memId"
                        value={formData.memId}
                        onChange={handleChange}
                        placeholder="아이디"
                        required
                    />
                </div>
<<<<<<< HEAD
                <div className="input-group">
=======
                <div className="input-group" >
>>>>>>> 4d1ef37 (no message)
                    <input
                        type="password"
                        name="pwd"
                        value={formData.pwd}
                        onChange={handleChange}
                        placeholder="비밀번호"
                        required
                    />
<<<<<<< HEAD
                </ div>
=======
                </ div >
>>>>>>> 4d1ef37 (no message)
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >
                    <option value="">회원 유형 선택</option>
<<<<<<< HEAD
                    <option value="ADMIN">관리자</option>
                    <option value="USER">일반 사용자</option>
=======
                    <option value="ADMIN">관리자 </option>
                    <option value="USER">일반 사용자 </option>
>>>>>>> 4d1ef37 (no message)
                    <option value="LABOR">노무사</option>
                    <option value="COUNSELOR">상담사</option>
                </select>

                <div className="input-group">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="이름"
                        required
                    />
                </div>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">성별 선택</option>
                    <option value="MALE">남성</option>
                    <option value="FEMALE">여성</option>
                </select>
<<<<<<< HEAD
                <div className="input-group">
=======
                <div className="input-group" >
>>>>>>> 4d1ef37 (no message)
                    <input
                        type="date"
                        name="bir"
                        value={formData.bir}
                        onChange={handleChange}
                        placeholder="생년월일"
                        required
                    />
                </div>
<<<<<<< HEAD
                <div className="input-group">
=======
                <div className="input-group" >
>>>>>>> 4d1ef37 (no message)
                    <input
                        type="text"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                        placeholder="전화번호"
                        required
                    />
                </div>
<<<<<<< HEAD
                <div className="input-group">
=======
                <div className="input-group" >
>>>>>>> 4d1ef37 (no message)
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="이메일"
                        required
                    />
                </div>
<<<<<<< HEAD
                <div className="input-group">
=======
                <div className="input-group" >
>>>>>>> 4d1ef37 (no message)
                    <input
                        type="text"
                        name="addr"
                        value={formData.addr}
                        onChange={handleChange}
                        placeholder="주소"
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        name="addrDtl"
                        value={formData.addrDtl}
                        onChange={handleChange}
                        placeholder="상세주소"
                    />
                </div>
<<<<<<< HEAD
                <div className="input-group">
=======
                <div className="input-group" >
>>>>>>> 4d1ef37 (no message)
                    <input
                        type="text"
                        name="addrPost"
                        value={formData.addrPost}
                        onChange={handleChange}
                        placeholder="우편번호"
                    />
                </div>
                {/*<FileUpload  />*/}
<<<<<<< HEAD
                <FileUpload onFileChange={handleFileChange}/>
=======
                <FileUpload onFileChange={handleFileChange} />
>>>>>>> 4d1ef37 (no message)

                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default SignUp;
