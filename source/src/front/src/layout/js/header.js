

import logo from "../img/logo.png";
import facebook from "../img/facebook.png";
import instagram from "../img/instagram.png";
import naverblog from "../img/naverblog.png";
import youtube from "../img/youtube.png";
import './Header.css';
import React from "react";

const Header=()=>{
    return (
        <header id = "header" class={"active"}>
          <div class="header_wrap">
            <h1 class="logo">
                <img class="logo" src={logo} alt="로고"/>
            </h1>
          </div>
          <nav id={"gnb"}>
              <ul>
                  <li>
                      <a href ="/greeting">
                          <span>기관소개</span>
                      </a>
                  </li>
                  <li>
                      <a href ="/">
                          <span>사업안내</span>
                      </a>
                  </li>
                  <li>
                      <a href ="/">
                          <span>신청·접수</span>
                      </a>
                  </li>
                  <li>
                      <a href ="/">
                          <span>정보나눔</span>
                      </a>
                  </li>
                  <li>
                      <a href ="/greeting">
                          <span>공간대관</span>
                      </a>
                  </li>
                  <li>
                      <a href ="/greeting">
                          <span>책마당</span>
                      </a>
                  </li>
                  <li>
                      <a href ="/greeting">
                          <span>직장맘지원센터</span>
                      </a>
                  </li>
              </ul>
          </nav>
          <div class="header_btn_wrap">
              <div class={"header_quick_wrap"}>
                  <div class={"header_quick"}>
                      <a href="https://docs.google.com/forms/d/e/1FAIpQLSfwvf8_L_l7QdSGrFkDpvtMn1ut974Dk28aTSQqMSlJ5ngCcA/viewform" className="newsletter" target="_blank" rel="noopener noreferrer">
                          <span>Newsletter</span>
                      </a>
                      <div className="sns_wrap">
                          <a href="https://blog.naver.com/sjwplaza" className="col_01" target="_blank" rel="noopener noreferrer">
                              <span className="hide">블로그</span>
                              <img src={naverblog} alt=""/>
                          </a>
                          <a href="https://www.instagram.com/sjwplaza/" className="col_02" target="_blank" rel="noopener noreferrer">
                              <span className="hide">인스타</span>
                              <img src={instagram} alt=""/>
                          </a>
                          <a href="https://www.facebook.com/sjwplaza" className="col_03" target="_blank" rel="noopener noreferrer">
                              <span className="hide">페이스북</span>
                              <img src={facebook} alt=""/>
                          </a>
                          <a href="https://www.youtube.com/@sjwomenplaza" class="col_04" target="_blank" rel="noopener noreferrer">
                              <span class="hide">유튜브</span>
                              <img src={youtube} alt=""/>
                          </a>
                      </div>
                  </div>
                  <div class={"login_wrap"}>

                  </div>
              </div>
              <button type="button" className="search">
                  <span class="hide">전체검색 열기</span>
              </button>
              <div className="search_box">
                  <div className="search_wrap">
                      <form action="https://sj-equity.or.kr/greeting/redirect" method="post" accept-charset="utf-8">

                      </form>
              </div>
              <button type="button" className="all_menu">
                  <i className="bar"></i>
                  <i className="bar"></i>
                  <i className="bar"></i>
                  <span class="hide">열기</span>
              </button>
              </div>
          </div>
        </header>
    )
}
export default Header;