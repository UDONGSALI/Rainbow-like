import React, {useState} from "react";
import '../../../css/component/ClubForm.css';
import FileUpload from "../Common/FileUpload";
import axios from "axios";
import {SERVER_URL} from "../Common/constants";
import {useNavigate} from 'react-router-dom';


function EduForm() {
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
            // 교육 정보 전송
            const response = await fetch(SERVER_URL + 'api/edus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // 응답이 성공적이면 파일 업로드 진행 (파일이 선택된 경우에만)
                const data = await response.json();
                alert('정보가 등록되었습니다.');

                if (selectedFiles.length > 0) {  // <-- 이 부분을 추가함
                    const formDataWithFiles = new FormData();
                    for (const file of selectedFiles) {
                        formDataWithFiles.append('file', file);
                    }
                    formDataWithFiles.append('tableName', "edu");

                    const fileUploadResponse = await axios.post(SERVER_URL + 'files', formDataWithFiles, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    console.log('File upload response:', fileUploadResponse.data);
                }
                window.location.reload();
            } else {
                // 응답에 문제가 있으면 오류 메시지 표시
                const errorData = await response.json();
                console.error('Error:', errorData.message || "Unknown error");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="registration-form-container">
            <h2>교육 정보 등록 폼</h2>
            <form onSubmit={handleSubmit} className="registration-form">

                <div className="input-group">
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

                <div className="input-group">
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

                <div className="input-group">
                    <input
                        type="text"
                        name="eduName"
                        value={formData.eduName}
                        onChange={handleChange}
                        placeholder="교육 이름"
                        required
                    />
                </div>

                <div className="input-group">
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="내용"
                        required
                    />
                </div>

                <div className="input-group">
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

                <div className="input-group">
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

                <div className="input-group">
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

                <div className="input-group">
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

                <div className="input-group">
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

                <div className="input-group">
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

                <div className="input-group">
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

                <div className="input-group">
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
                <div>
                    <label>첫번째 사진은 썸네일을 업로드 해 주세요!</label>
                    <FileUpload onFileChange={handleFileChange} maxSize={1} maxCount={2} acceptedFormats={['image/*']}/>
                </div>
                <button type="submit">정보 등록</button>
            </form>
        </div>
    );
}

export default EduForm;