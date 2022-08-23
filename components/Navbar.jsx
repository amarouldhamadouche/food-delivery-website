import Image from 'next/image'
import styles from '../styles/Navbar.module.css'
import {useSelector} from 'react-redux'
import Link from 'next/link'
export const Navbar = () => {
  const quantity = useSelector((state)=>state.cart.quantity)
  return (
    <div className={styles.container}>
     <div className={styles.item}>
      <div className={styles.img}>
       <Image src = '/images/telephone.png' alt='' height='32' width="32"/>
      </div>
      <div className={styles.texts}>
       <div className={styles.text}>ORDER NOW!</div>
       <div className={styles.text}>0540925082</div>
      </div>
     </div>
     <div className={styles.item}>
      <ul className={styles.list}>
        <Link href='/' passHref>
                 <li className={styles.listItem}>
        Home page
       </li>
       </Link>
<a href="#products">
       <li className={styles.listItem} >
        Products
       </li>
       </a>
       <Image src='/images/logo.png' alt='' width='180' height='100'/>
     
       <li className={styles.listItem}>
       Blogs
       </li>
       <Link href='/contact' passHref>
       <li className={styles.listItem}>
        Contact
       </li>
       </Link>
      </ul>
     </div>
     <Link href='/cart' passHref>
     <div className={styles.item}>
      <Image src='/images/cart.png' alt='' width='30' height='30'/>
       <div className={styles.counter}>{quantity} </div>
     </div>
     </Link>
    </div>
  )
}
