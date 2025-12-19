import React, { useContext, useState } from "react";
import styles from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut.jsx";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { Type } from "../../Utility/action.type";

function Payment() {
  const navigate = useNavigate();
  const [{ user, basket }, dispatch] = useContext(DataContext);

  // if (!user) return null;

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  // console.log(user);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  // };
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setCardError("Stripe has not loaded yet. Try again.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setCardError("Card element not found.");
      return;
    }

    try {
      setProcessing(true);
      setCardError(null);

      // 1. Request client secret from your backend
      const response = await axiosInstance.post(
        `/payment/create?total=${total * 100}`
      );
      const clientSecret = response.data.clientSecret;
      console.log("Client Secret:", clientSecret);

      // 2. Confirm card payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: { card: cardElement },
        }
      );

      if (error) {
        console.log("Card Error:", error);
        setCardError(error.message);
        setProcessing(false);
        return;
      }

      console.log("PaymentIntent:", paymentIntent);

      if (paymentIntent.status === "succeeded") {
        // Save order to Firebase if needed
        await db
          .collection("users")
          .doc(user.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        // Empty basket
        dispatch({ type: Type.EMPTY_BASKET });

        setProcessing(false);
        navigate("/orders", { state: { msg: "You have placed a new order" } });
      } 
    } catch (err) {
      console.error("Payment error:", err);
      setCardError("Please try again.");
      setProcessing(false);
    }
  };


  return (
    <LayOut>
      {/* header */}
      <div className={styles.payment_header}>Checkout ({totalItem}) items</div>

      {/* payment method */}
      <section className={styles.payment}>
        {/* address */}
        <div className={styles.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={styles.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className={styles.flex}>
          <h3>Payment Methods</h3>
          <div className={styles.payment_card_container}>
            <div className={styles.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={styles.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit" disabled={processing}>
                    {processing ? (
                      <>
                        <ClipLoader color="gray" size={12} />
                        <span style={{ marginLeft: "8px" }}>
                          Please Wait ....
                        </span>
                      </>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
