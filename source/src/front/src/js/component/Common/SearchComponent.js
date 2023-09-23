import React from 'react';
import styles from '../../../css/component/Common/SearchComponent.module.css';
function SearchComponent({
                             searchTerm,
                             setSearchTerm,
                             searchOptions,
                             setSelectedSearchOption,
                             totalCount,
                             currentPage,
                             totalPages
                         }) {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <span>전체 {totalCount}건</span>
                <span> | </span>
                <span>현재 페이지 {currentPage}/{totalPages} </span>
            </div>
            <div className={styles.right}>
                <select onChange={(e) => setSelectedSearchOption(e.target.value)}>
                    {searchOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={() => {
                    // 검색 로직을 여기에 추가합니다.
                }}>검색</button>
            </div>
        </div>
    );
}

export default SearchComponent;