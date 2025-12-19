import React from "react";
import { categoryInfos } from "./CategoryFullInfos.jsx";
import CategoryCard from "./CategoryCard.jsx";
import styles from "./category.module.css";

function Category() {
  return (
    <section className={styles.category_container}>
      {categoryInfos.map((infos) => (
        <CategoryCard key={infos.id} data={infos} />
      ))}
    </section>
  );
}

export default Category;
