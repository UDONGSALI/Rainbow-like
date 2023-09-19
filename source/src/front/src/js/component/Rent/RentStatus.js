import * as React from "react";
import '../../../css/component/Rent/RentStatus.css';




export default function RentStatus() {


    return(
        <div id="title">
            <h2>대관 현황</h2>
            <div className="rentStatus">
                <div className="spaceName">
                    <ul>
                        <li className="room1">● 폴짝</li>
                        <li className="room2">● 반짝</li>
                        <li className="room3">● 활짝</li>
                        <li className="room4">● 꼼지락</li>
                        <li className="room5">● 어슬렁</li>
                        <li className="room6">● 혜윰</li>
                        <li className="room7">● 라온</li>
                        <li className="room8">● 하람</li>
                    </ul>
                </div>
                <div className="rentNotice">
                    <ul>
                        <li>○ <b>대관 시간 안내 : </b> 대관은 <span>최소 1시간</span>부터 예약 가능합니다.</li>
                        <li>○ <b>예약 신청 가능일 : </b><span></span>(대관일 1개월 전부터 최소 3일 전)</li>
                        <li>○ <b>장기 대관 예약 : </b> 5일 이상 장기 대관을 원하시는 분은 044-863-0380로 문의 부탁드립니다.</li>
                    </ul>
                </div>

            </div>

        </div>

    )

}
