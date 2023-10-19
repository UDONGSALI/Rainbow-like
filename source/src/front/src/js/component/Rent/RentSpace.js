import styles from '../../../css/component/Rent/RentSpace.module.css';
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from "../Common/constants";
import LoginMember from "./RentApply/LoginMember";
import RentAgreeForm from "./RentApply/RentAgreeForm";

function RentSpace({selectedInfo}) {
    const [spaces, setSpaces] = useState([]);
    const [files, setFiles] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState(1); // 사용자 수를 선택하기 위한 상태
    const navigate = useNavigate();


    useEffect(() => {
        fetch(SERVER_URL + `files`)
            .then(response => response.json())
            .then(data => {
                setFiles(data);
                console.log("files data:",data);
                
            })
            .catch(error => {
                alert('대관 장소 사진을 찾을 수 없습니다!');
            });
    }, [selectedInfo.spaceName]);


    return (
        <div id={styles.title}>

           {/*대관장소정보*/}
            <div className={styles.rentSpace}>
                <div>
                    <div>그림</div>
                    <div>
                        <h1>{selectedInfo.spaceName}</h1>
                        <div><b>공간용도ㅣ</b>{selectedInfo.selectedSpace.spaceUsage}</div>
                        <div><b>최대인원ㅣ</b>{selectedInfo.selectedSpace.maxPerson}명</div>
                        <div><b>이용료ㅣ</b>{selectedInfo.selectedSpace.rentFee}</div>
                    </div>
                </div>
            </div>
            <div className="RentApplyInfo">

                {/*이용약관동의*/}
                <RentAgreeForm/>

                {/*대관신청정보*/}
                <h3>대관 신청정보</h3>
                <hr/>
                <div>
                    <div>
                        <p>*</p>
                        <b>장소명</b> <input value={selectedInfo.spaceName}/>
                    </div>
                    <hr/>
                    <div>
                        <p>*</p>
                        <b>사용날짜</b> <input value={selectedInfo.selectedDate}/>
                    </div>
                    <hr/>
                    <div>
                        <p>*</p>
                        <b>사용시간</b> <input value={selectedInfo.rentTime}/>
                    </div>
                    <hr/>
                    <div>
                        <p>*</p>
                        <b>대관료</b>
                        <input value={selectedInfo.selectedSpace.rentFee}/>
                    </div>
                    <hr/>
                    <div>
                        <p>*</p>
                        <b>사용인원</b>
                        <input value={spaces.name}/>
                    </div>
                    <hr/>
                    <div>
                        <p>*</p>
                        <b>사용목적</b>
                        <input/>
                    </div>
                    <hr/>
                </div>
            </div>

            {/*대관신청자정보*/}
            <LoginMember/>
            <button
                style={{
                width: "150px",
                height: "50px",
                backgroundColor: "#a38ced",
                color: "rgb(255,255,255)",
                border: "1px solid #ffffff",
                borderRadius: '5px',
                fontSize: "20px",
                fontWeight: "bold",
            }}>대관신청</button>


        </div>
    );
}

export default RentSpace;