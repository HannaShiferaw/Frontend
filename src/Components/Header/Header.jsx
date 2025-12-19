import React from "react";
import { SlLocationPin } from "react-icons/sl";
import LowerHeader from "./LowerHeader.jsx";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider.jsx";
import {auth} from  "../../Utility/firebase.jsx"

function Header() {
 const [{ user, basket }, dispatch] = useContext(DataContext);
 const totalItem = basket?.reduce((amount, item) => {
   return item.amount + amount;
 }, 0);

  return (
    <>
      <section className={styles.fixed}>
        <div className={styles.header__container}>
          {/* logo section */}
          <div className={styles.logo__container}>
            {/* Amazon Logo */}

            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>

            {/* Delivery  section */}
            <div className={styles.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          {/* search section */}
          <div className={styles.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="Search products" />
            <BsSearch size={38} />
          </div>

          {/* other section */}

          <div className={styles.order__container}>
            <Link to="" className={styles.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/960px-Flag_of_the_United_States.svg.png?20240524035322"
                alt=""
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>
            {/* account section */}
            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p>Sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>

            {/* orders */}

            <Link to="/orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>

            {/* cart */}

            <Link to="/cart" className={styles.cart}>
              <BiCart size={35} /> {/* Cart icon */}
              <span>{totalItem}</span> {/* Item count */}
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </>
  );
}

export default Header;
