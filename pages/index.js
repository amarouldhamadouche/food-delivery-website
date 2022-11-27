import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Feature } from '../components/Feature'
import { PizzaList } from '../components/PizzaList'
import { AddButton } from '../components/AddButton'
import { useState } from 'react'
import { Add } from '../components/Add'
import axios from 'axios'
export default function Home({productList,admin}) {
  const [close,setClose] = useState(true)
  return (
    <div className={styles.container}>
      <Head>
        <title>Tiaret fast food</title>
        <meta name="description" content="order pizza order tacos order fast food order burger order fastfood algeria tiaret fast food" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
<Feature/>
{admin && <AddButton setClose={setClose}/>
}
<PizzaList productList={productList}  />
{!close && <Add setClose= {setClose}/>}
    </div>
  )
}
export const getServerSideProps =  async (ctx)=>{
  const myCookie = ctx.req?.cookies
  let admin = false
  if (myCookie.token === process.env.TOKEN){
    admin = true
  }
let res
try{
 res = await axios.get(`https://${ctx.req.rawHeaders[1]}/api/product`)
 }catch(err){}



return {
  props:{
    productList:res.data,
    admin


  }
}}




