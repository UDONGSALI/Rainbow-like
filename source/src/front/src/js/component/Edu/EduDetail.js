import React, {useEffect, useMemo, useState} from "react";
import "../../../css/component/Edu/EduDetail.css";
import {SERVER_URL} from "../Common/constants";

function EduDetail(props) {
    const {eduNum} = props;
    const [eduData, setEduData] = useState(null);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetch(SERVER_URL + `files`)
            .then((response) => response.json())
            .then((data) => {
                setFiles(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    console.log(files);

    const filteredFiles = useMemo(
        () => files.filter(file => file.edu && file.edu.eduNum == eduNum),
        [files, eduNum]
    );
    console.log(filteredFiles);


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

    function formatDateAndTime(inputDate) {
        const dateObj = new Date(inputDate);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');

        return {
            date: `${year}-${month}-${day}`,
            time: `${hours}:${minutes}`
        };
    }

    function renderDateRange(startDate, endDate) {
        const start = formatDateAndTime(startDate);
        const end = formatDateAndTime(endDate);

        // 시작 날짜와 종료 날짜가 동일한 경우, 날짜는 한 번만 표시하고 시간 범위만 표시합니다.
        if (start.date === end.date) {
            return `${start.date} ${start.time} ~ ${end.time}`;
        } else {
            return `${start.date} ${start.time} ~ ${end.date} ${end.time}`;
        }
    }

    return (
        <div className="container">
            {eduData ? (
                <div>
                    <div className="header-content">
                        <div className="left-top">
                            {filteredFiles[0] && <img src={filteredFiles[0].fileUri} alt="First Image"/>}
                        </div>
                        <div className="right-top">
                            <h1 className="header">{eduData.eduname}</h1>
                            <p className="detail"><strong>교육
                                일시:</strong> {renderDateRange(eduData.eduStdt, eduData.eduEddt)}</p>
                            <p className="detail"><strong>장소:</strong> {eduData.eduAddr}</p>
                            <p className="detail"><strong>대상:</strong> {eduData.target}</p>
                            <p className="detail"><strong>신청 기간:</strong> {eduData.recuStdt} ~ {eduData.recuEddt}</p>
                            <p className="detail"><strong>신청 방법:</strong> {eduData.recuMethod}</p>
                            <p className="detail"><strong>문의 전화번호:</strong> {eduData.tel}</p>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <hr/>
                    <br/>
                    <div className="main-content">
                        {filteredFiles[1] && <img src={filteredFiles[1].fileUri} alt="Second Image"/>}
                        <br/>
                        <p className="detail-content">{eduData.content}</p>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default EduDetail;
