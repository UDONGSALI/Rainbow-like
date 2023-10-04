import React, { useEffect, useState } from "react";
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
    const [formData, setFormData] = useState({});

    useEffect(() => {
        memberSet();
        const formSet = {
            memNum: member.memNum,
            boardNum: boardNum,
            title: '',
            content: '',
            pageView: 0,
            parentsNum: '',
            clubAllowStatus: '',
            clubRecuStatus: '',
            delYN: 'N'
        }
        setFormData(formSet);
    }, [member.memNum]);
    const handleQuillChange = (content) => {
        setFormData({ ...formData, content });
    };

    const memberSet = () => {
        fetch(SERVER_URL + `members/id/${memId}`)
            .then(response => response.json())
            .then(data => {
                setMember(data);
            })
            .catch(error => {
                alert('회원 정보를 찾을 수 없습니다!');
                window.location.href = '/login';
            });
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
            };

            if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
                reader.readAsDataURL(file);
            }
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8090/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                alert('게시글을 작성했습니다.');

                const newPostId = data.postNum;
                navigate(`/clubs/${newPostId}`);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    function mediaHandler() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*,video/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();

            formData.append('media', file);

            // 로컬에서 미디어 파일의 URL을 생성합니다.
            const mediaUrl = URL.createObjectURL(file);

            const range = this.quill.getSelection(true);

            // 파일 확장자를 확인하여 이미지나 비디오로 처리합니다.
            if (/^image\//.test(file.type)) {
                this.quill.insertEmbed(range.index, 'image', mediaUrl);
            } else if (/^video\//.test(file.type)) {
                this.quill.insertEmbed(range.index, 'video', mediaUrl, 'user');
            }
        };
    }


    return (
        <div className={styles.registrationFormContainer}>
            <h2>게시글 작성</h2>
            <form onSubmit={handleSubmit} className={styles.registrationForm}>
                <div className={styles.inputGroup}>
                    <input
                        type="hidden"
                        name="memNum"
                        value={member.memNum}
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
                        value={formData.content}
                        onChange={handleQuillChange}
                        modules={{
                            toolbar: [
                                [{ 'header': '1' }, { 'font': [] }],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                ['bold', 'italic', 'underline'],
                                [{ 'color': [] }, { 'background': [] }],
                                ['link', 'image', 'video']
                            ]
                        }}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>첨부파일:</label>
                    <input
                        type="file"
                        name="attachment"
                        accept=".jpg,.jpeg,.png,.gif,.mp4,.mov,.avi,.flv"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit">게시글 작성</button>
            </form>
        </div>
    );
}

export default PostForm;
