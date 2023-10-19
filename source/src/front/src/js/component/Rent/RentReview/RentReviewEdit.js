import React, {useEffect, useState, useRef, useMemo} from "react";
import styles from '../../../../css/component/Post/PostForm.module.css';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {SERVER_URL} from "../../Common/constants";
import 'react-quill/dist/quill.snow.css';

export default function RentReviewEdit() {
    const {postNum} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const memId = sessionStorage.getItem("memId");
    const [member, setMember] = useState([]);
    const [post, setPost] = useState({});
    const [file, setFile] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [updatedPost, setUpdatedPost]=useState({});
    const [formData, setFormData] = useState({
        memNum: '',
        boardNum: location.state?.boardNum || '',
        title: '',
        content: '',
        parentsNum: '',
        delYN: 'N'
    });

    //로그인한 멤버정보 가지고 오기
    useEffect(() => {
        fetch(SERVER_URL + `members/id/${memId}`)
            .then(response => response.json())
            .then(data => {
                setMember(data);

                // 필요한 필드만 업데이트
                setFormData(prevFormData => ({
                    ...prevFormData,
                    memNum: data.memNum,
                    memName: data.name,
                    phone: data.tel,
                    email: data.email
                }));
            })
            .catch(error => {
                alert('회원 정보를 찾을 수 없습니다!');
                window.location.href = '/login';
            });
    }, []);

    //해당 게시글 가지고 오기
    useEffect(() => {
        // postNum이 게시글의 식별자라고 가정합니다
        fetch(SERVER_URL + `post/${postNum}`)
            .then(response => response.json())
            .then(data => {
                setPost(data);
                console.log(data);

                // 필요한 필드만 업데이트
                setFormData(prevFormData => ({
                    ...prevFormData,
                    title: data.title,
                    content: data.content,
                    parentsNum: data.parentsNum,
                }));
            })
            .catch(error => {
                alert('게시글 정보를 찾을 수 없습니다!');
            });
    }, [postNum]);

    // 게시글을 업데이트하는 함수
    const updatePost = async () => {
        try {
            const response = await fetch(SERVER_URL + `post/${postNum}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: formData.title,
                    content: formData.content,
                    parentsNum: formData.parentsNum,
                }),
            });
            console.log('Response Status:', response.status);
            // 성공적으로 처리됐을 때의 처리 (예: 다른 페이지로 리다이렉트하거나 성공 메시지 표시 등)
            if (!response.ok) {
                throw new Error('게시글 업데이트에 실패했습니다');
            }


        } catch (error) {
            console.error(error);
            alert('게시글 업데이트에 실패했습니다');

        }
    };

    const handleUpdateButtonClick = () => {
        updatePost();
    };


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    };

    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            setFile(newFile);
            setSelectedFiles([newFile]);
        }
    };

    const handleFileCancel = () => {
        setFile(null);
        setSelectedFiles([]);
    };



    return (
        <div className={styles.parentContainer}>
            <div className={styles.postFormContainer} >
                <div className={styles.formHeader}>
                    <span className={styles.formHeaderText}>게시글 등록</span>
                </div>
                <hr className={`${styles.formHeaderLine} ${styles.otherHr}`}/>
                <div className={styles.inputGroup} style={{width:"100%"}}>
                    <label className={styles.label}><span className={styles.required}>*</span>이름</label>
                    <input
                        type="text"
                        name="memName"
                        value={formData.memName}
                        disabled
                        className={styles.input}
                        style={{width: "40%",}}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}><span className={styles.required}>*</span>연락처</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        style={{width: "40%",}}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}><span className={styles.required}>*</span>이메일 주소</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        style={{width: "40%",}}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}><span className={styles.required}>*</span>제목</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        style={{
                            width: "100%",
                        }}
                    />
                </div>
                <div className={styles.inputGroup} >
                    <label className={styles.label}><span className={styles.required}>*</span>내용</label>
                    <textarea
                        type="text"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            height : "400px",
                            maxHeight: "100%",
                            border: "1px solid #ccc",
                            borderRadius: '5px',
                        }}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>첨부파일</label>
                    <div className={styles.buttonInfoWrap} >
                        <button
                            style={{
                                width: '80px',
                                height: '40px',
                                backgroundColor: '#3d0c69',
                                color: '#ffffff',
                                borderRadius: '5px',
                                fontSize: '15px',
                                fontWeight: 'bold',
                                marginRight: '10%',
                                position: 'relative',
                                border: '1px solid #ffffff',

                            }}
                            onClick={() => document.getElementById('fileInput').click()}
                        >
                            파일첨부
                        </button>
                        {file && (
                            <>
                                <div className={styles.buttonInfo} style={{display:"flex"}}>
                                    <p>선택된 파일: {file.name}</p>
                                    <button className={styles.ceoFile}
                                            style={{
                                                width: '65px',
                                                height: '40px',
                                                backgroundColor: '#c694fa',
                                                color: '#ffffff',
                                                borderRadius: '5px',
                                                fontSize: '15px',
                                                fontWeight: 'bold',
                                                marginRight: '10%',
                                                position: 'relative',
                                                border: '1px solid #ffffff',
                                            }}
                                            onClick={handleFileCancel}>취소
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                    <input
                        type="file"
                        id="fileInput"
                        style={{display: 'none'}}
                        onChange={handleFileChange}
                    />
                </div>

                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.submitButton} onClick={handleUpdateButtonClick}>등록</button>
                    <button type="button" onClick={() => navigate('/rent/reviewPost')}
                            className={styles.redirectButton}>목록으로
                    </button>
                </div>
            </div>
        </div>
    )
        ;
}

