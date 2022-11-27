import styles from '../../styles/Login.module.css'
import {useState} from 'react'
import axios from 'axios'
import Router from 'next/router'
export default function Login () {
 const [username,setUsername] = useState()
 const [password,setPassword] = useState()
 const [error,setError] = useState(false)
 const handleClick = async()=>{
  try{
  typeof(window)!=="undefined" && await axios.post(`${window.location.origin}/api/login`,{username,password})
  Router.push('/admin')
  }catch(err){
    setError(true)
    console.log(err)
  }
 }
  return (
    <div className={styles.container}>
     <div className = {styles.wrapper}>
      <h1 className ={styles.title}>
       Admin dashbord
      </h1>
      <input className={styles.input} onChange={(e)=>setUsername(e.target.value)}/>
      <input className = {styles.input} onChange={(e)=>setPassword(e.target.value)}/>
      <button className = {styles.button} onClick = {()=>handleClick()}> login</button>
      {error && <span className = {styles.err}>
       wrong credentials
       </span>}
     </div>
     
    </div>
  )
}
