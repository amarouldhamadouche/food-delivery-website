import styles from '../../styles/Order.module.css'
import Image from 'next/image'
import axios from 'axios'
export default function Order({order}) {
 const status = order.status
 const statusHandler = (index)=>{
  if (status - index > 0){
   return styles.done
  }else if(status - index == 0){
   return styles.inProgress
  } else{
   return styles.unDone
  }
 }
  return (  <div className={styles.container}>
   <div className={styles.left}>
    <table className={styles.table}>
     <tr className={styles.trTitle}>
      <th >Order ID</th>
      <th>Customer</th>
      <th>Adresse</th>
      <th>Toatal</th>
      </tr>
     <tr className={styles.tr}>
      <td className={styles.id}>
{order._id}
    </td>
        <td>
       <span className={styles.name}>{order.customer} </span>
      </td>
      <td><span className={styles.addresse}>{order.address} </span> </td>
      <td><span className={styles.total}>{order.total} DA </span> </td>
     </tr>
     </table>
     <div className={styles.statusContainer}>
      <div className={statusHandler(0)}>
       <Image src='/images/bake.png' alt='' width='40px' height='40px' objectFit='contain'/>
       <div>Preparing</div> 
       <Image className={styles.checkedImg} src='/images/checked.png' alt='' width='20px' height='20px' objectFit='contain'/>
      
      </div>
      <div className={statusHandler(1)}>
       <Image src='/images/bike.png' alt='' width='40px' height='40px' objectFit='contain'/>
       <div>On the way</div> 
       <Image className={styles.checkedImg} src='/images/checked.png' alt='' width='20px' height='20px' objectFit='contain'/>
      
      </div>
      <div className={statusHandler(2)}>
       <Image  src='/images/delivered.png' alt='' width='40px' height='40px' objectFit='contain'/>
       <div>Delivered</div> 
       <Image className={styles.checkedImg} src='/images/checked.png' alt='' width='20px' height='20px' objectFit='contain'/>
      
      </div>
     
     </div>
     </div>
     <div className={styles.right}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          CART TOTAL
        </h1>
        <div className={styles.info}>
        <h3 className={styles.subTitle}>
         Subtotal
        </h3>
        <p className={styles.text}>$79</p>
        </div>
        <div className={styles.info}>
        <h3 className={styles.subTitle}>
          Discount
        </h3>
        <p className={styles.text}>$79</p>
        </div>
        <div className={styles.info}>
        <h3 className={styles.subTitle}>
         Total
        </h3>
        <p className={styles.text}>$79</p>
        </div>
        <button className={styles.button}>
          PAID
        </button>
        
      </div>
     </div>
     </div>
  )
}
export const getServerSideProps = async ({params})=>{
  const res = await axios.get(`http://localhost:3000/api/order/${params.id}`)
  return {
   props : {
    order : res.data
   }
  }
 }