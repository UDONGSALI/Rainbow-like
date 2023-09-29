import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";  // <-- 추가
import { SERVER_URL } from "../Common/constants";

function useSearch(memId, setEduApply) {
    const [searchTerm, setSearchTerm] = useState({ term: '', value: 'eduName' });

    const navigate = useNavigate();  // <-- 추가
    const location = useLocation();  // <-- 추가

    const handleSearch = () => {
        const apiUrl = `${SERVER_URL}eduHist/search/${searchTerm.value}/${searchTerm.term}/${memId}`;

        return fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const formattedData = data.map((item, index) => ({ id: index + 1, ...item }));
                setEduApply(formattedData);

                // 여기에 추가
                navigate(`${location.pathname}?page=1`);

                return formattedData;
            })
            .catch(error => {
                console.error("Error fetching search results:", error);
                throw error;
            });
    };

    return {
        searchTerm,
        setSearchTerm,
        handleSearch
    };
}

export default useSearch;
