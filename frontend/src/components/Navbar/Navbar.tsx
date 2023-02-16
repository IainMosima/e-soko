import React, { useState, useEffect } from "react";
import { images } from "../../constants";
import { useDebounce } from "use-debounce";

import SearchBar from "../SearchBar/SearchBar";
import * as ProductsApi from "../../network/products";
import "./Navbar.scss";
import { Product } from "../../models/product";

const Navbar = () => {
    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebounce(query, 500);
    const [searchResults, setSearchResults] = useState<Product[]>();

    useEffect(() => {   
        async function perfomSearch () {
            const results = await ProductsApi.queryProducts(debouncedQuery);
            setSearchResults(results);
        }

        if(debouncedQuery){
            perfomSearch();
        }

        return () => {
            setSearchResults([]);
        }

    }, [debouncedQuery]);
    

    async function handleSearchInput (event: React.ChangeEvent<HTMLInputElement>) {
        setQuery(event.target.value);

    }

    
    
    return ( 
        <nav className="app__navbar">
            <div className="app__navbar-logo">
                <img src={images.logo} alt="logo"/>
            </div>
            <div className="app__searchBar">
                <SearchBar 
                    query={query}
                    handleInputChange={handleSearchInput} setQuery={function (event: string): void {
                        throw new Error("Function not implemented.");
                    } }
                    />
            </div>
        </nav>
     );
}
 
export default Navbar;