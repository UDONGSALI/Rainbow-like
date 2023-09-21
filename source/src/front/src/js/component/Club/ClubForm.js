import React, {useState} from "react";
import styles from '../../../css/component/Club/ClubForm.module.css';
import {useNavigate} from "react-router-dom";

function ClubForm(){
    // 사용자가 선택한 멤버와 게시판의 ID를 저장하기 위한 상태 변수
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        memNum: 1,
        boardNum: '9',
        title: '',
        content: '',
        writeDate: new Date(),
        editDate: '',
        pageView: 0,
        parentsNum: '',
        clubAllowStatus: '승인대기',
        clubRecuStatus: '',
        delYN : 'N'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // API 호출하여 게시글 정보 전송
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

                const newPostId = data.postNum; // 예: 응답 데이터에서 게시글의 ID 필드를 추출합니다.
                navigate(`/clubs/${newPostId}`); // 추출한 ID를 사용하여 리디렉션합니다.

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
                        type="number"
                        name="memNum"
                        value={formData.memNum}
                        onChange={handleChange}
                        placeholder="멤버"
                        required
                    />
                </div>
            {/*    <div className={styles.inputGroup}>*/}
            {/*        <select*/}
            {/*            name="boardNum"*/}
            {/*            value={formData.boardNum}*/}
            {/*            onChange={handleChange}*/}
            {/*            required*/}
            {/*        >*/}
            {/*            <option value="">게시판 선택</option>*/}
            {/*            <option value="1">공지사항</option>*/}
            {/*            <option value="2">언론보도</option>*/}
            {/*            <option value="3">세종시 기관 및 단체소식</option>*/}
            {/*            <option value="4">여플 소식</option>*/}
            {/*            <option value="5">뉴스레터</option>*/}
            {/*            <option value="6">대관 이용 후기</option>*/}
            {/*            <option value="7">노무 상담 게시판</option>*/}
            {/*            <option value="8">온라인 상담</option>*/}
            {/*            <option value="9">모임 페이지</option>*/}
            {/*            <option value="10">club_test</option>*/}
            {/*        </select>*/}
            {/*</div>*/}
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

export default ClubForm;