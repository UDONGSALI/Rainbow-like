import React, { useState } from 'react';
import styles from '../../../css/component/Search/SearchContainer.module.css';
import magnifier2 from "../../../img/layout/magnifier2.png";

function SearchContainer() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMenu, setSelectedMenu] = useState(null); // 선택된 메뉴 상태

    // 예시 게시물 데이터
    const posts = [
        { id: 1, category: '매물', title: '매물1' },
        { id: 2, category: '뉴스', title: '뉴스1' },
        { id: 3, category: '매물', title: '매물2' },
    ];

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = () => {
        // 검색 로직
    };

    const postStyle = selectedMenu
        ? { backgroundColor: "#f5f5f5", padding: "10px", borderRadius: "5px", marginBottom: "10px" }
        : {};

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button onClick={handleSearchSubmit}>
                        <img src={magnifier2} alt="magnifier" className={styles.magnifier} />
                    </button>
                </div>
                <h5>에 대한 검색결과 건</h5>
            </div>

            {/* 메뉴 부분 */}
            <div className={styles.menu}>
                <button onClick={() => setSelectedMenu('통합 검색')}>통합 검색</button>
                <button onClick={() => setSelectedMenu('메뉴')}>메뉴</button>
                <button onClick={() => setSelectedMenu('콘텐츠')}>콘텐츠</button>
                <button onClick={() => setSelectedMenu('게시물')}>게시물</button>
            </div>

            {/* 게시물 목록 */}
            <div className={styles.searchResults}>
                {posts
                    .filter(post => !selectedMenu || post.category === selectedMenu)
                    .map(post => (
                        <div key={post.id} style={postStyle}>{post.title}</div>
                    ))}
            </div>
        </div>
    );
}

export default SearchContainer;
