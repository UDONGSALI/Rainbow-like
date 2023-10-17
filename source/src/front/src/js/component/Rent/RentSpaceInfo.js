import React, { useEffect, useState } from 'react';
import {useHistory, useLocation, useNavigate} from 'react-router-dom';
import {SERVER_URL} from "../Common/constants";


const RentSpaceInfo = () => {
    const [spaces, setSpaces] = useState([]);
    const navigate = useNavigate();
    // const spaceNum = sessionStorage.getItem("spaceNum");


    useEffect(() => {
        let spaceNum;
        fetch(SERVER_URL + `/spaces/${spaceNum}`)
            .then(response => response.json())
            .then(data => {
                setSpaces(data);

            })
            .catch(error => {
                alert('대관 장소 정보를 찾을 수 없습니다!');
                // window.location.href = '/rent/status';
            });
    }, []);

    return (
        <div id="title">
                <div className="memApplyInfo">
                    <h3>대관 신청정보</h3>
                    <hr />
                    <ul>
                        <li>
                            <p>*</p>
                            <b>장소명</b> <input value={spaces.spaceName} />
                        </li>
                        <hr />
                        <li>
                            <p>*</p>
                            <b>사용날짜</b> <input value={spaces.tel} />
                        </li>
                        <hr />
                        <li>
                            <p>*</p>
                            <b>사용시간</b> <input value={spaces.email} />
                        </li>
                        <hr />
                        <li>
                            <p>*</p>
                            <b>대관료</b>
                            <input />
                        </li>
                        <hr />
                        <li>
                            <p>*</p>
                            <b>사용인원</b>
                            <input value={spaces.name} />
                        </li>
                        <hr />
                        <li>
                            <p>*</p>
                            <b>사용목적</b>
                            <input/>
                        </li>
                        <hr />
                    </ul>
                </div>
        </div>
    );
}

export default RentSpaceInfo;