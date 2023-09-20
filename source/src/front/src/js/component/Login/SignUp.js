    import React, { useState } from 'react';
    import bcrypt from 'bcryptjs';
    import styles from '../../../css/component/Login/SignUp.module.css';
    import FileUpload from "../Common/FileUpload";
    import axios from "axios";
    import { SERVER_URL } from "../Common/constants";

    function SignUp() {
        // State
        const [formData, setFormData] = useState({
            memId: '',
            pwd: '',
            type: 'USER',
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
        const [errors, setErrors] = useState({});
        const [isDateInputFocused, setDateInputFocus] = useState(false);
        const [isDuplicateChecked, setDuplicateChecked] = useState(false);
        const [passwordConfirm, setPasswordConfirm] = useState('');
        const [passwordError, setPasswordError] = useState(null);

        const validate = (name, value) => {
            let error = null;

            switch (name) {
                case 'memId':
                    if (!/^[a-zA-Z0-9]+$/.test(value)) {
                        error = '아이디는 영어, 숫자만 사용 가능합니다.';
                    }
                    break;
                case 'pwd':
                    if (!/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+).{8,15}$/.test(value)) {
                        error = '비밀번호는 영어, 숫자, 특수문자를 포함하여 8~15 자리로 만들어 주세요..';
                    }
                    break;
                case 'name':
                    if (!/^[a-zA-Z가-힣]+$/.test(value)) {
                        error = '이름은 한글, 영어만 사용 가능합니다.';
                    }
                    break;
                case 'bir':
                    const birthYear = new Date(value).getFullYear();
                    if (new Date(value) > new Date() || birthYear < 1900) {
                        error = '유효하지 않은 날짜입니다.';
                    }
                    break;
                case 'tel':
                    if (!/^\d{11,12}$/.test(value)) {
                        error = '전화번호는 11~12자리 숫자만 가능합니다.';
                    }
                    break;
                case 'email':
                    if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
                        error = '유효하지 않은 이메일 형식입니다.';
                    }
                    break;
                default:
                    break;
            }

            setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
        };

        const handleInputChange = (e) => {
            const { name, value } = e.target;

            setFormData({ ...formData, [name]: value });
        };

        const handleBlur = async (e) => {
            const { name, value } = e.target;
            validate(name, value);

            // Common function for duplicate checks
            const checkDuplicate = async (path, errorMsg) => {
                try {
                    const response = await fetch(`${SERVER_URL}${path}${value}`);
                    const isDuplicate = await response.json();
                    if(isDuplicate) {
                        setErrors(prevErrors => ({ ...prevErrors, [name]: errorMsg }));
                    } else {
                        setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
                    }
                } catch (error) {
                    console.error(`${name} 중복 체크 중 오류:`, error);
                }
            }

            switch(name) {
                case 'memId':
                    checkDuplicate("members/id_ck/", '이미 사용중인 아이디입니다.');
                    break;
                case 'email':
                    checkDuplicate("email_ck/", '이미 사용중인 이메일입니다.');
                    break;
                case 'tel':
                    checkDuplicate("tel_ck/", '이미 사용중인 전화번호입니다.');
                    break;
                default:
                    break;
            }
        };

        const handleFileChange = (files) => {
            setSelectedFiles(files);
        };


        const handleDateInputBlur = (e) => {
            const { name, value } = e.target;
            validate(name, value);

            // 입력값이 없을 때, isDateInputFocused를 false로 설정하여 "생년월일" 텍스트를 보여주게 합니다.
            if (!value) {
                setDateInputFocus(false);
            }
        };

        const handleDateInputFocus = () => {
            setDateInputFocus(true);
        };

        const handlePasswordConfirmChange = (e) => {
            setPasswordConfirm(e.target.value);
            if (formData.pwd !== e.target.value) {
                setPasswordError('비밀번호가 일치하지 않습니다.');
            } else {
                setPasswordError(null);
            }
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

            // 회원가입 정보 전송
            const hashedPwd = bcrypt.hashSync(formData.pwd, 10);
            setFormData({...formData, pwd: hashedPwd});

            try {
                const response = await fetch(SERVER_URL + 'api/members', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (response.status === 409) {
                    alert('회원가입 중 이상이 발생 했습니다.');
                } else {
                    const data = await response.json();
                    alert('회원가입에 성공 했습니다!');
                    setFormData({
                        memId: '',
                        pwd: '',
                        type: 'USER',
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
            <div className={styles.signFormContainer}>
                <h2>회원가입 폼</h2>
                <form onSubmit={handleSubmit} className={styles.signForm}>
                    <div className={styles.inputGroup}>
                        <input
                            name="memId"
                            value={formData.memId}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            placeholder=" "
                            required
                            style={{ borderColor: errors.memId ? 'red' : '' }} // 여기서 스타일을 추가합니다.
                        />
                        <label>아이디</label>
                        {errors.memId && <span style={{color: 'red'}}>{errors.memId}</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            name="pwd"
                            value={formData.pwd}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            placeholder=" "
                            required
                            style={{ borderColor: errors.pwd ? 'red' : '' }}
                        />
                        <label>비밀번호</label>
                        {errors.pwd && <span style={{color: 'red'}}>{errors.pwd}</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            name="passwordConfirm"
                            value={passwordConfirm}
                            onChange={handlePasswordConfirmChange}
                            onBlur={handleBlur} // 기존의 handleBlur 함수를 재사용할 수 있습니다.
                            placeholder=" "
                            required
                            style={{ borderColor: passwordError ? 'red' : '' }}
                        />
                        <label>비밀번호 확인</label>
                        {passwordError && <span style={{color: 'red'}}>{passwordError}</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            placeholder=" "
                            required
                            style={{ borderColor: errors.name ? 'red' : '' }}
                        />
                        <label>이름</label>
                        {errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
                    </div>
                    <div className={styles.inputGroup}>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">성별 선택</option>
                        <option value="MALE">남성</option>
                        <option value="FEMALE">여성</option>
                    </select>
                    </div>
                    <div className={styles.inputGroup}>
                        {isDateInputFocused ? (
                            <input
                                type="date"
                                name="bir"
                                value={formData.bir}
                                onChange={handleInputChange}
                                onBlur={handleDateInputBlur}
                                required
                                style={{ borderColor: errors.bir ? 'red' : '' }}
                            />
                        ) : (
                            <input
                                name="bir"
                                value={formData.bir || "생년월일"}
                                onFocus={handleDateInputFocus}
                            />
                        )}
                        {errors.bir && <span style={{color: 'red'}}>{errors.bir}</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            name="tel"
                            value={formData.tel}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            placeholder=" "
                            required
                            style={{ borderColor: errors.tel ? 'red' : '' }}
                        />
                        <label>전화번호</label>
                        {errors.tel && <span style={{color: 'red'}}>{errors.tel}</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            placeholder=" "
                            required
                            style={{ borderColor: errors.email ? 'red' : '' }}
                        />
                        <label>이메일</label>
                        {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            name="addr"
                            value={formData.addr}
                            onChange={handleInputChange}
                            placeholder=""
                            required
                        />
                        <label>주소</label>
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            name="addrDtl"
                            value={formData.addrDtl}
                            onChange={handleInputChange}
                            placeholder=" "
                            required
                        />
                        <label>상세주소</label>
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            name="addrPost"
                            value={formData.addrPost}
                            onChange={handleInputChange}
                            placeholder=" "
                            required
                        />
                        <label>우편번호</label>
                    </div>
                    <FileUpload onFileChange={handleFileChange}/>
                    <div className={styles.inputGroup}>
                    <button type="submit">회원가입</button>
                    </div>
                </form>
            </div>
        );
    }

    export default SignUp;
