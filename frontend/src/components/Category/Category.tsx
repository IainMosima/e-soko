import { Images } from "../../constants";
import { Product } from "../../models/product";
import { imageStreamer } from "../../network/products";
import "./Category.scss";

interface CategoryProps {
    categoryName: string,
    query: string,
    products: Product[] | undefined
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
            <br />

            <div className="card-body">
               { products?.map((item, index) => (
                    <div key={index} className="card">
                        <img className='product-img' src={imageStreamer(item.productImgKey)} alt={item.productName}/>
                        <p className='name'>{item.productName}</p>
                        <p className='price'>Ksh. {item.price}</p>
                        <p className='quantity'>per kg</p>
                        <div className='add'>
                            <img src={Images.addIcon}  alt='add'/>
                            <img src={Images.cartIcon}  alt='add'/>
                        </div>

                    </div>
                ))}
            </div>

            <br />            
            <hr/>
        </div>
     );
}
 
export default Category;