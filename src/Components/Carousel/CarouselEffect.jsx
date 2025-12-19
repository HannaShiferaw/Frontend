import React from 'react'
import{ Carousel} from 'react-responsive-carousel';
import {img} from './img/data.js'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './Carousel.module.css'
function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
      
      
      >
        {img.map((imageItemLink) => {
          return <img src={imageItemLink} />;
        })}
      </Carousel>
      <div className={styles.hero_img}>

      </div>
    </div>
  );
}

export default CarouselEffect