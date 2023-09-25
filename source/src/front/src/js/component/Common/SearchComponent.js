import React from 'react';
import styles from '../../../css/component/Common/SearchComponent.module.css';

// 상수 정의
const SEARCH_PLACEHOLDER = "검색어를 입력 하세요";

function SearchComponent({
                             searchTerm,
                             setSearchTerm,
                             totalCount,
                             currentPage,
                             totalPages,
                             onSearch,
                             searchOptions
                         }) {
    // 검색어 변경
    const handleSearchTermChange = (e) => {
        const inputTerm = e.target.value;
        // 검색어 상태만 업데이트하고 실제 검색은 수행하지 않습니다.
        setSearchTerm({ ...searchTerm, term: inputTerm });
    };

    const handleSearchOptionChange = (e) => {
        // 검색 옵션 상태만 업데이트하고 실제 검색은 수행하지 않습니다.
        setSearchTerm({ ...searchTerm, value: e.target.value });
    };

    const handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <span>전체 {totalCount}건</span>
                <span> | </span>
                <span>현재 페이지 {currentPage}/{totalPages} </span>
            </div>
            <div className={styles.right}>
                <select value={searchTerm.value} onChange={handleSearchOptionChange}>
                    {searchOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder={SEARCH_PLACEHOLDER}
                    value={searchTerm.term}
                    onChange={handleSearchTermChange}
                    onKeyDown={handleEnterKey}
                />
                <button onClick={onSearch}>검색</button>
            </div>
        </div>
    );
}

export default SearchComponent;
