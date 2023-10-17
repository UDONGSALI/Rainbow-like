import styled from '../../../css/component/Intro/AgenHistory.module.css'
import History_logo from '../../../img/component/Intro/history_logo.png'

function AgenHistory() {

    return (
        <div>
            <section id={styled.contentWrap}>
                <div className={styled.topLayout}>
                    <header id={styled.topSubTit}>
                        <h3>연혁</h3>
                    </header>
                    <div className={styled.history}>
                        <strong className={styled.logoHis}>
                            <img src={History_logo} alt="세종여성플라자" />
                        </strong>
                        <div className={styled.historyInner}>
                            <div className={styled.historyItem}>
                                <strong className={styled.yearA}>2022</strong>
                                <ul className={styled.desc}>
                                    <li><span>03</span>세종여성플라자 개소식 개최</li>
                                </ul>
                            </div>
                            <div className={styled.historyItemB}>
                            <strong className={styled.yearB}>2021</strong>
                                <ul className={styled.desc}>
                                    <li><span>12</span>「세종특별자치시 여성플라자 운영에 관한 조례」 제정</li>
                                    <li><span>12</span>재단법인 세종특별자치시 사회서비스원과 대행협약 체결</li>
                                    <li><span>12</span>새롬종합복지센터 4층 리모델링 공사 완료</li>
                                </ul>
                            </div>
                            <div className={styled.historyItem}>
                                <strong className={styled.yearA}>2020</strong>
                                <ul className={styled.desc}>
                                    <li><span>09</span>세종여성플라자 추진준비단 구성 및 운영</li>
                                </ul>
                            </div>
                            <div className={styled.historyItemB}>
                                <strong className={styled.yearB}>2019</strong>
                                <ul className={styled.desc}>
                                    <li><span>10</span>새롬종합복지센터 4층으로 세종여성플라자 입지 선정</li>
                                </ul>
                            </div>
                            <div className={styled.historyItem}>
                                <strong className={styled.yearA}>2018</strong>
                                <ul className={styled.desc}>
                                    <li><span>12</span>「세종시 여성플라자 설립 타당성 조사 및 운영방안 연구용역」</li>
                                </ul>
                            </div>
                            <div className={styled.historyItemB}>
                                <strong className={styled.yearB}>2017</strong>
                                <ul className={styled.desc}>
                                    <li><span>06</span> 여성친화도시 조성을 위한 과제로 세종여성플라자 설립 계획수립</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AgenHistory;