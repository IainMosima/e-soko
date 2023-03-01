import { Navbar, Categories, Category } from "./components";
import { useEffect, useState } from "react";
import { fetchCategories, fetchCategory } from "./network/products";
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
    <div>
      <Navbar 
       categories={availableCategories}
      />
     
     <Categories
      categories={availableCategories}
     />

    </div>
  );
}

export default App;
