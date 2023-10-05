import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const LoginMember = () => {
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true); // 추가: 데이터 로딩 상태

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const memId = localStorage.getItem('memId');

                if (!memId) {
                    throw new Error('memId가 없습니다.');
                }

                const response = await fetch(`/api/members/${memId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('멤버 정보를 가져오는 데 실패했습니다.');
                }

                const data = await response.json();
                setMember(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching member data:', error);
                setLoading(false);
                // TODO: 로그인을 하셔야 대관신청을 하실 수 있습니다.
                // 아래의 리디렉션 코드를 여기에 추가
                window.location.href = '/login';
            }
        };

        fetchMemberData();
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
                        <li>
                            <p>*</p>
                            <b>휴대폰번호</b> <input value={member.tel} />
                        </li>
                        <li>
                            <p>*</p>
                            <b>이메일주소</b> <input value={member.email} />
                        </li>
                        <li>
                            <b>단체명</b>
                            <input />
                        </li>
                        <li>
                            <b>대표자</b>
                            <input value={member.name} />
                        </li>
                        <li>
                            <b>사업자등록증</b>
                            <button>파일추가</button>
                        </li>
                    </ul>
                </div>
            ) : (
                <p>멤버 정보를 불러오는 중이거나 로그인이 필요합니다.</p>
            )}
        </div>
    );
}

export default LoginMember;