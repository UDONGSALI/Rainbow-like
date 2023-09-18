import React, {useState, useEffect} from "react";
import '../../../css/component/Club/ClubForm.css';
import {useNavigate, useParams} from "react-router-dom";
import {SERVER_URL} from "../Common/constants";

function ClubEditor(){
    const { id } = useParams();
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
    });



    useEffect(() => {
        fetch(SERVER_URL + "posts/" + id)
            .then(response => response.json())
            .then(data => setFormData(data))
            .catch(error => console.error(error));
    }, [id]);

    useEffect(() => {
        // id를 사용하여 데이터를 불러온다고 가정하고, API 호출 등으로 데이터를 가져옴
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
        fetch(SERVER_URL + "api/posts/" + id, {
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
                navigate(`/posts/${id}`);
            })
            .catch((error) => {
                // 오류 처리
                console.error('Error:', error);
            });
    };

    return (
        <div className="registration-form-container">
            <h2>게시글 수정 폼</h2>
            <form onSubmit={handleSubmit} className="registration-form">
                <div className="input-group">
                    <input
                        type="number"
                        name="memNum"
                        value={formData.memNum}
                        onChange={handleChange}
                        placeholder="멤바"
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
                <div className="input-group">
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

                <div className="input-group">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        />
                </div>

                <div className="input-group">
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