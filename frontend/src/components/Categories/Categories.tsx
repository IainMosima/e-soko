import Category from "../Category/Category";
import { fetchCategory } from "../../network/products";

interface  CategoriesProps {
    categories: []
}
const Categories = ({ categories }: CategoriesProps) => {

    return (
        <>
            {categories.map(async (category, index) => {
                const products = await fetchCategory(category, 6);

                return <Category
                 categoryName={category}
                 query={''}
                 products={products}
                />
            })}
        </>
    );
}
 
export default Categories;