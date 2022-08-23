import React from 'react'
import styles from '../styles/PizzaCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
export const PizzaCard = ({product}) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${product._id}`} passHref>
     <Image src={product.image} alt='' height='300' width='300' objectFit='contain'/>
     </Link>
     <h1 className={styles.title}>{product.title} </h1>
     <span className={styles.price}>{product.sizes[0].price} DA</span>
     <div className={styles.desc}>{product.desc} </div>

    </div>
  
  
  )
}


