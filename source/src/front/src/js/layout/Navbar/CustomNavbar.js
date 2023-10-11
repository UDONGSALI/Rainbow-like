import React, { useState } from 'react';
import styles from './CustomNavbar.module.css';


function CustomNavbar() {
    const [searchMode, setSearchMode] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);

    return (
        <div className={styles.navbar}>
            {searchMode ? (
                <SearchBar setSearchMode={setSearchMode} />
            ) : (
                <>
                    <Menu title="기관소개" setActiveMenu={setActiveMenu} menuName="menu1" />
                    <Menu title="신청 · 접수" setActiveMenu={setActiveMenu} menuName="menu2" />
                    {/* ... */}
                    <button onClick={() => setSearchMode(true)}>🔍</button>
                </>
            )}
            <ItemArea activeMenu={activeMenu} />
        </div>
    );
}

function SearchBar({ setSearchMode }) {
    return (
        <div className={styles.searchBar}>
            <input placeholder="검색어를 입력하세요." />
            <button onClick={() => setSearchMode(false)}>X</button>
        </div>
    );
}

function Menu({ title, setActiveMenu, menuName }) {
    return (
        <div
            className={styles.menuItem}
            onMouseEnter={() => setActiveMenu(menuName)}
            onMouseLeave={() => setActiveMenu(null)}>
            {title}
        </div>
    );
}
function ItemArea({ activeMenu }) {
    if (!activeMenu) return null;

    let items = [
        { title: "교육 일정", subItems: [] },
        { title: "교육 및 사업 신청", subItems: ["서브아이템1", "서브아이템2"] },
        // ...
    ];

    return (
        <div className={styles.itemArea}>
            {items.map(item => (
                <Item key={item.title} title={item.title} subItems={item.subItems} isActive={item.title === activeMenu} />
            ))}
        </div>
    );
}

function Item({ title, subItems, isActive }) {
    return (
        <div className={styles.item}>
            {title}
            {isActive && subItems.map(subItem => (
                <SubItem key={subItem} title={subItem} />
            ))}
        </div>
    );
}

function SubItem({ title }) {
    return <div className={styles.subItem}>{title}</div>;
}


export default CustomNavbar;
