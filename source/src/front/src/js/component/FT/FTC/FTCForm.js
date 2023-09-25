import React, {useState} from "react";
import styles from '../../../../css/component/Club/ClubForm.module.css';
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from "../../Common/constants";


function FTCForm(props){
    const navigate = useNavigate();
    const {memId} = props;

    const [formData, setFormData] = useState({
        memNum: 1,
        speField: '',
        applyContent: '',
        statusDtl: '',
        ftmYN: 'N',

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        // API 호출하여 게시글 정보 전송
        fetch(SERVER_URL + 'ftc/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                alert('게시글을 작성했습니다.');
                console.log(data);
                const newPostId = data.ftConsumerNum; // 예: 응답 데이터에서 게시글의 ID 필드를 추출합니다.
                navigate(`/ftc/${newPostId}`); // 추출한 ID를 사용하여 리디렉션합니다.

            })
            .catch((error) => {
                // 오류 처리
                console.error('Error:', error);
            });
    };

    return(
        <div className={styles.registrationFormContainer}>
            <h2>여성인재 신청</h2>
            <form onSubmit={handleSubmit} className={styles.registrationForm}>

                <div className={styles.inputGroup}>
                    <input
                        type="number"
                        name="memNum"
                        value={formData.memNum}
                        onChange={handleChange}
                        placeholder="신청자"
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                <select
                    name="speField"
                    value={formData.speField}
                    onChange={handleChange}
                    required
                >
                    <option value="">분야 선택</option>
                    <option value="IT">IT 전반</option>
                    <option value="IT / front">IT / front</option>
                    <option value="IT / back">IT / back</option>
                    <option value="IT / ect">IT / 기타</option>
                    <option value="디자인">디자인 / 전반</option>
                    <option value="디자인 / 그림">디자인 / 그림</option>
                    <option value="디자인 / 영상">디자인 / 영상</option>
                    <option value="디자인 / 수공예">디자인 / 수공예</option>
                    <option value="디자인 / 기타">디자인 / 기타</option>
                    <option value="기타">기타</option>
                </select>
                </div>


                <div className={styles.inputGroup}>
                    <textarea
                        name="applyContent"
                        value={formData.applyContent}
                        onChange={handleChange}
                        placeholder="연락처, 포트폴리오 주소, 자기소개 등을 적어주세요.
"
                        required
                    >
                    </textarea>
                </div>


                <button type="submit">등록 신청</button>
            </form>
        </div>
    );

};


export default FTCForm;