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
        setSearchTerm({...searchTerm, term: inputTerm});
    };

    const handleSearchOptionChange = (e) => {
        // 검색 옵션 상태만 업데이트하고 실제 검색은 수행하지 않습니다.
        setSearchTerm({...searchTerm, value: e.target.value});
    };

    const handleStatusSelectChange = (e) => {
        const selectedStatus = e.target.value;
        // 선택된 상태를 업데이트합니다.
        setSearchTerm({...searchTerm, term: selectedStatus});
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

                {searchTerm.value === 'type' ? (
                    <select value={searchTerm.term} onChange={handleSearchTermChange}>
                        <option value="EDU">교육</option>
                        <option value="BUSINESS">사업</option>
                    </select>
                ) : searchTerm.value === 'recuMethod' ? (
                    <select value={searchTerm.term} onChange={handleSearchTermChange}>
                        <option value="ADMIN_APPROVAL">관리자 승인</option>
                        <option value="FIRST_COME">선착순 모집</option>
                    </select>
                ) : searchTerm.value === 'status' ? (
                    <select value={searchTerm.term} onChange={handleStatusSelectChange}>
                        <option value="WAIT">미승인</option>
                        <option value="APPROVE">승인</option>
                        <option value="COMPLETE">완료</option>
                    </select>
                ) : (
                    <input
                        type="text"
                        placeholder={SEARCH_PLACEHOLDER}
                        value={searchTerm.term}
                        onChange={handleSearchTermChange}
                        onKeyDown={handleEnterKey}
                    />
                )}


            <button onClick={onSearch}>검색</button>
        </div>
</div>
)
    ;
}

export default SearchComponent;
