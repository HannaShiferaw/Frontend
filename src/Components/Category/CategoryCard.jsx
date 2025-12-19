import styles from "./category.module.css";
import { Link } from "react-router-dom";


function CategoryCard({ data }) {
 
  return (
    <div className={styles.category}>
     <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imgLink} alt="" />
        <p>Shop now</p>
      </Link>
    </div>
  );
}
export default CategoryCard;
