import styles from '../styles/Featured.module.css'
import {useState} from 'react'
import Image from 'next/image'
export const Feature = () => {
 const [index,setIndex] = useState(0)
 const images = ['/images/featur.png','/images/featur1.png','/images/featur2.png']
 const HandleClick =(direction)=>{
  if(direction==="l"){
   setIndex(index!==0?index-1:2)
  }else if(direction==="r"){
   setIndex(index!==2?index+1:0)
  }
 }
  return (
    <div className={styles.container}>
     <div className={styles.arrowContainer} style={{left:0}} onClick={()=> HandleClick("l")}>
<Image src='/images/arrowl.png' alt='' layout='fill' objectFit='contain'/>
     </div>
     <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
      {images.map((img,i)=>(
       <div className={styles.imgContainer} key={i} >
        <Image src={img} alt='' layout='fill' objectFit='contain'/>
       </div>
      ))}
     </div>
     <div className={styles.arrowContainer} style={{right:0}} onClick={()=> HandleClick("r")}>
<Image src='/images/arrowr.png' alt='' layout='fill' objectFit='contain'/>
     </div>
    </div>
  )
}
