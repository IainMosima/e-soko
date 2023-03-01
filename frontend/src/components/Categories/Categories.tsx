import Category from "../Category/Category";
import { fetchCategory } from "../../network/products";
import { useEffect, useState } from "react";
import { Product } from "../../models/product";
import "./Categories.scss";

interface  CategoriesProps {
    categories: string[] | undefined
}

interface CategoriesData {
    categoryName: string,
    products: Product[]
}

const Categories = ({ categories }: CategoriesProps) => {
    const [categoriesData, setCategoriesData] = useState<CategoriesData[]>();

    useEffect(() => {
        async function getAllCategoryProducts(records = 6) {
            const result = [];
            let products;

            if (categories) {
                for (const category of categories) {
                    products = await fetchCategory(category, records);
                    result.push({
                        categoryName: category,
                        products: products
                    });
                }
            }
            
            
           setCategoriesData(result);

        }

        getAllCategoryProducts();

    }, [categories]);
    
    
    return (
        <div className='app__category'>
            {categoriesData?.map((item, index) => (
                <div key={index}>
                    <Category
                     categoryName={item.categoryName}
                     query=""
                     products={item.products}
                     /> 
                </div>
            ))

            }        
        </div>
    );
}
 
export default Categories;