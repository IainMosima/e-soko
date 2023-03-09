import { Navbar, Categories, LoginSignUp, SeeAll, Packages } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect,  useState } from "react";
import { fetchCategories } from "./network/products";
import { getLoggedInUser } from "./network/users";
import './App.scss';
import { arrayShuffler } from "./utils/arrayShuffler";
import { User } from "./models/user";

// add image optimization using imagekit
function App() {
  const [availableCategories, setAvailableCategories ] = useState<string[]>();
  const [menuToggle, setMenuToggle] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);


  useEffect(() => {
    async function getAvailableCategories() {
      const response = await fetchCategories();
      setAvailableCategories(arrayShuffler(response));
    }

    
    async function fetchLoggedInUser() {
      try {
        const user = await getLoggedInUser();
        setLoggedInUser(user);
      } catch (err) {
        console.error(err);
      }
    }

    getAvailableCategories();
    fetchLoggedInUser();

    

  }, []);


  
  return (
    <BrowserRouter>
      <div>
        <Navbar 
          categories={availableCategories}
          menuToogle={menuToggle}
          setMenuToogle={setMenuToggle}
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
          
        />
      <Routes>
        <Route
         path='/'
         element={
          <Categories
            categories={availableCategories}
            setMenuToogle={setMenuToggle}
          />
         }
        />

        <Route
         path='/loginSignup/:from'
         element={
          <LoginSignUp 
            menuToggle={menuToggle}
            setLoggedInUser={setLoggedInUser}
            loggedInUser={loggedInUser}
          />
         }
        />

        <Route
          path='/search/:query'
          element={
            <SeeAll/>
          }
        />

        <Route
          path='/packages'
          element={
            <Packages
             loggedInUser={loggedInUser}
             />
          }
        />
        
      </Routes>
      
    </div>
    </BrowserRouter>
    
  );
}

export default App;
