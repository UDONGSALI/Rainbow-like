import React, { useState, useEffect } from "react";
import FileUpload from "../Common/FileUpload";
import {SERVER_URL} from "../Common/constants";
import {useNavigate} from 'react-router-dom';
import styles from '../../../css/component/Club/ClubForm.module.css';


function EduForm({ eduNum }) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}T${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`;
    const formattedCurrentDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        type: '',
        eduName: '',
        content: '',
        eduStdt: formattedDate,
        eduEddt: formattedDate,
        eduAddr: '',
        target: '',
        recuStdt: formattedCurrentDate,
        recuEddt: formattedCurrentDate,
        capacity: 0,
        recuPerson: 0,
        recuMethod: '',
        tel: ''
    });

    useEffect(() => {
        async function fetchEduData() {
            if (eduNum) { // eduNum이 주어졌을 경우, 데이터를 가져와서 수정 모드로 설정
                const response = await fetch(`${SERVER_URL}api/edus/${eduNum}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                    // 필요하다면 기존 파일 정보도 설정합니다.
                } else {
                    console.error("Failed to fetch the education data");
                }
            }
        }

        fetchEduData();
    }, [eduNum]);

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (files) => {
        setSelectedFiles(files);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (eduNum) {
                // 수정 로직 (PATCH 요청)

                // Step 1: 기존의 파일들 삭제
                await fetch(`${SERVER_URL}files/eduNum/${eduNum}`, {
                    method: 'DELETE'
                });

                // Step 2: 데이터 수정
                const response = await fetch(`${SERVER_URL}api/edus/${eduNum}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    alert('정보가 수정되었습니다.');

                    // Step 3: 새 파일들 업로드
                    if (selectedFiles.length > 0) {
                        const formDataWithFiles = new FormData();
                        for (const file of selectedFiles) {
                            formDataWithFiles.append('file', file);
                        }
                        formDataWithFiles.append('tableName', "edu");
                        formDataWithFiles.append('number', eduNum);

                        const fileUploadResponse = await fetch(`${SERVER_URL}files`, {
                            method: 'POST',
                            body: formDataWithFiles,
                        });

                        const fileUploadData = await fileUploadResponse.text();
                        console.log('File upload response:', fileUploadData);
                    }

                    window.location.reload();
                } else {
                    const errorData = await response.text();
                    console.error('Error:', errorData.message || "Unknown error");
                }
            } else {
                // 기존의 생성 로직
                const response = await fetch(`${SERVER_URL}api/edus`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    const data = await response.json();
                    alert('정보가 등록되었습니다.');

                    if (selectedFiles.length > 0) {
                        const formDataWithFiles = new FormData();
                        for (const file of selectedFiles) {
                            formDataWithFiles.append('file', file);
                        }
                        formDataWithFiles.append('tableName', "edu");
                        formDataWithFiles.append('number', 0);

                        const fileUploadResponse = await fetch(`${SERVER_URL}files`, {

                            method: 'POST',
                            body: formDataWithFiles,
                        });

                        const fileUploadData = await fileUploadResponse.text();
                        console.log('File upload response:', fileUploadData);
                    }
                    window.location.reload();
                } else {
                    const errorData = await response.text();
                    console.error('Error:', errorData.message || "Unknown error");
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.registrationFormContainer}>
            <h2>교육 정보 등록 폼</h2>
            <form onSubmit={handleSubmit} className={styles.registrationForm}>

                <div className={styles.inputGroup}>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">유형 선택</option>
                        <option value="EDU">교육</option>
                        <option value="BUSINESS">사업</option>
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <select
                        id="recuMethod"
                        name="recuMethod"
                        value={formData.recuMethod}
                        onChange={handleChange}
                        required
                    >
                        <option value="">모집 방법 선택</option>
                        <option value="FIRST_COME">선착순</option>
                        <option value="ADMIN_APPROVAL">관리자 승인</option>
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        name="eduName"
                        value={formData.eduName}
                        onChange={handleChange}
                        placeholder="교육 이름"
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="내용"
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="eduStdt">교육 시작일시:</label>
                    <input
                        type="datetime-local"
                        id="eduStdt"
                        name="eduStdt"
                        value={formData.eduStdt}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="eduEddt">교육 종료일시:</label>
                    <input
                        type="datetime-local"
                        id="eduEddt"
                        name="eduEddt"
                        value={formData.eduEddt}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="eduAddr">주소:</label>
                    <input
                        type="text"
                        id="eduAddr"
                        name="eduAddr"
                        value={formData.eduAddr}
                        onChange={handleChange}
                        placeholder="주소"
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="target">대상:</label>
                    <input
                        type="text"
                        id="target"
                        name="target"
                        value={formData.target}
                        onChange={handleChange}
                        placeholder="대상"
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="recuStdt">모집 시작일:</label>
                    <input
                        type="date"
                        id="recuStdt"
                        name="recuStdt"
                        value={formData.recuStdt}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="recuEddt">모집 종료일:</label>
                    <input
                        type="date"
                        id="recuEddt"
                        name="recuEddt"
                        value={formData.recuEddt}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="capacity">정원:</label>
                    <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        placeholder="정원"
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="tel">연락처:</label>
                    <input
                        type="text"
                        id="tel"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                        placeholder="연락처"
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>첫번째 사진은 썸네일을 업로드 해 주세요!</label>
                    <FileUpload onFileChange={handleFileChange} maxSize={1} maxCount={2} acceptedFormats={['image/*']}/>
                </div>
                <button type="submit">정보 등록</button>
            </form>
        </div>
    );
}

export default EduForm;