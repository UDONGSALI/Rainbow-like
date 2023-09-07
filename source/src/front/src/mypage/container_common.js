import share_icon01 from '../layout/img/mypage/share_icon01.png';
import share_icon02 from '../layout/img/mypage/share_icon02.png';


const Container_common=() =>{
    return(
        <main id="container_common">
            <div className="sub_visual vs07">
                <div className="bg"></div>
                <div className="layout">
                    <h2>마이페이지</h2>
                    <ul className="location">
                        <li><a href="/"><span>HOME</span></a></li>

                        <li><a href="https://sj-equity.or.kr/" ><span>마이페이지</span></a></li>
                        <li><a href="javascript:void(0);" className='currently'><span>마이페이지</span></a></li>
                    </ul>
                    <ul className="share">
                        <li><a href="#" className="sns_btn"><span className="hide">공유</span><img src="../layout/img/mypage/share_icon01.png" alt=""/></a>
                            <ul className="sns_wrap">
                                <li><a href="http://blog.naver.com/LinkShare.nhn?url=https://sj-equity.or.kr/mypage&title=마이페이지" target="_blank" rel="noopener noreferrer" className="blog"><span className="hide">블로그</span><img src="/html/images/layout/sns_wrap_icon01.svg" alt=""/></a></li>
                                 <li><a href="http://www.facebook.com/sharer.php?u=https://sj-equity.or.kr/mypage&t=마이페이지" target="_blank" rel="noopener noreferrer" className="instagram"  ><span className="hide">페이스북</span><img src="/html/images/layout/sns_wrap_icon03.svg" alt=""/></a></li>
                            </ul>
                        </li>
                        <li><a href="#" className="print print_btn"><span className="hide">프린트</span><img src="../layout/img/mypage/share_icon02.png" alt=""/></a></li>
                    </ul>
                </div>
                <div class="snb">
                    <div class="layout">
                        <div class="snb_tab">
                            <ul>
                                <li class="on">
                                    <a href="/교육사업신청내역페이지" ><span>교육 신청내역</span></a>
                                </li>
                                <li class="">
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




