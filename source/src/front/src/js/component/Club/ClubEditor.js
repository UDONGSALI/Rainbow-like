import React, {useState, useEffect} from "react";
import styles from  '../../../css/component/Club/ClubForm.module.css';
import {useNavigate, useParams} from "react-router-dom";
import {SERVER_URL} from "../Common/constants";

function ClubEditor({postNum}){
    // const { id } = useParams();
    const id = postNum;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        memNum: '',
        boardNum: '',
        title: '',
        content: '',
        writeDate: '',
        editDate: '',
        pageView: '',
        parentsNum: '',
        clubAllowStatus: '',
        clubRecuStatus: '',
        delYN : 'N'
    });



    useEffect(() => {
        fetch(SERVER_URL + "posts/" + id)
            .then(response => response.json())
            .then(data => setFormData(data))
            .catch(error => console.error(error));
    }, [id]);

    useEffect(() => {
        fetch(SERVER_URL + "posts/" + id)
            .then(response => response.json())
            .then(formData => {
                // 데이터를 가져와서 formData 상태를 업데이트
                setFormData({
                    memNum: formData.member.memNum,
                    boardNum: formData.board.boardNum,
                    title: formData.post.title,
                    content: formData.post.content,
                    writeDate: formData.post.writeDate,
                    editDate: new Date(),
                    pageView: formData.post.pageView,
                    parentsNum: formData.post.parentsNum,
                    clubAllowStatus: formData.post.clubAllowStatus,
                    clubRecuStatus: formData.post.clubRecuStatus,
                    delYN: formData.post.delYN
                });
            })
            .catch(error => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (value === '') {
            // 선택되지 않았을 때 이전 값을 유지
            setFormData({ ...formData });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        // API 호출하여 게시글 정보 전송
        fetch(SERVER_URL + "posts/edit/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                alert('게시글을 수정했습니다.');

                //게시글 상세로 이동
                navigate(`/clubs/${id}`);
            })
            .catch((error) => {
                // 오류 처리
                console.error('Error:', error);
            });
    };

    return (
        <div className={styles.registrationFormContainer}>
            <h2>게시글 수정 폼</h2>
            <form onSubmit={handleSubmit} className={styles.registrationForm}>

                <div className={styles.inputGroup}>
                    <select
                        name="clubAllowStatus"
                        value={formData.clubAllowStatus}
                        onChange={handleChange}
                        required
                    >
                        <option value="">허가여부</option>
                        <option value="허가">허가</option>
                        <option value="거부">거부</option>

                    </select>
                </div>
                <div className={styles.inputGroup}>
                    <select
                        name="clubRecuStatus"
                        value={formData.clubRecuStatus}
                        onChange={handleChange}
                        required
                    >
                        <option value="">진행 현황</option>
                        <option value="진행중">진행중</option>
                        <option value="모집중">모집중</option>
                        <option value="모집마감">모집마감</option>
                        <option value="거부">거부</option>


                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        />
                </div>

                <div className={styles.inputGroup}>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    >
                        본문을 작성해주세요.
                    </textarea>
                </div>




                <button type="submit">게시글 수정</button>
            </form>
        </div>
    );

};

export default ClubEditor;