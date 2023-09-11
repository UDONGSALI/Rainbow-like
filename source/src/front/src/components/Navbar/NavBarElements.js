import React from 'react'
import './Navbar.css';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';


const NavBarElements = () => {
  return (

<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">
      <img src='img/logo.png'></img>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="#">기관소개</a>
          <div class="sub">
            <div class="sub_tit"></div>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">사업안내</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">신청·접수</a>
          <div class="sub">
            <div class="sub_tit"></div>
            <ul id="hid_menu">
              <li>
                <a>교육일정</a>
              </li>
              <li>
                <a>교육 및 사업신청</a>
              </li>
              <li>
                <a>교육 및 사업신청 확인</a>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">공간대관</a>
          
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">책마당</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">직장맘지원센터</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">정보나눔</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

)
  
}


export default NavBarElements;