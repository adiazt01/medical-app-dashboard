import { debounce } from "lodash";
import React, { useCallback, useState } from "react";

export const useSearch = () => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useCallback(debounce(value => setSearch(value), 500), []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(event.target.value);
    };

    return {
        search,
        handleSearchChange
    };
};