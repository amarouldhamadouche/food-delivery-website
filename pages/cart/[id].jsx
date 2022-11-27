
import styles from '../../styles/Cart.module.css'
import Image from 'next/image'
import axios from 'axios'
export default function Cart ({cart}){

  return (
   <div className={styles.container}>
   <div className={styles.left}>
    <table className={styles.table}>
     <tr className={styles.trTitle}>
      <th >Product</th>
      <th>Name</th>
      <th>Extras</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Total</th>
     </tr>
     {

   cart &&  cart.product.map((product)=>(
      <tr className={styles.tr} key={product._id}>
      <td style={{display:'flex',justifyContent:'center'}}>
        <div className={styles.imgContainer}>
        <Image src={product.image} alt="" layout='fill' objectFit='contain'/> </div></td>
      <td>
       <span className={styles.name}>{product.title} </span>
      </td>
      <td>
      <span className={styles.extra}>
      {product.extra.map((extra)=>(
         <span key={extra._id}>{extra.text}, </span> 
      ))}
      </span> 
     </td>
      <td><span className={styles.price}>{product.price} DA</span> </td>
      <td><span className={styles.quantity}>{product.quantity} </span> </td>
      <td><span className={styles.total}>{product.price * product.quantity} DA</span> </td>
      </tr>
     
     
     ))}      </table>
     
   <span style={{width:"100%",display:'flex',flexDirection:'column',alignItems:'center',fontSize:'20px',fontWeight:500}}>total : {cart.total} DA</span>
   </div> 
   </div>
  )
}
export const getServerSideProps = async (ctx)=>{



 const res = await axios.get(`https://${ctx.req.rawHeaders[1]}/api/cart/${ctx.params.id}`)
 return {
   props:{
   cart:res.data
   }
 }

}
