import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../css/layout/Navbar/CustomNavbar.module.css';
import logo1 from "../../../img/layout/logo1.png";
import sns_01 from "../../../img/layout/sns_01.png";
import sns_02 from "../../../img/layout/sns_02.png";
import sns_03 from "../../../img/layout/sns_03.png";
import sns_04 from "../../../img/layout/sns_04.png";
import magnifier from "../../../img/layout/magnifier.png";
import {useToken} from "../../component/hook/useToken";


const menuData = [
    {
        title: "기관 소개",
        items: ["인사말", "목적 및 비전", "연혁","조직도","CI소개","공간소개","오시는 길"]
    },
    {
        title: "신청 · 접수",
        items: [{name:"교육 일정", url:"/edu/calendar"}, {name:"교육 신청", url:"/edu/list"}, {name:"교육 신청 내역", url:"/edu/applylist"}]
    },
    {
        title: "공간 대관",
        items: [{name:"절차 및 이용기준", url:"/rent/process"}, {name:"대관 현황 및 신청", url:"/rent/status"},{name:"대관 이용 후기", url:"/rent/review"}]
    },
    {
        title: "여성인재풀",
        items: [{name:"여성인재풀", url:"/ftmain"}, {name:"여성인재풀 등록 신청", url:"/ftw/new"}, {name:"여성인재풀 매칭 신청", url:"/ftc/new"}]
    },
    {
        title: "소모임",
        items: [{name:"소모임", url:"/clubs"},{name:"소모임 신청", url:"/clubs/new"}]
    },
    {
        title: "직장맘 지원센터",
        items: [{name:"노무상담 게시판", url:"/csl/7"},]
    },
    {
        title: "정보 나눔",
        items: ["공지사항", "자주 뭍는 질문", "언론 보도", "세종시 기관 및 단체 소식", "여플소식", "뉴스레터"]
    },
];

function CustomNavbar({memId, isAdmin}) {
    const [searchMode, setSearchMode] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);

    const { decodeToken: decodeAndSetToken, deleteTokenFromServer, getToken } = useToken();
    const logout = () => {
        const jti = sessionStorage.getItem('jti'); // 세션 스토리지에서 jti를 가져옴
        if (jti) {
            deleteTokenFromServer(jti);
        }
        sessionStorage.clear();
        window.location.reload();
    };

    return (
        <div
            className={`${styles.navbar} ${activeMenu ? styles.activeMenuBackground : ""}`}
            onMouseLeave={() => {
                setActiveMenu(null);
            }}
        >
            <Link to="/">
                <img src={logo1} alt="로고1" className={styles.logo} />
            </Link>
                <>
                <div className={styles.menuContainer}>
                    {menuData.map(menu => (
                        <div key={menu.title}>
                            <Menu
                                menu={menu}
                                setActiveMenu={setActiveMenu}
                                activeMenu={activeMenu}
                            />
                            {activeMenu === menu.title && (
                                <ItemArea
                                    activeMenu={activeMenu}
                                    setActiveMenu={setActiveMenu}
                                />
                            )}
                        </div>
                    ))}
                </div>
                    <div className={styles.buttonContainer}>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfwvf8_L_l7QdSGrFkDpvtMn1ut974Dk28aTSQqMSlJ5ngCcA/viewform" target="_blank" rel="noopener noreferrer">
                            <button style={{border:'2px solid#c9c9c9', borderRadius:'15px', padding: '2px 15px', fontSize:'14px'}}>Newsletter</button>
                        </a>
                        <div className={styles.snsContainer}>
                        <a href="https://blog.naver.com/sjwplaza" target="_blank" rel="noopener noreferrer">
                            <button><img src={sns_01} alt="sns_01" className={styles.sns} /></button>
                        </a>
                        <a href="https://www.instagram.com/sjwplaza/" target="_blank" rel="noopener noreferrer">
                            <button><img src={sns_02} alt="sns_02" className={styles.sns} /></button>
                        </a>
                        <a href="https://www.facebook.com/sjwplaza" target="_blank" rel="noopener noreferrer">
                            <button><img src={sns_03} alt="sns_03" className={styles.sns} /></button>
                        </a>
                        <a href="https://www.youtube.com/@sjwomenplaza" target="_blank" rel="noopener noreferrer">
                            <button><img src={sns_04} alt="sns_04" className={styles.sns} /></button>
                        </a>
                        </div>
                        {memId ? (
                            <>
                                <button onClick={logout} style={{marginLeft:'30px' , fontWeight:"bold"}}>로그아웃</button>
                                {isAdmin ? (
                                    <Link to="/admin/member">
                                        <button style={{marginLeft:'30px', fontWeight:"bold"}}>관리자 페이지</button>
                                    </Link>
                                ) : (
                                    <Link to="/mypage/edu">
                                        <button style={{marginLeft:'30px', fontWeight:"bold"    }}>마이 페이지</button>
                                    </Link>
                                )}
                            </>
                        ) : (
                            <Link to="/login">
                                <button style={{marginLeft:'30px' , fontWeight:"bold"}}>로그인</button>
                            </Link>
                        )}
                        <Link to="/search">
                            <button style={{marginLeft:'20px'}}><img src={magnifier}  alt="magnifier"  className={styles.magnifier} /></button>
                        </Link>
                    </div>
                </>
        </div>
    );
}

function Menu({ menu, setActiveMenu, activeMenu }) {
    return (
        <div
            className={styles.menu}
            onMouseEnter={() => {
                setActiveMenu(menu.title);
            }}
        >
            {menu.title}
        </div>
    );
}
function ItemArea({ activeMenu, setActiveMenu }) {
    if (!activeMenu) return null;

    const activeMenuData = menuData.find(menu => menu.title === activeMenu);

        return (
            <div className={styles.itemArea}>
                <div className={styles.titleArea}>
                    <span className={styles.titleText}>{activeMenu}</span>  {/* 이 부분 수정 */}
                </div>
                <div className={styles.itemContent}>
                    {activeMenuData && activeMenuData.items.map(item => (
                        <Item key={item.name} item={item} />
                    ))}
                </div>
            </div>
        );
}
function Item({ item }) {
    return (
        <Link to={item.url} className={styles.item}>
            {item.name}
        </Link>
    );
}

export default CustomNavbar;