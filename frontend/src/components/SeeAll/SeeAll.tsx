import "./SeeAll.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCategory } from "../../network/products";
import { Product } from "../../models/product";
const SeeAll = () => {
    const [categoryProducts, setCategoryProducts] = useState<Product[]>();
    const { category } = useParams();

    useEffect(() => {
      async function fetchCategoryProducts(query: string) {
        const response = await fetchCategory(query);
        setCategoryProducts(response);
      }

      if (category) {
        fetchCategoryProducts(category);
      }
      
    }, [])
    

    return ( 
        <div></div>
     );
}
 
export default SeeAll;