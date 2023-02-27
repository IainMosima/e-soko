import { Navbar, Categories, Category } from "./components";
import { useEffect, useState } from "react";
import { fetchCategories, fetchCategory } from "./network/products";
import './App.scss';
import { Product } from "./models/product";

const data = [
  {
    productName: 'Maize',
    price: 150,
    image: './dummyImages/maize.png'
  },
  {
    productName: 'Bean',
    price: 150,
    image: './dummyImages/maize.png'
  },
  {
    productName: 'Rice',
    price: 160,
    image: './dummyImages/maize.png'
  },
  {
    productName: 'Sorghum',
    price: 150,
    image: './dummyImages/maize.png'
  },
  {
    productName: 'Green-grams',
    price: 180,
    image: './dummyImages/maize.png'
  },
  {
    productName: 'Peas',
    price:120,
    image: './dummyImages/maize.png'
  }
]

function App() {
  // const [availableCategories, setavailableCategories ] = useState();
  const [cerealProducts, setCerealProducts] = useState<Product[]>();
  useEffect(() => {
    async function getProducts(category: string, records = 6) {
      const response = await fetchCategory(category, records);
      setCerealProducts(response);
    }

    getProducts('Cereals');

}, [])

  return (
    <div>
      <Navbar />
      <Category
       categoryName="cereals"
       query=""
       products={cerealProducts}
       />
      

    </div>
  );
}

export default App;
