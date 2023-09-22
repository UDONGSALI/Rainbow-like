import * as React from "react";
import styles from  '../../../css/component/Rent/RentStatus.module.css';




export default function RentStatus() {


    return(
        <div id={styles.title}>
            <h2>대관 현황</h2>
            <div className={styles.rentStatus}>
                <div className={styles.spaceName}>
                    <ul>
                        <li className={styles.room1}>● 폴짝</li>
                        <li className={styles.room2}>● 반짝</li>
                        <li className={styles.room3}>● 활짝</li>
                        <li className={styles.room4}>● 꼼지락</li>
                        <li className={styles.room5}>● 어슬렁</li>
                        <li className={styles.room6}>● 혜윰</li>
                        <li className={styles.room7}>● 라온</li>
                        <li className={styles.room8}>● 하람</li>
                    </ul>
                </div>
                <div className={styles.rentNotice}>
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
