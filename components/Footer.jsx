import styles from '../styles/Footer.module.css'
import Image from 'next/image'
export const Footer = () => {
  return (
    <div className={styles.container}>
     <div className={styles.left}>
      <Image src='/images/bg.png'  objectFit='cover' layout='fill' alt='' />
     </div>
     <div className={styles.right}>
      <div className={styles.card}>
       <h2 className={styles.motto}>OH YES WE DID THE AMAR PIZZA</h2>
      </div>
      <div className={styles.card}>
       <h1 className={styles.title}>
        FIND OUR RESTAURENT
       </h1>
     
       <div className={styles.text}>
       <div className={styles.text}>
       
            <br /> Tiaret, 85022
            <br /> rue d alger atrak
          </div>
      
  
       </div>
      </div>
      <div className={styles.card}>
       <h1 className={styles.title}>
        WORKING HOURS
       </h1>
       <div className ={styles.text}>
        SUNDAY UNTILL TUESDAY  
         <br/> 9:00-22:00

      
       </div>
       <div className={styles.text}>
        SATURDAY-SUNDAY 
        <br /> 12:00-23:00
       </div>
      </div>
     </div>
    </div>
  )
}
