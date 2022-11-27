
import styles from '../../styles/Cart.module.css'
import Image from 'next/image'
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import { OrderDetail } from '../../components/OrderDetail'
import {reset} from '../../redux/cartSlice'
import Router from 'next/router'
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useState,useEffect } from 'react';
export default function Cart () {

  const [cash,setCash] = useState(false)
  const [open,setOpen] = useState(false)
  var cart =  useSelector((state)=>state.cart)
 
  const amount =cart.total/190
  const currency = "USD"
  const style = {layout:'vertical',zIndex:0,width:'100%',marginTop:'90px'}
  const dispatch = useDispatch() 
  const createCart = async(id)=>{
    
    try{
    const res =  typeof(window)!=="undefined" && await axios.post(`${window.location.origin}/api/cart`,{product:cart.products,quantity:cart.quantity,total:cart.total,orderId:id})
    if(res.status===200){
      dispatch(reset())
      Router.push( `/order/${id}` )}
   
    
    }catch(err){

    }
  }
  const createOrder = async (data) => {
    try {
      const res = typeof(window)!=="undefined" && await axios.post( `${window.location.origin}/api/order`, data)
     if(res.status === 201){
    createCart(res.data._id)
    }}catch(err){
        console.log(err)
      }}
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
     
    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });    }, [currency, showSpinner]);
    return ( <>
    {showSpinner && isPending && <div className="spinner" />}
    <PayPalButtons
      style={style}
      disabled={false}
      forceReRender={[amount, currency, style]}
      fundingSource={undefined}
      createOrder={(data, actions) => {
        return  actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: currency,
                  value: amount,
                },
              },
            ],
          })
          .then((orderId) => {
            // Your code here after create the order
            return orderId;
          });
      }}
      onApprove={function (data, actions) {
        return actions.order.capture().then(function (details) {
          const shipping = details.purchase_units[0].shipping;
          createOrder({
            customer: shipping.name.full_name,
            address: shipping.address.address_line_1,
            total: cart.total,
            method: 1,
          });
        });
      }}
    />
  </>
);
};

  return (
    <div className={styles.container}>
     <div className={styles.left}>
      <table className={styles.table}>
        <tbody>
        <tr className={styles.trTitle}>
        <th >Product</th>
        <th>Name</th>
        <th>Extras</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
       </tr>
       {

       cart.products.map((product)=>(
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
        <td><span className={styles.price}>{product.price} </span> </td>
        <td><span className={styles.quantity}>{product.quantity} </span> </td>
        <td><span className={styles.total}>{product.price * product.quantity} </span> </td>
        </tr>
       
       
       ))}  
        </tbody>
       </table>
     </div>
     {
     <div className={styles.right}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          CART TOTAL
        </h1>
    
        <div className={styles.info}>
        <h3 className={styles.subTitle}>
         Total
        </h3>
        <div className={styles.text}>{cart.total} DA</div>
        </div>
        {!open?( <button className={styles.button} onClick={()=>setOpen(true)}>
     check out now
        </button>):( 
        <div className={styles.payButtons}>
          <button className={styles.cashButton} onClick={()=>setCash(true)}>
              Pay Cash
        </button>
        <PayPalScriptProvider
        
                options={{
                  "client-id":"AXRe36GuYE6cjol7BB_uUvaQGlQGVLhI750j57uN20XaSXiEnB-FeL4ev1IeqDGZbfypnmE2vd5r3NnW",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
              </div>)}
       
       
      </div>
     </div>
     }
     {cash && (<OrderDetail total={cart.total} createOrder = {createOrder} setCash={setCash} />)}
    </div>
  
   
  )
}



