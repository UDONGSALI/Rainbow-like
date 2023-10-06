import React, { useEffect, useState, useRef } from "react";
import styles from '../../../css/component/Post/PostForm.module.css';
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../Common/constants";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";

function PostForm(props) {
    const { boardNum } = props;
    const navigate = useNavigate();
    const memId = sessionStorage.getItem("memId");
    const [member, setMember] = useState([]);
    const [content, setContent] = React.useState('');
    const [formData, setFormData] = useState({
        memNum: '',
        boardNum: '1',
        title: '',
        content: '',
        pageView: 0,
        parentsNum: '',
        clubAllowStatus: '',
        clubRecuStatus: '',
        delYN: 'N'
    });
    const [file, setFile] = useState(null);
    const quillRef = useRef(null);

    useEffect(() => {
        fetch(SERVER_URL + `members/id/${memId}`)
            .then(response => response.json())
            .then(data => {
                setMember(data);
                const formSet = {
                    memNum: data.memNum,
                    boardNum: '1',
                    title: '',
                    content: '',
                    pageView: 0,
                    parentsNum: '',
                    clubAllowStatus: '',
                    clubRecuStatus: '',
                    delYN: 'N'
                }
                setFormData(formSet);
            })
            .catch(error => {
                alert('회원 정보를 찾을 수 없습니다!');
                window.location.href = '/login';
            });
    }, []);

    const handleQuillChange = (contentValue) => {
        setContent(contentValue);
        setFormData(prevState => ({ ...prevState, content: contentValue }));
    };


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8090/posts/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                alert('게시글을 작성했습니다.');
                if (file) {
                    const uploadFormData = new FormData();
                    uploadFormData.append('files', file);
                    fetch(SERVER_URL + "/files/table/post", {
                        method: 'POST',
                        body: uploadFormData,
                    });
                }
                navigate(``);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const uploadFileToServer = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch(SERVER_URL + "/files/table/post", {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            // 서버 응답에서 이미지 URL 추출
            return data.fileUrl;
        } catch (error) {
            console.error('File upload error:', error);
            return null;
        }
    };

    function imageHandler() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();

            formData.append('file', file);  // 'file' 필드에 이미지 파일 첨부

            // 서버로 이미지 파일 전송
            const response = await fetch(SERVER_URL + "/files/table/post", {  // 업로드 URL 수정
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            // 이미지 URL 가져오기
            const imageUrl = data.fileUrl;  // URL 가져오는 필드 수정

            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range.index, 'image', imageUrl);
        };
    }

    const modules = {
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image', 'video']
            ],
            handlers: {
                'image': function () {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.click();

                    // 파일 선택 이후의 동작
                    input.onchange = async () => {
                        const file = input.files[0];
                        if (file) {
                            try {
                                // 서버에 파일 업로드
                                const imageUrl = await uploadFileToServer(file);
                                // 이미지 URL을 퀼 에디터에 삽입
                                const range = this.quill.getSelection(true);
                                this.quill.insertEmbed(range.index, 'image', imageUrl);
                            } catch (error) {
                                console.error('Failed to upload image:', error);
                            }
                        }
                    };
                }
            }
        }
    };


    return (
        <div className={styles.registrationFormContainer}>
            <h2>게시글 작성</h2>
            <form onSubmit={handleSubmit} className={styles.registrationForm}>
                <div className={styles.inputGroup}>
                    <input
                        type="hidden"
                        name="memNum"
                        value={member.memNum || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>제목:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>내용:</label>
                    <ReactQuill
                        ref={quillRef}
                        value={formData.content}
                        onChange={handleQuillChange}
                        // modules={modules}
                        bounds={".registrationFormContainer"}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>첨부파일:</label>
                    <input
                        type="file"
                        name="attachment"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit">게시글 작성</button>
            </form>
        </div>
    );
}

export default PostForm;
