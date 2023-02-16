import React, { useEffect } from "react";
import { Product } from "../../models/product";

interface SearchBarProps {
    query: string,
    setQuery: (event: string) => void,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const SearchBar = ({ query, handleInputChange } : SearchBarProps) => {
        
    return ( 
        <div className="app__searchBar">
            <input type='text' value={query} onChange={handleInputChange}/>
        </div>
    );
}
 
export default SearchBar;