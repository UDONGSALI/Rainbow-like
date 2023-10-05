import React, {useEffect, useState} from "react";
import styles from '../../../../css/component/Club/ClubForm.module.css';
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from "../../component/Common/constants";

function smsForm(){
    const [formData, setFormData] = useState({});
    const [recepData, setRecepData] = useState({});

    useEffect(() => {
        const formSet = {
           smsType : '',
            sendTel : '01075260231',
            content : '',
            sendDate : new Date.now()
        }
        const recepSet = {
            smsHistNum : '',
            recepTel : '',
        }

        setFormData(formSet);
        setRecepData(recepSet);

    }, [formData.content]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // API 호출하여 게시글 정보 전송
        fetch('http://localhost:8090/sms/newhist', {
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
                // 오류 처리
                console.error('Error:', error);
            });


    };

    return (
        <div className={styles.registrationFormContainer}>
            <h2>소모임 신청 폼</h2>
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
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="소모임 제목"
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="소모임 본문"
                        required
                    >
                        본문을 작성해주세요.
                    </textarea>
                </div>


                <button type="submit">게시글 작성</button>
            </form>
        </div>
    );

};


export default smsForm;