import { Navbar, Category } from "./components";
import { useEffect } from "react";

import './App.scss';

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
  useEffect(() => {
    
  }, [])
  
  return (
    <div>
      <Navbar />

      <Category
        categoryName="Cereals"
        query="cereals"
        products={data}

      />

    </div>
  );
}

export default App;
