import styles from '../styles/Contact.module.css'
import emailjs from "@emailjs/browser"
import axios from 'axios'
import { useState,useRef } from 'react'
export default function Contact ()  {
 const [isSent,setIsSent] = useState(false)
 const [isError,setIsError] = useState(false)
 const form = useRef();
 const sendEmail = (e) => {
    e.preventDefault();
    setIsSent(false)
    setIsError(false)
    emailjs.sendForm(
        "service_z5i1b2g",
        "template_9ogtkl1",
        
        form.current,
        "K6ilKK1ZpxgMgxf9W"
      )
      .then(
        (result) => {
          setIsSent(true)
        },
        (error) => {
          setIsError(true)
        }
      );
  }; 

  return (
   <div className={styles.container}>
   <h1 className={styles.title}>Send us an email </h1>
   <form ref={form} className={styles.form} onSubmit={sendEmail}>email'/>
    <label className={styles.label} htmlFor='message'>message :</label>
    <textarea placholder="type your message here, and don't forget to send your email" rows={5} className={styles.textArea} required='true' id='message' name='message' type='text'/>
    <button className={styles.button } type='submit'>Send</button>
   </form>
   {isSent && <div style={{color:'teal',marginTop:'20px'}}>the mail was sent successffuly!</div>}
   {isError && <div style={{color:'crimson',marginTop:'20px'}}>oops! something we,t wrong</div>}
   </div>
)

  }
