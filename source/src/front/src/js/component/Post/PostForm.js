import React, { useEffect, useState, useRef, useMemo } from "react";
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

    console.log(content)
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

    function imageHandler() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.setAttribute('multiple', 'true');
        input.click();

        input.onchange = async () => {
            const files = Array.from(input.files);
            const formData = new FormData();

            files.forEach(file => {
                formData.append('file', file);
            });

            // 테이블 이름 및 번호에 따라 필요한 값을 설정해주세요.
            formData.append('tableName', 'post');
            formData.append('number', '0');

            const response = await fetch(`${SERVER_URL}files/qill`, {
                method: 'POST',
                body: formData,
            });
            const imageUrls = await response.json();

            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();

            imageUrls.forEach((imageUrl, index) => {
                editor.insertEmbed(range.index + index, 'image', imageUrl);
            });
        };
    }
    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    ['image'],
                ],
                handlers: {
                    // 이미지 처리는 우리가 직접 imageHandler라는 함수로 처리할 것이다.
                    image: imageHandler,
                },
            },
        };
    }, []);
// 위에서 설정한 모듈들 foramts을 설정한다
    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'image',
    ];
    const [value, setValue] = useState(''); // 에디터 속 콘텐츠를 저장하는 state
    const quillRef = useRef(); // 에디터 접근을 위한 ref return (

console.log(content)
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
                        theme="snow"
                        value={content}
                        onChange={handleQuillChange}
                        modules={modules}
                        formats={formats}
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
