import React, {useState} from "react";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import '../../css/components/ClubForm.css';
import '../../../css/component/Club/ClubForm.css';
import {useNavigate} from "react-router-dom";
import '../../../../../helpme/source/src/front/src/css/component/ClubForm.css';
=======
<<<<<<< HEAD:source/src/front/src/js/component/Club/ClubForm.js
import '../../../css/component/ClubForm.css';
import {useNavigate} from "react-router-dom";

=======
import '../../css/components/ClubForm.css';
import {useNavigate} from "react-router-dom";
import '../../../../../helpme/source/src/front/src/css/component/ClubForm.css';
>>>>>>> 3ba22f2 (no message):source/src/front/src/js/component/ClubForm.js
>>>>>>> 0d3c17c (no message)
=======
import '../../css/components/ClubForm.css';
import {useNavigate} from "react-router-dom";
import '../../../../../helpme/source/src/front/src/css/component/ClubForm.css';
>>>>>>> 583efb3 (no message)
function ClubForm(){
    // 사용자가 선택한 멤버와 게시판의 ID를 저장하기 위한 상태 변수
    const navigate = useNavigate();
=======
import './ClubForm.css';

function ClubForm(){
    // 사용자가 선택한 멤버와 게시판의 ID를 저장하기 위한 상태 변수
>>>>>>> 4d1ef37 (no message)

    const [formData, setFormData] = useState({
        memNum: 1,
        boardNum: '',
        title: '',
        content: '',
        writeDate: new Date(),
        editDate: '',
        pageView: 0,
        parentsNum: '',
        clubAllowStatus: '승인대기',
        clubRecuStatus: '',
<<<<<<< HEAD
=======
        // member: {
        //     memNum: 1
        // },
        // board: {
        //     boardNum: 10
        // },
>>>>>>> 4d1ef37 (no message)
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

<<<<<<< HEAD
=======
        // 비밀번호 암호화

>>>>>>> 4d1ef37 (no message)
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
<<<<<<< HEAD

                const newPostId = data.postNum; // 예: 응답 데이터에서 게시글의 ID 필드를 추출합니다.
                navigate(`/posts/${newPostId}`); // 추출한 ID를 사용하여 리디렉션합니다.

=======
                // 폼 초기화
                setFormData({
                    memNum: 1,
                    boardNum: '',
                    title: '',
                    content: '',
                    writeDate: new Date(),
                    editDate: '',
                    pageView: 0,
                    parentsNum: '',
                    clubAllowStatus: '승인대기',
                    clubRecuStatus: '',
                });
>>>>>>> 4d1ef37 (no message)
            })
            .catch((error) => {
                // 오류 처리
                console.error('Error:', error);
            });
    };

    return (
        <div className="registration-form-container">
            <h2>게시글 작성 폼</h2>
            <form onSubmit={handleSubmit} className="registration-form">
                <div className="input-group">
                    <input
                        type="number"
                        name="memNum"
                        value={formData.memNum}
                        onChange={handleChange}
<<<<<<< HEAD
                        placeholder="멤버"
=======
                        placeholder="멤바"
>>>>>>> 4d1ef37 (no message)
                        required
                    />
                </div>
                <div className="input-group">
                    <select
                        name="boardNum"
                        value={formData.boardNum}
                        onChange={handleChange}
                        required
                    >
                        <option value="">게시판 선택</option>
                        <option value="1">공지사항</option>
                        <option value="2">언론보도</option>
                        <option value="3">세종시 기관 및 단체소식</option>
                        <option value="4">여플 소식</option>
                        <option value="5">뉴스레터</option>
                        <option value="6">대관 이용 후기</option>
                        <option value="7">노무 상담 게시판</option>
                        <option value="8">온라인 상담</option>
                        <option value="9">모임 페이지</option>
                        <option value="10">club_test</option>
                    </select>
            </div>
                <div className="input-group">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="게시글 제목"
                        required
                        />
                </div>

                <div className="input-group">
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="게시글 본문"
                        required
                    >
                        본문을 작성해주세요.
                    </textarea>
                </div>
<<<<<<< HEAD
=======
                {/*<div className="input-group" >*/}
                {/*    <input*/}
                {/*        type="number"*/}
                {/*        name="parentNum"*/}
                {/*        value={formData.parentNum}*/}
                {/*        onChange={handleChange}*/}
                {/*        placeholder="부모게시글"*/}
                {/*        required*/}
                {/*    />*/}
                {/*</div>*/}

                {/*<div className="input-group" >*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        name="clubRecuStatus"*/}
                {/*        value={formData.clubRecuStatus}*/}
                {/*        onChange={handleChange}*/}
                {/*        placeholder="진행현황"*/}
                {/*        required*/}
                {/*    />*/}
                {/*</div>*/}
>>>>>>> 4d1ef37 (no message)


                <button type="submit">게시글 작성</button>
            </form>
        </div>
    );

};

export default ClubForm;