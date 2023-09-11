import share_icon01 from '../layout/img/mypage/share_icon01.png';
import share_icon02 from '../layout/img/mypage/share_icon02.png';
import mypage_bg from "../layout/img/mypage/mypage_bg.png";
import '../layout/css/container_common.css';
import '../layout/css/common.css';


const Container_common=() =>{
    return(
        <main id ="container_common">
            <div className="sub_visual">
                <div className="bg"><img src={mypage_bg} alt="로고"/></div>
                <div className="layout">
                    <h2 className="title">마이페이지</h2>
                    <ul className="location">
                        <li><a href="https://sj-equity.or.kr/"><span>HOME</span></a></li>
                        <li><a href="/" ><span>마이페이지</span></a></li>
                        <li><a href="javascript:void(0);" className='currently'><span>교육 신청내역</span></a></li>
                    </ul>
                    <ul className="share">
                        <li><a href="#" className="sns_btn"><span className="hide">공유</span><img src={share_icon01} alt=""/></a>
                            <ul className="sns_wrap">
                                {/*<li><a href="http://blog.naver.com/LinkShare.nhn?url=https://sj-equity.or.kr/mypage&title=마이페이지" target="_blank" rel="noopener noreferrer" className="blog"><span className="hide">블로그</span><img src={sns_wrap_icon_02} alt=""/></a></li>*/}
                                {/* <li><a href="http://www.facebook.com/sharer.php?u=https://sj-equity.or.kr/mypage&t=마이페이지" target="_blank" rel="noopener noreferrer" className="instagram"  ><span className="hide">페이스북</span><img src={sns_wrap_icon_03} alt=""/></a></li>*/}
                            </ul>
                        </li>
                        <li><a href="#" className="print print_btn"><span className="hide">프린트</span><img src={share_icon02} alt=""/></a></li>
                    </ul>
                </div>
                <div className="snb">
                    <div className="layout">
                        <div className="snb_tab">

                            <ul>
                                <li className="on">
                                    <a href="/교육사업신청내역페이지" ><span>교육 신청내역</span></a>
                                </li>
                                <li className="">
                                    <a href="/공간대관신청내역페이지" ><span>공간대관 신청내역</span></a>
                                </li>
                                <li className="">
                                    <a href="/활동내역페이지" ><span>활동 내역</span></a>
                                </li>
                                <li className="">
                                    <a href="/인재풀신청내역페이지" ><span>인재풀 신청내역</span></a>
                                </li>
                                <li className="">
                                    <a href="/소모임신청내역페이지" ><span>소모임 신청내역</span></a>
                                </li>
                                <li className="">
                                    <a href="/상담내역페이지" ><span>상담 내역</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );

}

export default Container_common;




