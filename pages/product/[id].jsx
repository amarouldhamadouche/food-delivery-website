import styles from '../../styles/Product.module.css'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { addProduct } from '../../redux/cartSlice'
export default function Product({product})  {
  const sizeImages = ["/images/size.png","/images/sandwich.png","/images/burger.png","/images/soft-drink.png"]
  const [size,setSize] = useState(0)
  const [price ,setPrice] = useState(product.sizes[0].price)
  const [extra,setExtra] = useState([])
  const [quantity,setQuantity]=useState(1)
  const sizes = ['Small','Medium','Large']
  const dispatch = useDispatch()
  const handleClick = ()=>{
    dispatch(addProduct({...product,extra,price,quantity}))
  }
  const changePrice =  (n)=>{
    setPrice(price+n)
  }
  const changeSize = (sizeIndex)=>{
  const diff = product.sizes[sizeIndex].price - product.sizes[size].price
   setSize(sizeIndex)
   changePrice(diff)
  }
  
const sizeHandler = (size)=>{
  if (size == 0){
    return styles.small
  }
  else if (size == 1){
    return styles.medium
  }else{
    return styles.large 
  }
}
const handleChange = (e,option)=>{
  const checked = e.target.checked
  if (checked){
    changePrice(option.price)
    setExtra((prev)=>[...prev,option])
  }else{
    changePrice(-option.price)
    setExtra(extra.filter((e)=>e._id!==option._id))
  }
}
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={product.image} alt='' layout='fill' objectFit='contain'/>
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.pizzaName}>{product && product.title} </h1>
        <span className={styles.price}>{price} DA </span>
        <div className={styles.desc}>{product && product.desc} </div>
        <h3 className={styles.choose}>
          choose the size
        </h3>
        <div className={styles.sizes}>
{product && product.sizes.map((s,i)=>(
        <div className={sizeHandler(s.size)} onClick={()=>{changeSize(i)}} key={s._id}>
        <Image src={sizeImages[product.type]} alt='' layout='fill'/>
        <span className={styles.number}>{sizes[s.size]} </span>
      </div>

))}
          </div>
          <h3 className={styles.choose}>
            choose additional ingredients
          </h3>
          <div className={styles.ingredients}>
            {
             product && product.extraOptions.map((option)=>(
             
            <div className={styles.ingredient} key={option._id}>
            <input type='checkbox' className={styles.checkbox} id='double' name='double' onChange={(e)=>handleChange(e,option)}/>
            <lable htmlFor ='double'>{option.text} </lable>
          </div>   
              ))
            }
           
          </div>
          <div className={styles.addToCarte}>
            <input className={styles.quantity} type='number' defaultValue={1} onChange={(e)=>{setQuantity(e.target.value)}}/>
            <button className={styles.addButton} onClick={handleClick}>
              add to carte
              </button> 
          </div>
        
      </div>
    </div>
  )
}
export const getServerSideProps =  async(ctx)=>{
  const res = await axios.get(`https://${ctx.req.rawHeaders[1]}/api/product/${ctx.params.id}`)
  return {
    props : {
      product : res.data
    }
  }
  }
