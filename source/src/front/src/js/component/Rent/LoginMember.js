import React, { useEffect, useState } from 'react';

const LoginMember = () => {
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true); // 추가: 데이터 로딩 상태

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                // 로컬 스토리지에서 세션 토큰 가져오기
                const sessionToken = localStorage.getItem('sessionToken');

                if (!sessionToken) {
                    // 세션 토큰이 없는 경우 로그인 페이지로 리디렉션
                    // window.location.href = '/login'; // 로그인 페이지 URL에 맞게 변경
                    return;
                }

                // 서버로부터 멤버 정보 가져오기
                const response = await fetch('/api/members/current-user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionToken}`
                    },
                });

                if (!response.ok) {
                    throw new Error('멤버 정보를 가져오는 데 실패했습니다.');
                }

                // JSON 형식으로 변환된 응답을 가져와서 상태 업데이트
                const data = await response.json();
                setMember(data);
                setLoading(false); // 추가: 로딩 상태 갱신
            } catch (error) {
                console.error('Error fetching member data:', error);
                setLoading(false); // 추가: 로딩 상태 갱신
                // TODO: 사용자에게 오류 메시지를 표시하는 로직 추가
            }
        };

        // 컴포넌트가 마운트될 때 데이터를 가져오도록 설정
        fetchMemberData();
    }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

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