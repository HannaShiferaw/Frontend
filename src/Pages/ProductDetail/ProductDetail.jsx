import React, { useState, useEffect } from 'react'
import styles from './ProductDetail.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoints'  
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader.jsx'

function ProductDetail() {
const { productId } = useParams()
const [product, setproduct] = useState([])
const [isLoading, setIsLoading] = useState(false);
useEffect(() => {
  setIsLoading(true);
 axios.get(`${productUrl}/products/${productId}`)
  .then(response => {
    
    setproduct(response.data);
    setIsLoading(false);
    
  })
  .catch(error => {
    console.error("Error fetching product details:", error);
    setIsLoading(false);
  });
}, []);

  return (
   <LayOut>
    {isLoading ? <Loader /> : <ProductCard product={product}   flex={true } renderDesc={true} renderAdd={true}/>}

  
   </LayOut>
  )
}

export default ProductDetail