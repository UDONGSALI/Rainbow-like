import React, { useEffect, useState, useRef, useMemo } from "react";
import styles from '../../../css/component/Post/PostForm.module.css';
import {useLocation, useNavigate} from "react-router-dom";
import { SERVER_URL } from "../Common/constants";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
import useFetch from "../hook/useFetch";

function PostForm({postNum}) {
    const location = useLocation();
    const boardNum = location.state?.boardNum;
    const navigate = useNavigate();
    const memId = sessionStorage.getItem("memId");
    const [member, setMember] = useState([]);
    const [content, setContent] = React.useState('');
    const [formData, setFormData] = useState({
        memNum: '',
        boardNum: boardNum,
        title: '',
        content: '',
        pageView: 0,
        conselStatus: 'WAIT',
        parentsNum: '',
        clubAllowStatus: 'WAIT',
        clubRecuStatus: '',
        delYN: 'N'
    });
    const [filesNumbers, setFilesNumbers] = useState([]);

    const [previewImages, setPreviewImages] = useState([]);


    useEffect(() => {
        fetch(SERVER_URL + `members/id/${memId}`)
            .then(response => response.json())
            .then(data => {
                setMember(data);
                const formSet = {
                    memNum: data.memNum,
                    boardNum: boardNum,
                    title: '',
                    content: '',
                    pageView: 0,
                    conselStatus: 'WAIT',
                    parentsNum: '',
                    clubAllowStatus: 'WAIT',
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
        console.log(contentValue)
        setFormData(prevState => ({ ...prevState, content: contentValue }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${SERVER_URL}posts/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                alert('게시글을 작성했습니다.');
                if (filesNumbers && filesNumbers.length > 0) {
                    filesNumbers.push(postNum+1);
                    fetch(SERVER_URL + "files/edit", {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(filesNumbers),  // JSON 형식으로 변환
                    })
                        .then(response => response.json())
                        .then(data => {
                            // 처리 로직 (예: 성공 메시지 출력)
                        })
                        .catch(error => {
                            console.error("Error:", error);
                        });
                }
            })
            .then(() => {
                handleRedirect();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const handleRedirect = () => {
        if (boardNum == 1 || boardNum == 2) {
            navigate(`/post/${boardNum}`);
        } else if (boardNum >= 3 && boardNum <= 5) {
            navigate(`/imgPost/${boardNum}`);
        } else if (boardNum >= 7) {
            navigate(`/csl/${boardNum}`);
        } else {
            navigate(`/`);
        }
    };

    function imageHandler() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.setAttribute('multiple', 'true');
        input.click();

        input.onchange = () => {
            const files = Array.from(input.files);
            const formData = new FormData();

            files.forEach(file => {
                formData.append('file', file);
            });

            formData.append('tableName', 'post');
            formData.append('number', postNum+1);
            console.log(formData)

            fetch(`${SERVER_URL}files/FileNums`, {
                method: 'POST',
                body: formData,
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    setFilesNumbers(prevFilesNumbers => [...prevFilesNumbers, ...data]);
                    console.log(data);
                })
                .catch(error => {
                    console.error("There was a problem with the fetch operation:", error.message);
                });

            if (!files.length) return;


            const storageBaseUrl = "https://storage.googleapis.com/rainbow_like/";



            const urlsForFiles = files.map(file => {
                const postUrlPath = `post/${postNum+1}/${file.name}`;
                return storageBaseUrl + postUrlPath;
            });

            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();

            if (range) {
                urlsForFiles.forEach((url, index) => {
                    editor.insertEmbed(range.index + index, 'image', url);
                });
            }
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
                <button type="submit">게시글 작성</button>
            </form>
        </div>
    );
}

export default PostForm;