import styles from '../styles/AddButton.module.css'

export const AddButton = ({setClose}) => {
  return (
    <button className={styles.button} onClick={()=>setClose(false)}>
     Add product</button>

    
  )
}
