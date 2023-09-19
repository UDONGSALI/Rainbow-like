import React, { useEffect, useRef } from 'react';
import '../../../css/layout/Navbar/Navbar.css';
import logo1 from '../../../img/layout/logo1.png';
import magnifier from '../../../img/layout/magnifier.png';


const NavBar = () => {
  useEffect(() => {
    const searchButton = document.querySelector('.search-button');
    const searchBox = document.querySelector('.search-box');

    searchButton.addEventListener('click', () => {
      // 검색 창의 확장 상태를 토글합니다.
      searchBox.classList.toggle('expanded');
    });
  }, []); // 빈 배열을 전달하여 useEffect가 한 번만 실행되도록 설정


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo1} alt="로고"></img>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item" >
              <a className="nav-link" href="#">기관소개</a>
              <div className="sub">
                <div className="sub_tit"></div>
              </div>
            </li>
            <li className="nav-item" >
              <a className="nav-link" href="#">사업안내</a>
              <div className="sub">
                <div className="sub_tit">
                </div>
                <ul className="hidden-menu">
                  <li>
                    <a className="menu_tag">여성 경제적 역량 강화 사업</a>
                    <ul>
                      <li>
                        <a>여성 경제적 역량 강화 교육</a>
                      </li>
                      <li>
                        <a>창원지원 프로그램</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a className="menu_tag">네트워크 활성화 사업</a>
                    <ul>
                      <li>
                        <a>여성정책네트워크</a>
                      </li>
                      <li>
                        <a>성평등 소모임 지원사업</a>
                      </li>
                      <li>
                        <a>여성인재아카데미</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a className="menu_tag">성평등 교육 및 문화소통사업</a>
                    <ul>
                      <li>
                        <a>성인권 배움숲</a>
                      </li>
                      <li>
                        <a>여성정책단</a>
                      </li>
                      <li>
                        <a>여성구술사</a>
                      </li>
                      <li>
                        <a>찾아가는 성평등 교육</a>
                      </li>
                      <li>
                        <a>시민 기획프로그램</a>
                      </li>
                      <li>
                        <a className="menu_tag">홍보사업</a>
                        <ul>
                          <li>
                            <a>여성 소식지 기자단</a>
                          </li>
                          <li>
                            <a>성평등 책마당 '퐁당'</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item" >
              <a className="nav-link" href="#">신청·접수</a>
              <div className="sub">
                <div className="sub_tit">
                </div>
                <ul className="hidden-menu">
                  <li>
                    <a className="menu_tag">교육일정</a>
                  </li>
                  <li>
                    <a className="menu_tag">교육 및 사업신청</a>
                  </li>
                  <li>
                    <a className="menu_tag">교육 및 사업신청 확인</a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item" >
              <a className="nav-link" href="#">공간대관</a>
              <div className="sub">
                <div className="sub_tit">
                </div>
                <ul className="hidden-menu">
                  <li>
                    <a className="menu_tag">절차 및 이용기준</a>
                  </li>
                  <li>
                    <a className="menu_tag">대관현황 및 신청</a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">책마당</a>
              <div className="sub">
                <div className="sub_tit">
                </div>
                <ul className="hidden-menu">
                  <li>
                    <a className="menu_tag">성평등 책마당 '퐁당'</a>
                  </li>
                  <li>
                    <a className="menu_tag">도서 목록 검색</a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item" >
              <a className="nav-link" href="#">직장맘지원센터</a>
              <div className="sub">
                <div className="sub_tit">
                </div>
                <ul className="hidden-menu">
                  <li>
                    <a className="menu_tag">노무상담게시판</a>
                  </li>
                  <li>
                    <a className="menu_tag">온라인상담</a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item" >
              <a className="nav-link" href="#">정보나눔</a>
              <div className="sub">
                <div className="sub_tit">
                </div>
                <ul className="hidden-menu">
                  <li>
                    <a className="menu_tag">공지사항</a>
                  </li>
                  <li>
                    <a className="menu_tag">자주묻는 질문</a>
                  </li>
                  <li>
                    <a className="menu_tag">언론보도</a>
                  </li>
                  <li>
                    <a className="menu_tag">세종시 기관 및 단체 소식</a>
                  </li>
                  <li>
                    <a className="menu_tag">여플소식</a>
                  </li>
                  <li>
                    <a className="menu_tag">뉴스레터</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <button className="search-button">
            <img src={ magnifier } alt="검색" style={{ width: '20px', height: '20px' }} />
          </button>
          <div className="search-box">
            <input type="text" className="search-input" placeholder="검색어를 입력하세요."/>
          </div>

        </div>
      </div>
    </nav>

  );
}

export default NavBar;