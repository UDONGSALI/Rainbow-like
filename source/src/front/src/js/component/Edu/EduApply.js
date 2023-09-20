import React, { useState, useEffect } from 'react';
import {SERVER_URL} from "../Common/constants";

function EduApply(props) {
    const {eduNum, memId} = props

    const [eduData, setEduData] = useState(null);
    const [member, setMember] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: ""
    });


    useEffect(() => {
        fetch(SERVER_URL + `api/edus/` + eduNum)
            .then((response) => response.json())
            .then((data) => {
                setEduData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [eduNum]);

    useEffect(() => {
        if (memId) { // memId가 있을 때만 API 호출
            fetch(SERVER_URL + `members/id/${memId}`)
                .then(response => response.json())
                .then(data => {
                    setMember(data);
                })
                .catch(error => {
                    console.error("Error fetching member:", error);
                });
        }
    }, [memId]); // memId가 변경될 때마다 API 호출을 다시합니다.

    useEffect(() => {
        if (member) {
            setFormData({
                name: member.name || "",
                email: member.email || "",
                tel: member.tel || ""
            });
        }
    }, [member]);

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!eduData || !memId) {
            alert("필요한 정보가 누락되었습니다.");
            return;
        }

        // 신청 상태 결정
        let applyStatus;
        if (eduData.recuMethod === "FIRST_COME") {
            applyStatus = "APPROVE";
        } else if (eduData.recuMethod === "ADMIN_APPROVAL") {
            applyStatus = "WAIT";
        } else {
            alert("알 수 없는 승인 방식입니다.");
            return;
        }

        // 정보를 서버로 전송
        const requestData = {
            eduNum: parseInt(eduNum),
            memNum: member.memNum,
            applyDate: new Date().toISOString(),  // 현재 날짜와 시간
            status: applyStatus
        };

        fetch(SERVER_URL + "eduHist", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        })
            .then(response => response.json())
            .then(data => {
                alert("신청이 완료되었습니다.");
                // 필요한 후속 조치를 여기서 수행합니다.
            })
            .catch(error => {
                console.error("Error:", error);
                alert("신청 중 오류가 발생했습니다.");
            });
    }

    return (
        <div className="edu-apply-container">
            {eduData ? (
                <div>
                    <h2>{eduData.eduname} 신청하기</h2>
                    <p><strong>교육 일시:</strong> {eduData.eduStdt} ~ {eduData.eduEddt}</p>
                    <p><strong>장소:</strong> {eduData.eduAddr}</p>
                    <p><strong>대상:</strong> {eduData.target}</p>
                    <p><strong>신청 기간:</strong> {eduData.recuStdt} ~ {eduData.recuEddt}</p>
                    <hr/>
                    <h3>신청 정보 입력</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>
                                이름:
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                이메일:
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                전화번호:
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.tel}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                        <button type="submit">신청하기</button>
                    </form>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default EduApply;
