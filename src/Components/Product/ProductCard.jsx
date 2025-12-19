import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type.jsx";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { image, title, id, rating, price, description } = product;

  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };
  return (
    <div
      className={`${styles.card__container} ${
        flex ? styles.product__flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>

      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ width: "460px" }}> {description}</div>}
        <div className={styles.rating}>
          {/* rating */}
          <Rating value={rating?.rate || 0} precision={0.1} />
          {/* rating counter */}
          <small>{rating?.count || 0}</small>
        </div>

        <div>
          {/* price  */}
          <CurrencyFormat amount={price} />
        </div>

        {renderAdd && (
          <button className={styles.button} onClick={addToCart}>
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
