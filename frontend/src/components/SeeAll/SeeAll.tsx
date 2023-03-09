import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../../models/product";
import { Images } from "../../constants";
import { imageStreamer, searchFunction } from "../../network/products";

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import CircularProgress from "@mui/material/CircularProgress";
import Link from '@mui/material/Link';
import "./SeeAll.scss";

const SeeAll = () => {
    const [results, setResults] = useState<Product[]>();
    const { query } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
      async function fetchCategoryProducts(query: string) {
        const response = await searchFunction(query);
        if (response) {
          setResults(response);
        } else {
          navigate(`/noResults/${response}`);
        }
      }

      if (query) {
        fetchCategoryProducts(query);
      }
      
    }, [])
    
    
    return ( 
        <div className="app__searchResults">
          <div className='crumbs'>
            <Breadcrumbs>
              <Link
              underline='hover'
              href='/'
              style={{color: '#E09132'}}
              >
                Home
              </Link>
              <Typography color="text.primary">{query}</Typography>

            </Breadcrumbs>
          </div>

          {!results &&
                  <div className="spinner">
                      <CircularProgress size="4rem" color="inherit"/>
                  </div>
          }
          {results &&

              <div className="app__card">
                {results?.map((item, index) => (
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
                ))
                }
            </div>
          }  
          
        </div>
     );
}
 
export default SeeAll;