import {useState} from 'react'
import styles from '../styles/OrderDetail.module.css'

export const OrderDetail = ({total,createOrder,setCash}) => {
 const [customer,setCustomer] = useState('')
 const [address,setAddress] = useState('')
 const [phone,setPhone] = useState('')
 const handleClick = (e)=>{
  e.preventDefault()
  const method = 0
  createOrder({customer,address,total,method})
 }
   return (
    <div className={styles.container}>
    
    <form className={styles.wrapper} onSubmit={(e)=>handleClick(e)}>
    <h1 className={styles.title}>You will pay 12$ after delivry</h1>
     <div className={styles.item}>
     <label className={styles.item}>Full name : </label>
     <input required={true} className={styles.input} placeholder='amar ould hamadouche' onChange={(e)=>setCustomer(e.target.value)}/>
     </div>
     <div className={styles.item}>
     <label className={styles.item}>Phone number : </label>
     <input required={true} className={styles.input} placeHolder='0540925082' onChange={(e)=>setPhone(e.target.value)}/>
     </div>
     <div className={styles.item}>
     <label className={styles.item}>address : </label>
     <textarea rows={5} className={styles.input} placeHolder='atrak b d02 p 04' onChange={(e)=>setAddress(e.target.value)}/>
     </div>
     <button className={styles.button} type='submit'>   Order</button>
     <button className={styles.cancelButton} onClick={()=>setCash(false)}>   Cancel</button>
  
     </form>
    </div>
  )
}
