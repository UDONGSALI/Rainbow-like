import React from 'react';
import { useParams } from 'react-router-dom';
import FTWList from "../FTW/FTWList";

function MatchingPopup() {
    const { speField, ftcNum } = useParams();

    const onClosePopup = () => {
        window.close(); // 팝업 창 닫기
    };

    return (
        <div>
            {/* speField와 ftConsumerNum 값을 사용하여 원하는 작업을 수행 */}
            <h2>매칭하기</h2>
            <p>분야: {speField}</p>
            <p>ftConsumerNum: {ftcNum}</p>
            <FTWList ftcNum={ftcNum} />
            <button onClick={onClosePopup}>닫기</button>
        </div>
    );
}

export default MatchingPopup;
