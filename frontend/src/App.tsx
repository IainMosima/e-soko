import { Navbar, Categories, LoginSignUp } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCategories } from "./network/products";
import './App.scss';
import { arrayShuffler } from "./utils/arrayShuffler";

// add image optimization using imagekit
function App() {
  const [availableCategories, setAvailableCategories ] = useState<string[]>();
    useEffect(() => {
      async function getAvailableCategories() {
      const response = await fetchCategories();
      setAvailableCategories(arrayShuffler(response));
    }

    getAvailableCategories();
    

}, [])


  
  return (
    <BrowserRouter>
      <div>
        <Navbar 
        categories={availableCategories}
        />
      <Routes>
        {/* <Route
         path='/'
         element={
          <Categories
            categories={availableCategories}
          />
         }
        /> */}

        <Route
         path='/loginSignup'
         element={
          <LoginSignUp/>
         }
        />

        
      </Routes>
      
    </div>
    </BrowserRouter>
    
  );
}

export default App;
