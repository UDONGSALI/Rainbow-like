import logo from "../layout/img/header/logo.png";
import facebook from "../layout/img/header/facebook.png";
import instagram from "../layout/img/header/instagram.png";
import naverblog from "../layout/img/header/naverblog.png";
import youtube from "../layout/img/header/youtube.png";
import React from "react";


const Header=()=>{
    return (
        <header id="header" class="active">
            <div class="header_wrap">
                <h1 class="logo">
                    <a href="/"><img src={logo} alt="로고"/></a>
                </h1>
                <nav id="gnb" >
                    <ul>
                        <li><a href="/greeting" class=""><span>기관소개</span></a>
                            <div class="sub">
                                <div class="sub_tit">
                                    <strong>기관소개</strong>
                                    <p><span></span></p>
                                </div>
                                <ul>
                                    <li>
                                        <a href="/greeting" class="depth_menu_tit"><span>인사말</span></a>
                                    </li>
                                    <li>
                                        <a href="/sub0103" class="depth_menu_tit"><span>목적 및 비전</span></a>
                                    </li>
                                    <li>
                                        <a href="/sub0104" class="depth_menu_tit"><span>연혁</span></a>
                                    </li>
                                    <li>
                                        <a href="/sub0105" class="depth_menu_tit"><span>조직도</span></a>
                                    </li>
                                    <li>
                                        <a href="/sub0108" class="depth_menu_tit"><span>CI소개</span></a>
                                    </li>
                                    <li>
                                        <a href="/sub0106" class="depth_menu_tit"><span>공간소개</span></a>
                                    </li>
                                    <li>
                                        <a href="/sub0107" class="depth_menu_tit"><span>오시는 길</span></a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li><a href="/sub0201" class=""><span>사업안내</span></a>
                            <div class="sub">
                                <div class="sub_tit">
                                    <strong>사업안내</strong>
                                    <p><span></span></p>
                                </div>
                                <ul>
                                    <li>
                                        <a href="/sub020101" class="depth_menu_tit"><span>여성 경제적 역량 강화 사업</span></a>
                                        <ul>
                                            <li><a href="/sub020101"><span>여성 경제적 역량 강화 교육</span></a></li>
                                            <li><a href="/sub020102"><span>창업지원 프로그램</span></a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="/sub020201" class="depth_menu_tit"><span>네트워크 활성화 사업</span></a>
                                        <ul>
                                            <li><a href="/sub020201"><span>여성정책네트워크</span></a></li>
                                            <li><a href="/sub020202"><span>성평등 소모임 지원사업</span></a></li>
                                            <li><a href="/sub020203"><span>여성인재아카데미</span></a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="/sub020301" class="depth_menu_tit"><span>성평등 교육 및 문화소통사업</span></a>
                                        <ul>
                                            <li><a href="/sub020301"><span>성인권 배움숲</span></a></li>
                                            <li><a href="/sub020302"><span>여성정책단</span></a></li>
                                            <li><a href="/sub020303"><span>여성구술사</span></a></li>
                                            <li><a href="/sub020304"><span>찾아가는 성평등 교육</span></a></li>
                                            <li><a href="/sub020305"><span>시민 기획프로그램</span></a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="/sub020401" class="depth_menu_tit"><span>홍보사업</span></a>
                                        <ul>
                                            <li><a href="/sub020401"><span>여성 소식지 기자단</span></a></li>
                                            <li><a href="/sub020402"><span>성평등 책마당 '퐁당'</span></a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li><a href="/sub020601" class=""><span>신청 · 접수</span></a>
                            <div class="sub">
                                <div class="sub_tit">
                                    <strong>신청 · 접수</strong>
                                    <p><span></span></p>
                                </div>
                                <ul>
                                    <li>
                                        <a href="/sub020601" class="depth_menu_tit"><span>교육 일정</span></a>
                                    </li>
                                    <li>
                                        <a href="/sub020602" class="depth_menu_tit"><span>교육 및 사업 신청</span></a>
                                    </li>
                                    <li>
                                        <a href="/sub020603" class="depth_menu_tit"><span>교육 및 사업 신청 확인</span></a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li><a href="/sub0301" class=""><span>정보나눔</span></a>
                            <div class="sub">
                                <div class="sub_tit">
                                    <strong>정보나눔</strong>
                                    <p><span></span></p>
                                </div>
                                <ul>
                                    <li>
                                        <a href="/sub0301" class="depth_menu_tit"><span>공지사항</span></a>
                                    </li>
                                    <li>
                                        <a href="/sub0302" class="depth_menu_tit"><span>자주묻는 질문</span></a>
                                    </li>
                                    <li>
                                        <a href="/sub0303" class="depth_menu_tit"><span>언론보도</span></a>
                                    </li>
                                    <li>
                                        <a href="/sub0304" class="depth_menu_tit"><span>세종시 기관 및 단체 소식</span></a>
                                    </li>
                                    <li>
                                        <a href="/sub0405" class="depth_menu_tit"><span>여플소식</span></a>
                                    </li>
                                    <li>
                                        <a href="/sub0406" class="depth_menu_tit"><span>뉴스레터</span></a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li><a href="/sub0401" class=""><span>공간대관</span></a>
                            <div class="sub">
                                <div class="sub_tit">
                                    <strong>공간대관</strong>
                                    <p><span></span></p>
                                </div>
                                <ul>
                                    <li>
                                        <a href="/sub0401" class="depth_menu_tit"><span>절차 및 이용기준</span></a>
                                    </li>
                                    <li>
                                        <a href="/sub0402" class="depth_menu_tit"><span>대관현황 및 신청</span></a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li><a href="/sub0501" class=""><span>책마당</span></a>
                            <div class="sub">
                                <div class="sub_tit">
                                    <strong>책마당</strong>
                                    <p><span></span></p>
                                </div>
                                <ul>
                                    <li>
                                        <a href="/sub0501" class="depth_menu_tit"><span>성평등 책마당 '퐁당'</span></a>
                                    </li>
                                    <li>
                                        <a href="/sub0503" class="depth_menu_tit"><span>도서 목록 검색</span></a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li><a href="/sub1001" class=""><span>직장맘지원센터</span></a>
                            <div class="sub">
                                <div class="sub_tit">
                                    <strong>직장맘지원센터</strong>
                                    <p><span></span></p>
                                </div>
                                <ul>
                                    <li>
                                        <a href="/sub1001" class="depth_menu_tit"><span>노무상담게시판</span></a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </nav>
                <div class="header_btn_wrap">
                    <div class="header_quick_wrap">
                        <div class="header_quick">
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfwvf8_L_l7QdSGrFkDpvtMn1ut974Dk28aTSQqMSlJ5ngCcA/viewform" class="newsletter" target="_blank" rel="noopener noreferrer"><span>Newsletter</span></a>
                            <div class="sns_wrap">
                                <a href="https://blog.naver.com/sjwplaza" class="col_01" target="_blank" rel="noopener noreferrer">
                                    <span class="hide"></span>
                                    <img src={naverblog} alt=""/>
                                </a>
                                <a href="https://www.instagram.com/sjwplaza/" class="col_02" target="_blank" rel="noopener noreferrer">
                                    <span class="hide"></span>
                                    <img src={instagram} alt=""/>
                                </a>
                                <a href="https://www.facebook.com/sjwplaza" class="col_03" target="_blank" rel="noopener noreferrer">
                                    <span class="hide"></span>
                                    <img src={facebook} alt=""/>
                                </a>
                                <a href="https://www.youtube.com/@sjwomenplaza" class="col_04" target="_blank" rel="noopener noreferrer">
                                    <span class="hide"></span>
                                    <img src={youtube} alt=""/>
                                </a>
                            </div>
                        </div>
                        <div class="login_wrap">
                            <a href="/user/authority/logout"><span>로그아웃</span></a>
                            <a href="/src/front/src/mypage/mypage"><span>마이페이지</span></a>
                        </div>
                    </div>
                    <button type="button" class="search" style={{display: 'none'}}>
                        <p>
                            <i class="xi-search open"></i>
                            <i class="xi-close close"></i>
                        </p>
                        <span class="hide">전체검색 열기</span>
                    </button>
                    <div class="search_box" style={{display: 'none'}}>
                        <div class="search_wrap">
                            <form action="https://sj-equity.or.kr/greeting/redirect" method="post" accept-charset="utf-8">
                               <input type="text" title="전체검색" name="integrated_keyword" placeholder="검색어를 입력하세요."/>
                               <button type="submit" className="submit">
                                    <i className="ri-search-line"></i>
                                    <span className="hide">전체검색</span>
                               </button>
                            </form>
                    </div>
                    <button type="button" class="all_menu on">
                        <i class="bar"></i>
                        <i class="bar"></i>
                        <i class="bar"></i>
                        <span class="hide">전체메뉴 닫기</span>
                    </button>
                </div>
            </div>
        </div>
    </header>



    );
}
export default Header;