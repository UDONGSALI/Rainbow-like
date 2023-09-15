import React, { useEffect, useState, useMemo } from "react";
import "../../css/component/EduDetail.css";
import { SERVER_URL } from "../../constants";
import { useParams } from "react-router-dom";

function EduDetail({ onBackClick }) {
    const [eduData, setEduData] = useState(null);
    const [files, setFiles] = useState([]);
    const { eduNum } = useParams();

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

    const filteredFiles = useMemo(
        () => files.filter(file => file.edu && file.edu.eduNum == eduNum.slice(-1)),
        [files, eduNum]
    );

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

    return (
        <div className="container">
            {eduData ? (
                <div>
                    <div className="header-content">
                        <div className="left-top">
                            {filteredFiles[0] && <img src={filteredFiles[0].fileUri} alt="First Image" />}
                        </div>
                        <div className="right-top">
                            <h1 className="header">{eduData.eduname}</h1>
                            <p className="detail"><strong>일시:</strong> {eduData.eduStdt} ~ {eduData.eduEddt}</p>
                            <p className="detail"><strong>장소:</strong> {eduData.eduAddr}</p>
                            <p className="detail"><strong>대상:</strong> {eduData.target}</p>
                            <p className="detail"><strong>신청 기간:</strong> {eduData.recuStdt} ~ {eduData.recuEddt}</p>
                            <p className="detail"><strong>신청 방법:</strong> {eduData.recuMethod}</p>
                            <p className="detail"><strong>문의 전화번호:</strong> {eduData.tel}</p>
                        </div>
                    </div>
                    <h3>상세정보</h3>
                    <hr />
                    <div className="main-content">
                        {filteredFiles[1] && <img src={filteredFiles[1].fileUri} alt="Second Image" />}
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