import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
function useSearch(apiBaseUrl, setData, initialValue = { term: '', value: '' }, memId = null, resetPageOnSearch = true) {
    const [searchTerm, setSearchTerm] = useState(initialValue);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = () => {
        const apiUrl = memId
            ? `${apiBaseUrl}/search/${searchTerm.value}/${searchTerm.term}/${memId}`
            : `${apiBaseUrl}/search/${searchTerm.value}/${searchTerm.term}`;

        return fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const formattedData = data.map((item, index) => ({ id: index + 1, ...item }));
                setData(formattedData.reverse());

                if (resetPageOnSearch) {
                    navigate(`${location.pathname}?page=1`);
                }

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
