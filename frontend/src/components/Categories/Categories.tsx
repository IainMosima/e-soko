import Category from "../Category/Category";
import { fetchCategory } from "../../network/products";
import { useEffect, useState } from "react";
import { Product } from "../../models/product";

interface  CategoriesProps {
    categories: [] | undefined
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
        <>
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
        </>
    );
}
 
export default Categories;