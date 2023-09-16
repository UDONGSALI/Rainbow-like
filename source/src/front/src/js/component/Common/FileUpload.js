import React, { useState } from 'react';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB를 바이트로 변환
const MAX_FILE_COUNT = 10; // 최대 파일 수

function FileUpload({ onFileChange }) {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
        const files = e.target.files;

        if (!files || files.length === 0) {
            // 파일이 선택되지 않았을 때 처리 (예: 에러 메시지 표시)
            alert('파일을 선택해주세요.');
            e.target.value = null; // 파일 선택 input을 비웁니다.
            return;
        }

        // 파일 수 확인 및 제한 적용
        if (files.length > MAX_FILE_COUNT) {
            alert(`최대 ${MAX_FILE_COUNT}개의 파일만 선택 가능합니다.`);
            e.target.value = null; // 파일 선택 input을 비웁니다.
            return;
        }

        // 파일 크기 확인 및 제한 적용
        const oversizedFiles = Array.from(files).filter(file => file.size > MAX_FILE_SIZE);

        if (oversizedFiles.length > 0) {
            // 파일 크기가 제한을 초과하는 파일이 있는 경우 처리 (예: 에러 메시지 표시)
            alert('파일 크기가 제한을 초과합니다.');
            e.target.value = null; // 파일 선택 input을 비웁니다.
            return;
        }

        // 선택된 파일 목록을 상태에 설정
        setSelectedFiles(Array.from(files));

        // 파일 리스트를 상위 컴포넌트로 전달
        onFileChange(Array.from(files));

        console.log(selectedFiles);
    };



    return (
        <div className="input-group">
            <input
                type="file"
                name="file"
                multiple
                onChange={handleFileChange} // 파일 선택 시 handleFileChange 호출
            />
        </div>
    );
}

export default FileUpload;
