import styles from '../../styles/Admin.module.css'
import Image from 'next/image'
import axios from 'axios'
import {useState} from 'react'
import { Add } from '../../components/Add'
import Link from 'next/link'
export default function Index ({products,orders}) {
 const [productList,setProductList] = useState(products)
 const [close,setClose] = useState(true)
 const [orderList,setOrderList] = useState(orders)
 const [product,setProduct] = useState()
 const status = ['preparing','on the way','delivered']
 const deleteProduct = async (id)=>{
  try{
 const res = await axios.delete(`http://localhost:3000/api/product/${id}`)
  setProductList(productList.filter(p=>p._id!==id))
  }catch(err){
   console.log('er',err)
  }
 }
 const changeStatus = async(id)=>{
  const currentOrder = orderList.filter((o)=>o._id===id)[0]
  const currentStatus = currentOrder.status
  try{
  const res = await axios.put(`http://localhost:3000/api/order/${id}`,{status:currentStatus + 1})
  setOrderList([res.data,...orderList.filter((o)=>o._id!==id)])
  }catch(err){
   console.log(err)
  }
 }
  return (
    <>
        <div className={styles.container}>
     <div className={styles.item}>
      <h1 >Products </h1>
      <table className={styles.table}>
       <tr className={styles.trTitle}>
       <th>
        Products
        </th>
        <th>
        Id
        </th>
      
       <th >
        Price
       </th>
       <th >
       Name
       </th>
       <th>
        Action
       </th>
       </tr>
       
        {productList.map((p)=>(
         <tr className={styles.tr} key={p._id}>
         <td className={styles.imgContainer} >
        <Image src={p.image} alt='' layout='fill' objectFit='contain'/>
        </td>
        <td>
        {p._id.slice(0,5)}...
        </td>
      
       <td >
        {p.sizes[0].price} DA
       </td>
       <td >
      {p.title}
      
       </td>
       <td>
        <button className={styles.button} onClick={()=>{setProduct({...p});setClose(false)}}>Edit</button>
        <button className={styles.button} onClick={()=>deleteProduct(p._id)}>Delete</button>
       </td>
       </tr>
        ))}
       
      </table>
     </div>
     <div className={styles.item}>
      <h1>Orders</h1>
      <table className={styles.table}>
       <tr className={styles.trTitle}>
       <th>
       Id
        </th>
        <th>
        Customer
        </th>
      
       <th >
        Address
       </th>
       <th >
        Total
       </th>
       <th >
        Payement
       </th>
       <th >
        Status
       </th>
       <th>
        Action
       </th>
       </tr>
       {orderList.map((order)=>(
       <tr className={styles.tr} key={order._id}>
       <td >
       {order._id.slice(0,5)}...
        </td>
        <td>
     {order.customer}
        </td>
        <td >
    {order.address}
       </td>
       <td >
     {order.total} DA
       </td>
       <td >
       {order.method === 0? 'Cash': 'PayPal'}
       </td>
       <td >
      {status[Number(order.status)]}
       </td>
       <td className={styles.buttons}>
        {order.status<2 && (
         <button className={styles.button} onClick={()=>changeStatus(order._id)}>Next Stage</button>
        )}
        <Link href={`/cart/${order._id}`} passHref>
        <button className={styles.button} >View cart</button>   
        </Link>
       
       </td>
       </tr>

       ))}

      </table>
     </div>
    
    </div>
    {!close&& <Add setClose={setClose} product={product}/>}
    </>

  )
}
export const getServerSideProps = async(ctx)=>{
 const myCookie = ctx.req?.cookies || ""
 if (myCookie.token!==process.env.TOKEN){
  return{
   redirect : {
    destination : '/admin/login',
    permanent : false
   }
  }
 }
 const productsRes = await axios.get('http://localhost:3000/api/product')
 const ordersRes = await axios.get('http://localhost:3000/api/order')

 return {
  props:{
   products : productsRes.data,
   orders : ordersRes.data.sort((a,b)=>{
    return new Date(b.createdAt) - new Date(a.createdAt)
   })
  }
 }
}