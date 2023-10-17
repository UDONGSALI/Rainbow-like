import React, { useEffect, useState } from 'react';
import {useHistory, useLocation, useNavigate} from 'react-router-dom';
import {SERVER_URL} from "../Common/constants";


const LoginMember = () => {
    const [member, setMember] = useState(null);
    const location = useLocation();
    const boardNum = location.state?.boardNum;
    const navigate = useNavigate();
    const memId = sessionStorage.getItem("memId");
    const [formData, setFormData] = useState();

    useEffect(() => {
        fetch(SERVER_URL + `members/id/${memId}`)
            .then(response => response.json())
            .then(data => {
                setMember(data);

            })
            .catch(error => {
                alert('회원 정보를 찾을 수 없습니다!');
                window.location.href = '/login';
            });
    }, []);

    return (
        <div id="title">
            {member !== null ? (  // member가 null이 아닌 경우에만 렌더링
                <div className="memApplyInfo">
                    <h3>신청자 정보</h3>
                    <hr />
                    <ul>
                        <li>
                            <p>*</p>
                            <b>신청자명</b> <input value={member.name} />
                        </li>
                        <hr />
                        <li>
                            <p>*</p>
                            <b>휴대폰번호</b> <input value={member.tel} />
                        </li>
                        <hr />
                        <li>
                            <p>*</p>
                            <b>이메일주소</b> <input value={member.email} />
                        </li>
                        <hr />
                        <li>
                            <b>단체명</b>
                            <input />
                        </li>
                        <hr />
                        <li>
                            <b>대표자</b>
                            <input value={member.name} />
                        </li>
                        <hr />
                        <li>
                            <b>사업자등록증</b>
                            <button>파일추가</button>
                        </li>
                        <hr />
                    </ul>
                </div>
            ) : (
                <p>멤버 정보를 불러오는 중이거나 로그인이 필요합니다.</p>
            )}
        </div>
    );
}

export default LoginMember;