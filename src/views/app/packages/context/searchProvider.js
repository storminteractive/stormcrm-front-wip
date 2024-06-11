import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {

    let defLimit = 2;
    let defSortColumn = 'createdDate';
    let defSortDirection = 'desc';
    let sortOptions = [
        { value: 'createdDate', label: 'Created Date' },
        { value: 'code', label: 'Package code' }
    ];

    let sortDirectionOptions = [
        {value: "asc", label: "Ascending"},
        {value: "desc", label: "Descending"},
    ]
    
    const [searchValue, setSearchValue] = useState('');
    const [limit, setLimit] = useState(defLimit);
    const [sortColumn, setSortColumn] = useState(defSortColumn);
    const [sortDirection, setSortDirection] = useState(defSortDirection);

    const handleSearchChange = (t) => {
        setSearchValue(t);
    };

    return (
        <SearchContext.Provider value={{ sortOptions, searchValue, limit, sortColumn, sortDirectionOptions, sortDirection, handleSearchChange }}>
            {children}
        </SearchContext.Provider>
    );
};