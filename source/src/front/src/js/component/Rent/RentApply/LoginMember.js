import React, { useEffect, useState } from 'react';
import {useHistory, useLocation, useNavigate} from 'react-router-dom';
import {SERVER_URL} from "../../Common/constants";
import styles from "../../../../css/component/Rent/LoginMember.module.css"


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
        <div id={styles.title}>
            {member !== null ? (  // member가 null이 아닌 경우에만 렌더링
                <div className={styles.memApplyInfo}>
                    <h3>신청자 정보</h3>
                    <hr className={styles.mainHr}/>
                    <ul>
                        <li>
                            <p>*</p>
                            <b className={styles.name}>신청자명</b> <input className={styles.memBasicInput} value={member.name} />
                        </li>
                        <hr />
                        <li>
                            <p>*</p>
                            <b>휴대폰번호</b> <input  className={styles.memBasicInput} value={member.tel} />
                        </li>
                        <hr />
                        <li>
                            <p>*</p>
                            <b>이메일주소</b> <input  className={styles.memBasicInput} value={member.email} />
                        </li>
                        <hr />
                        <li>
                            <b className={styles.group}>단체명</b>
                            <input  className={styles.memBasicInput} />
                        </li>
                        <hr />
                        <li>
                            <b className={styles.ceo}> 대표자</b>
                            <input   className={styles.memBasicInput} value={member.name} />
                        </li>
                        <hr />
                        <li>
                            <b>사업자등록증</b>
                            <div>
                            <button style={{
                                width: "80px",
                                height: "40px",
                                backgroundColor: "#3d0c69",
                                color: "#ffffff",
                                borderRadius: '5px',
                                fontSize: "15px",
                                fontWeight: "bold",
                                marginRight: "10%",
                                position: "relative",
                                border: "1px solid #ffffff"
                            }}
                            >파일첨부</button>
                                {/*<p>이용료 면제 기준 해당시 사업자 등록증 첨부해주세요.</p>*/}
                            </div>
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