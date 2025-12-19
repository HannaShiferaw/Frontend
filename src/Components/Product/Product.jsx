import {useEffect, useState} from 'react'
import axios from 'axios'
import ProductCard from './ProductCard.jsx'
import styles from './Product.module.css'
import Loader from '../Loader/Loader.jsx'
function Product() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
    setIsLoading(true);
    axios.get('https://fakestoreapi.com/products')
    .then((res) =>{ setProducts (res.data); setIsLoading(false)}).catch((error) =>{ console.log(error); setIsLoading(false) })}, [])


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={styles.products__container}>
          {products?.map((singleProduct) => (
            <ProductCard
              renderAdd={true}
              product={singleProduct}
              key={singleProduct.id}
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Product