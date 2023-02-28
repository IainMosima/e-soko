import { Navbar, Categories, Category } from "./components";
import { useEffect, useState } from "react";
import { fetchCategories, fetchCategory } from "./network/products";
import './App.scss';
import { Product } from "./models/product";

function App() {
  const [availableCategories, setAvailableCategories ] = useState();
  const [cerealProducts, setCerealProducts] = useState<Product[]>();
  useEffect(() => {
    async function getProducts(category: string, records = 6) {
      const response = await fetchCategory(category, records);
      setCerealProducts(response);
    }

    async function getAvailableCategories() {
      const response = await fetchCategories();
      setAvailableCategories(response);
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
