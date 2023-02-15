import React, { useState, useEffect } from "react";
import { images } from "../../constants";
import { useDebounce } from "use-debounce";

import SearchBar from "../SearchBar/SearchBar";
import "./Navbar.scss";

const Navbar = () => {
    useEffect(() => {
      
    
    // eslint-disable-next-line react-hooks/exhaustive-deps, no-use-before-define
    }, []);
    

    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebounce(query, 500);

    // performing query search on debounced query
    function performSearch () {
        // will connect to db
        console.log("Searching for ", debouncedQuery);
    }

    return ( 
        <nav className="app__navbar">
            <div className="app__navbar-logo">
                <img src={images.logo} alt="logo"/>
            </div>
            <div className="app__searchBar">
                <SearchBar 
                    query={query}
                    setQuery={setQuery}
                    performSearch={performSearch}
                    debouncedQuery={debouncedQuery}
                />
            </div>
        </nav>
     );
}
 
export default Navbar;