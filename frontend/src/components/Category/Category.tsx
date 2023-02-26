import { Images } from "../../constants";
import { Product } from "../../models/product";
import "./Category.scss";

interface data {
    productName: string,
    price: number,
    image: string
}

interface CategoryProps {
    categoryName: string,
    query: string,
    products: data[]
}



const Category = ({ categoryName, query, products } : CategoryProps) => {
    return ( 
        <div className="app__card">
            <div className="card-title">
                <div></div>
                <h3>{categoryName}</h3>
                <div></div>
                <h4>See all <img src={Images.nextIcon} alt='next'/> </h4>
                <div></div>
            </div>
            <hr/>

            <div className="card-body">
               { products.map((item, index) => (
                    <div key={index} className="card">
                        <img className='product-img' src={Images.maizeIcon} alt={item.productName}/>
                        <p className='name'>{item.productName}</p>
                        <p className='price'>Ksh. 150</p>
                        <p className='quantity'>per kg</p>
                        <img src={Images.addIcon}  className='add' alt='add'/>
                        <img src={Images.cartIcon}  className='cart' alt='add'/>

                    </div>
                ))}
            </div>
            
            <hr/>
        </div>
     );
}
 
export default Category;