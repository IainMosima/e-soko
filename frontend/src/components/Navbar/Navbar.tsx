import React, { useState, useEffect } from "react";
import { Images } from "../../constants";
import { useDebounce } from "use-debounce";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


import SearchBar from "../SearchBar/SearchBar";
import * as ProductsApi from "../../network/products";
import * as UserApi from "../../network/users";
import "./Navbar.scss";
import { Product } from "../../models/product";
import { User } from "../../models/user";

interface NavbarProps {
    categories: string[] | undefined,
    menuToogle: boolean
    loggedInUser: User | null,
    setMenuToogle: React.Dispatch<React.SetStateAction<boolean>>,
    setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>
}

const Navbar = ({ categories, menuToogle, loggedInUser, setLoggedInUser, setMenuToogle }: NavbarProps) => {
    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebounce(query, 500);
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [categoryToggle, setcategoryToggle] = useState(false);
    const [accountToggle, setAccountToggle] = useState(false);
    const resultAvailable = searchResults.length > 0 ? true: false; 
    const myAccount = [
        {
            img: Images.profileDefault,
            name: 'My Profile'
        },
        // {
        //     img: Images.orderIcon,
        //     name: 'Orders'
        // }
        // will add inbox later on
    ]

    useEffect(() => {   
        async function perfomSearch () {
            const results = await ProductsApi.searchFunction(debouncedQuery);
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

    async function logout() {
        try {
            await UserApi.logout();
            setLoggedInUser(null);
        } catch (error) {
            console.error(error);
            
        }
    }

    function toggleHandler(option?: string) {
        switch (option) {
            case 'categories':
                setcategoryToggle(!categoryToggle);
                setAccountToggle(false);
                break;
            
            case 'myAccount':
                setAccountToggle(!accountToggle);
                setcategoryToggle(false);
                break;
            
            case 'none':
                setAccountToggle(false);
                setcategoryToggle(false);
                break;
        }
    }

    
    
    return ( 
        <nav className="app__navbar" >
            <div className="app__navbar-logo" onClick={()=>setMenuToogle(false)}>
                <Link to="/">
                    <img src={Images.logo} alt="logo" className="logo"/>
                    <h3>E-Soko</h3>
                </Link>
            </div>

            <div className="app__searchBar">
                <SearchBar 
                    query={query}
                    handleInputChange={handleSearchInput} setQuery={function (event: string): void {
                        throw new Error("Function not implemented.");
                    } }
                    />

                                
                {resultAvailable &&
                    <div className='search-results'>                       
                    <ul>
                        {searchResults.map((item, index) =>(
                            <Link to={`/search/${item.productName}`} onClick={()=>setSearchResults([])} key={index} style={{textDecoration: 'none', color: 'black'}}>
                                <li>{item.productName}</li>
                            </Link>
                            ))}
                        
                    </ul>
                </div>
                }
                
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
                                {categories?.map((item, index) => (
                                    <Link to={`/seach/${item}`} key={index} className='categories-links'> 
                                        <li key={index}>{item}</li>
                                    </Link>
                                ))}
                            </ul>
                        </motion.div>
                    }
                </div>

                <div>
                    <img src={Images.packageIcon} alt='package-icon' className='icon'/>
                    <h4>Packages </h4>
                </div>
                
                {loggedInUser &&
                    <div>
                    <img src={Images.orderIcon} alt='package-icon' className='icon'/>
                    <h4>Orders </h4>
                </div>
                }

                {!loggedInUser &&
                    <Link to={'/loginSignup'} style={{textDecoration: 'none', color: 'black'}}>
                        <div>
                            <img src={Images.accountIcon} alt='account-icon' className='profile-icon' />
                            <h4>My Account </h4>
                        </div>
                    </Link>
                    
                }

                {loggedInUser &&
                    <div onClick={()=>toggleHandler('myAccount')}>
                        {loggedInUser.profileImgKey &&
                            <img src={UserApi.getUserProfileImage(loggedInUser.profileImgKey)} alt='profile-pic' className='profile-icon'/>
                        }

                        {!loggedInUser.profileImgKey &&
                            <img src={Images.accountIcon} alt='profile-icon' className='profile-icon'/>
                        }
                        <h4>{loggedInUser.username}</h4>
                        <img src={Images.dropDownIcon} alt='drop-icon'/>

                        {accountToggle && 
                            <motion.div
                                whileInView={{y: [0, 10]}}
                                transition={{ duration: 0.1, ease: 'easeOut' }}
                                className="more_info my_account"
                            > 
                            <ul>
                               {myAccount.map((item, index) => (
                                <li key={index}>{<img src={item.img} alt='my-profile-icon'/>} {item.name}</li>
                                ))}

                                <hr />                                           
                                <button className="link" style={{paddingTop: 0}} onClick={logout}>Log Out</button>          
                            </ul>                                
                            </motion.div>
                        }
                    </div>
                }

                

            </div>
            

            <div className="app__menu">
                <img src={Images.menuIcon} alt='menu-down' className="menu-icon" onClick={()=>setMenuToogle(true)}/>
                {menuToogle &&
                    <motion.div
                        whileInView={{x: [300, 0]}}
                        transition={{ duration: 0.7, ease: 'easeOut'}}
                        className="menu-body"
                    >
                        <img src={Images.closeIcon} alt='closeIcon' className="close-icon" onClick={()=>setMenuToogle(false)}/>
                        
                        <br/>
                        <br/>
                        <br/>
                        
                        <div onClick={()=>toggleHandler('categories')}>
                            <div className="information">
                                <img src={Images.categoryIcon} alt='category-icon' className='icon'/>
                                <h4>Categories</h4>
                                <img className='drop-down'src={Images.dropDownIcon} alt='drop-down'/>
                            </div>
                            

                            {categoryToggle && 
                            <motion.div
                                whileInView={{y: [0, 10]}}
                                transition={{ duration: 0.1, ease: 'easeOut' }}
                                className="more_info"
                            >
                                <ul>
                                    {categories?.map((item, index) => (
                                        <Link to={`/seach/${item}`} onClick={() => setMenuToogle(false)} key={index} className='categories-links'> 
                                            <li key={index}>{item}</li>
                                        </Link>
                                    ))}
                                </ul>
                            </motion.div>
                    }
                        </div>

                        <br/>
                        <br/>
                        
                        <div>
                            <div className="information" onClick={() => setMenuToogle(false)}>
                                <img src={Images.packageIcon} className='packageIcon' alt='package-icon' />
                                <h4>Packages </h4>
                            </div>
                            
                        </div>

                        <br/>
                        <br/>
                        
                        {loggedInUser &&
                            <>
                                <div>
                                    <div className="information">
                                        <img src={Images.orderIcon} alt='package-icon' className='icon'/>
                                        <h4>Orders </h4>
                                    </div>
                                </div>
                                <br />
                                <br />
                            </>
                            
                        }
                        

                        {!loggedInUser &&
                            <div>
                                <div className="information" onClick={() => setMenuToogle(false)}>
                                    <Link to={'/loginSignup'}  style={{textDecoration: 'none', color: 'black'}}>
                                        <div className="information" onClick={()=>toggleHandler('myAccount')}>
                                            <img src={Images.accountIcon} alt='account-icon' className='profile-icon' />
                                            <h4>My Account </h4>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            
                        }

                        {loggedInUser &&
                            <div className="information account-mobile">
                                <div onClick={()=>toggleHandler('myAccount')}>
                                    <div className="loggedInProfile">
                                        {loggedInUser.profileImgKey &&
                                            <img src={UserApi.getUserProfileImage(loggedInUser.profileImgKey)} alt='profile-pic' className='profile-icon icon' />
                                        }

                                        {!loggedInUser.profileImgKey &&
                                            <img src={Images.accountIcon} alt='profile-icon' className='profile-icon'/>
                                        }
                                        <h4>{loggedInUser.username}</h4>
                                        <img src={Images.dropDownIcon} alt='drop-icon'/>
                                    </div>
                                    {accountToggle && 
                                        <motion.div
                                            whileInView={{y: [0, 10]}}
                                            transition={{ duration: 0.1, ease: 'easeOut' }}
                                            className="more-info-mobile"
                                        > 
                                        <ul>
                                            {myAccount.map((item, index) => (
                                                <li onClick={() => setMenuToogle(false)} key={index}><img src={item.img} alt='my-profile-icon' className="iconDefault"/> {item.name}</li>
                                                ))}                                         
                                                <button className="link" style={{paddingTop: 0}} onClick={logout}>Log Out</button>          
                                        </ul>                                
                                        </motion.div>
                                    }
                                    
                                </div>
                            </div>
                        }
                        

                    </motion.div>
                }

            </div>
            

        </nav>
     );
}
 
export default Navbar;