import styles from "../../../../css/component/Mypage/MyInfoEdit.module.css"
import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from "../../Common/constants";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function MemberInfoEdit() {

    const [formData, setFormData] = useState({
        memId: '',
        pwd: '',
        passwordConfirm: "",
        name: '',
        gender: '',
        bir: '',
        tel: '',
        email: '',
        addr: '',
        addrDtl: '',

    });

    const [memNum, setMemNum] = useState(null);
    const [memberInfo, setMemberInfo] = useState(null);
    const [gender, setGender] = useState(memberInfo ? memberInfo.gender : "");
    const [email, setEmail] = useState(memberInfo ? memberInfo.email : '');
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [isPlaceholderVisible, setPlaceholderVisible] = useState(true);
    const [smsConsent, setSmsConsent] = useState(false);
    const [emailConsent, setEmailConsent] = useState(false);
    const [selectedPathways, setSelectedPathways] = useState([]);

    const navigate = useNavigate();
    const handleFocus = () => {
        setPlaceholderVisible(false);
    };


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowPasswordConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleSmsConsentChange = () => {
        setSmsConsent(!smsConsent);
    };

    const handleEmailConsentChange = () => {
        setEmailConsent(!emailConsent);
    };

    const handleBlur = () => {
        if (!password) {
            setPlaceholderVisible(true);
        }

        if (password && passwordConfirm && password !== passwordConfirm) {
            setPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setPasswordError('');
        }
    };




        const handleCheckboxChange = (event) => {
            const {value} = event.target;

            // 이미 선택된 경로면 제거, 아니면 추가
            setSelectedPathways((prevSelected) => {
                if (prevSelected.includes(value)) {
                    return prevSelected.filter((pathway) => pathway !== value);
                } else {
                    return [...prevSelected, value];
                }
            });
        };


    function redirectToURL1() {
        window.location.href = "http://localhost:3000/mypage/edu";
    };

    function redirectToURL2() {
        window.location.href = "http://localhost:3000/mypage/infoEditSuccess";
    };

    useEffect(() => {
        // 로그인한 사용자 정보를 가져오는 방법에 따라서 구현
        const fetchedUserInfo = {memNum: sessionStorage.getItem("memNum")};
        setMemNum(fetchedUserInfo.memNum); // memNum 상태 업데이트
    }, []);

    useEffect(() => {
        fetchMember();
    }, [memNum]);

    const fetchMember = () => {
        if (memNum === null) {
            return;
        }

        fetch(`${SERVER_URL}members/memInfo/${memNum}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // 멤버 정보를 받아온 후, 상태에 저장
                setMemberInfo(data);
                setGender(data.gender || ''); // gender가 null이면 빈 문자열로 초기화
            })
            .catch((error) => {
                console.error("API 호출 중 오류 발생:", error);
            });
    };

    return (
        <div>
            <div id={styles.title}>
                <div className={styles.main1}>
                    <div className={styles.editProcess}>
                        <div className={styles.row}>
                            <div className={styles.col1}>
                                <p>STEP 01</p><h4>정보입력</h4>
                                <hr/>
                            </div>
                            <div className={styles.col2}>
                                <img
                                    src="https://storage.googleapis.com/rainbow_like/img/nextButton.png"
                                    alt="이동"
                                    style={{Width: "60px", height: "60px"}}/>
                            </div>
                            <div className={styles.col3}>
                                <p>STEP 02</p><h4>수정완료</h4>
                                <hr/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.main2}>
                    <h3>필수입력사항</h3>
                    <hr/>
                    <div className={styles.basicInfo}>
                        <div className={styles.userId}>
                            <div><span>*</span><b>아이디</b></div>
                            <div> {memberInfo && memberInfo.memId}</div>
                        </div>
                        <hr/>

                        <div className={styles.userPwd}>
                            <div>
                                <span>*</span>
                                <b>비밀번호</b>
                            </div>
                            <div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <button
                                    type="button"
                                    onClick={toggleShowPassword}
                                    style={{backgroundColor: "white", border: "none"}}
                                >
                                    <img
                                        src={
                                            showPassword
                                                ? "https://storage.googleapis.com/rainbow_like/img/PwdShow.png"
                                                : "https://storage.googleapis.com/rainbow_like/img/PwdHind.png"
                                        }
                                        alt={showPassword ? "숨기기" : "보이기"}
                                        style={{Width: "20px", height: "20px"}}
                                    />
                                </button>
                                <p>영어 대문자, 소문자, 숫자, 특수문자 중 3종류 이상 조합하여 8~16자리로 입력해주세요.</p>
                            </div>
                        </div>
                        <hr/>
                        <div className={styles.userPwd}>
                            <div>
                                <span>*</span>
                                <b>비밀번호 확인</b>
                            </div>
                            <div>
                                <input
                                    type={showPasswordConfirm ? "text" : "password"}
                                    value={passwordConfirm}
                                    onChange={handlePasswordConfirmChange}
                                    onBlur={handleBlur}
                                />
                                <button
                                    type="button"
                                    onClick={toggleShowPasswordConfirm}
                                    style={{backgroundColor: "white", border: "none"}}
                                >
                                    <img
                                        src={
                                            showPasswordConfirm
                                                ? "https://storage.googleapis.com/rainbow_like/img/PwdShow.png"
                                                : "https://storage.googleapis.com/rainbow_like/img/PwdHind.png"
                                        }
                                        alt={showPasswordConfirm ? "숨기기" : "보이기"}
                                        style={{Width: "20px", height: "20px"}}
                                    />
                                </button>
                                {passwordError && (
                                    <p style={{color: "red"}}>{passwordError}</p>
                                )}
                                <p>비밀번호 확인을 위해 다시 한번 입력해 주세요.</p>
                            </div>
                        </div>
                        <hr/>
                        <div className={styles.userName}>
                            <div><span>*</span><b>이름</b></div>
                            <div>
                                {memberInfo && memberInfo.name}</div>
                        </div>
                        <hr/>
                        <div className={styles.gender}>
                            <div><span>*</span><b>성별</b></div>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="MALE"
                                        checked={gender === 'MALE'}
                                        onChange={() => setGender('MALE')}
                                    />
                                    남성
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="FEMALE"
                                        checked={gender === 'FEMALE'}
                                        onChange={() => setGender('FEMALE')}
                                    />
                                    여성
                                </label>
                            </div>
                        </div>
                        <hr/>
                        <div className={styles.userBir}>
                            <div><span>*</span><b>생년월일</b></div>
                            <div> {memberInfo && memberInfo.bir}</div>
                        </div>
                        <hr/>
                        <div className={styles.userTel}>
                            <div><span>*</span><b>연락처</b></div>
                            <div> {memberInfo && memberInfo.tel}</div>
                        </div>
                        <hr/>
                        <div className={styles.userEmail}>
                            <div>
                                <span>*</span>
                                <b>이메일 주소</b></div>
                            <div>
                                <input
                                    type="text"
                                    value={memberInfo && memberInfo.email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                        </div>
                        <hr/>
                        <div className={styles.userAddr}>
                            <div><span>*</span><b>주소</b></div>
                            <div>
                                <input type="text" value={memberInfo && memberInfo.addr}/>
                                <input type="text" value="상세주소를 작성해주세요"/></div>
                        </div>
                        <hr/>
                        <div className={styles.sms}>
                            <div>
                                <span>*</span>
                                <b>수신동의여부</b>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={smsConsent}
                                        onChange={handleSmsConsentChange}
                                    />
                                    문자수신
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={emailConsent}
                                        onChange={handleEmailConsentChange}
                                    />
                                    이메일수신
                                </label>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </div>
                <div className={styles.main3}>
                    <h3>선택입력사항</h3>
                    <hr/>
                    <div className={styles.selectedInfo}>
                        <div>
                            <div><b>소속</b></div>
                            <div><input/></div>
                        </div>
                        <hr/>
                        <div>
                            <div><b>관심분야</b></div>
                            <div><select className="interest" aria-label="interest">
                                <option selected>선택</option>
                                <option value="1">여성 취업</option>
                                <option value="2">여성 창업</option>
                                <option value="3">교육 프로그램 참여</option>
                                <option value="4">소모임 등 지원 사업 참여</option>
                                <option value="5">여성 정책 관련 정보 취득</option>
                                <option value="6">기타</option>
                            </select></div>
                        </div>
                        <hr/>
                        <div>
                            <div><b>알게된 경로</b></div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="세종시청 홈페이지"
                                        checked={selectedPathways.includes('세종시청 홈페이지')}
                                        onChange={handleCheckboxChange}
                                    />
                                    세종시청 홈페이지
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="세종시 네이버밴드"
                                        checked={selectedPathways.includes('세종시 네이버밴드')}
                                        onChange={handleCheckboxChange}
                                    />
                                    세종시 네이버밴드
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="SNS"
                                        checked={selectedPathways.includes('SNS')}
                                        onChange={handleCheckboxChange}
                                    />
                                    SNS
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="뉴스레터"
                                        checked={selectedPathways.includes('뉴스레터')}
                                        onChange={handleCheckboxChange}
                                    />
                                    뉴스레터
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="지인소개"
                                        checked={selectedPathways.includes('지인소개')}
                                        onChange={handleCheckboxChange}
                                    />
                                    지인소개
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="기타"
                                        checked={selectedPathways.includes('기타')}
                                        onChange={handleCheckboxChange}
                                    />
                                    기타
                                </label>
                            </div>
                        </div>
                    </div>
                        <hr/>

                </div>
                </div>
                <div className={styles.button}>
                    <div className={styles.cansel}>
                        <Stack className={styles.buttonWrap} spacing={2} direction="row">
                            <Button className={styles.button}
                                    onClick={redirectToURL1}
                                    style={{
                                        width: "120px",
                                        height: "40px",
                                        backgroundColor: "#3d0c69",
                                        color: "rgb(255,255,255)",
                                        borderRadius: '5px',
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                    }}>취소</Button>
                        </Stack>
                    </div>
                    <div className={styles.cansel}>
                        <Stack className={styles.buttonWrap} spacing={2} direction="row">
                            <Button className={styles.button}
                                    onClick={redirectToURL2}
                                    style={{
                                        width: "120px",
                                        height: "40px",
                                        backgroundColor: "#a38ced",
                                        color: "rgb(255,255,255)",
                                        borderRadius: '5px',
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                    }}>입력완료</Button>
                        </Stack>
                    </div>
                </div>

            </div>

    )
        ;
};