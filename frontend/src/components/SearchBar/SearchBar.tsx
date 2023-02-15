import React, { useEffect } from "react";

interface SearchBarProps {
    query: string,
    setQuery: (event: string) => void,
    debouncedQuery: () => void,
    performSearch: () => void
}

const SearchBar = ({ query, setQuery, debouncedQuery, performSearch } : SearchBarProps) => {
    useEffect(() => {
      performSearch();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedQuery])
    
    function handleInputChange (event: React.ChangeEvent<HTMLInputElement>) {
        setQuery(event.target.value);
    }
    

    return ( 
    <div className="app__searchBar">
        <input type='text' value={query} onChange={handleInputChange}/>
    </div> 
    );
}
 
export default SearchBar;