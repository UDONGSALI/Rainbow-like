import React, { useState, useEffect } from 'react';
import {SERVER_URL} from "../Common/constants";
import "../../../css/component/Edu/EduApply.css"


function EduApply(props) {
    const {eduNum, memId} = props;

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
        // 데이터 전송 및 로직 처리
        // ... (위에서 설명한 로직을 그대로 사용하세요.)
    }

    return (
        <div className="container">
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
