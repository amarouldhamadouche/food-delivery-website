import styles from '../styles/Contact.module.css'
import axios from 'axios'
import { useState } from 'react'
export default function Contact ()  {
 const [isSent,setIsSent] = useState(false)
 const [isError,setIsError] = useState(false)
 const onSubmitHandler = async(e)=>{
  e.preventDefault()
  const formData = {}
  Array.from(e.currentTarget.elements).forEach(feild=>{
   if(!feild.name)
    return
   formData[feild.name] = feild.value
  })
  try{
   typeof(window)!=="undefined" &&
   await axios({
   method: 'POST',
   url :`${window.location.origin}/api/mail`, 
   contentType:'application/json',
   data : formData})
   setIsError(false)
   setIsSent(true)
   }catch(err){
    setIsSent(false)
    setIsError(true)
 }

 }
  return (
   <div className={styles.container}>
   <h1 className={styles.title}>Send us an email </h1>
   <form className={styles.form} onSubmit={onSubmitHandler}>
    <label className={styles.label} htmlFor='name'>name :</label>
    <input className={styles.input} required='true' id='name' name='name' type='text'/>
    <label className={styles.label} htmlFor='email'>email :</label>
    <input className={styles.input}  required='true' id='email' name='email' type='email'/>
    <label className={styles.label} htmlFor='message'>message :</label>
    <textarea rows={5} className={styles.textArea} required='true' id='message' name='message' type='text'/>
    <button className={styles.button } type='submit'>Send</button>
   </form>
   {isSent && <div style={{color:'teal',marginTop:'20px'}}>the mail was sent successffuly!</div>}
   {isError && <div style={{color:'crimson',marginTop:'20px'}}>oops! something we,t wrong</div>}
   </div>
)

  }
