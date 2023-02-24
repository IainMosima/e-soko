import React, { useState, useEffect } from "react";
import { Images } from "../../constants";
import { useDebounce } from "use-debounce";
import { motion } from "framer-motion";

import SearchBar from "../SearchBar/SearchBar";
import * as ProductsApi from "../../network/products";
import "./Navbar.scss";
import { Product } from "../../models/product";

const Navbar = () => {
    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebounce(query, 500);
    const [searchResults, setSearchResults] = useState<Product[]>();
    const [menuToggle, setMenuToggle] = useState(false);
    const [categoryToggle, setcategoryToggle] = useState(false);
    const [accountToggle, setAccountToggle] = useState(false);
    const categories = ['Cereals', 'Vegetables', 'Fruits', 'Herbs'];
    const myAccount = [
        {
            img: Images.profileDefault,
            name: 'My Profile'
        },
        {
            img: Images.orderIcon,
            name: 'Orders'
        }
        // will add inbox later on
    ]

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

    function toggleHandler(icon: string) {
        switch (icon) {
            case 'categories':
                setcategoryToggle(!categoryToggle);
                setAccountToggle(false);
                break;
            
            case 'myAccount':
                setAccountToggle(!accountToggle);
                setcategoryToggle(false);
                break;
            
            default:
                setAccountToggle(false);
                setcategoryToggle(false);
        }
    }

    
    return ( 
        <nav className="app__navbar">
            <div className="app__navbar-logo">
                <img src={Images.logo} alt="logo"/>
                <h3>E-Soko</h3>
            </div>

            <div className="app__searchBar">
                <SearchBar 
                    query={query}
                    handleInputChange={handleSearchInput} setQuery={function (event: string): void {
                        throw new Error("Function not implemented.");
                    } }
                    />
            </div>
                
            <div className="app__navbar-links">
                <div onClick={()=>toggleHandler('categories')}>
                    <img src={Images.categoryIcon} alt='category-icon' className='icon'/>
                    <h4>Categories</h4>
                    <img src={Images.dropDownIcon} alt='drop-down'/>

                    {categoryToggle && 
                        <motion.div
                            whileInView={{y: [0, 10]}}
                            transition={{ duration: 0.1, ease: 'easeOut' }}
                            className="more_info"
                        >
                            <ul>
                                {categories.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </motion.div>
                    }
                </div>

                <div>
                    <img src={Images.packageIcon} alt='package-icon' className='icon'/>
                    <h4>Packages </h4>
                    <img src={Images.dropDownIcon} alt='drop-down'/>
                </div>

                <div onClick={()=>toggleHandler('myAccount')}>
                    <img src={Images.accountIcon} alt='account-icon' className='icon'/>
                    <h4>My Account </h4>
                    <img src={Images.dropDownIcon} alt='drop-icon'/>

                    {accountToggle && 
                        <motion.div
                            whileInView={{y: [0, 10]}}
                            transition={{ duration: 0.1, ease: 'easeOut' }}
                            className="more_info my_account"
                        >   
                            <ul>
                                <button>Sign In</button>
                                <hr />
                                {myAccount.map((item, index) => (
                                    <li key={index}>{<img src={item.img} alt='my-profile-icon'/>} {item.name}</li>
                                ))}
                            </ul>
                        </motion.div>
                    }
                </div>

            </div>
            

            <div className="app__menu">
                <img src={Images.menuIcon} alt='menu-down' className="menu-icon" onClick={()=>setMenuToggle(true)}/>
                {menuToggle &&
                    <motion.div
                        whileInView={{x: [300, 0]}}
                        transition={{ duration: 0.7, ease: 'easeOut'}}
                        className="menu-body"
                    >
                        <img src={Images.closeIcon} alt='closeIcon' className="close-icon" onClick={()=>setMenuToggle(false)}/>
                        
                        
                        <div>
                            <img src={Images.categoryIcon} alt='category-icon' className='icon'/>
                            <h4>Categories</h4>
                            <img src={Images.dropDownIcon} alt='drop-down'/>
                        </div>

                        <div>
                            <img src={Images.packageIcon} alt='package-icon' className='icon'/>
                            <h4>Packages </h4>
                            <img src={Images.dropDownIcon} alt='drop-down'/>
                        </div>

                        <div>
                            <img src={Images.accountIcon} alt='account-icon' className='icon'/>
                            <h4>My Account </h4>
                            <img src={Images.dropDownIcon} alt='drop-icon'/>
                        </div>
                        

                    </motion.div>
                }

            </div>
            

        </nav>
     );
}
 
export default Navbar;