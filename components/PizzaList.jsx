import styles from '../styles/PizzaList.module.css'
import{ PizzaCard }from './PizzaCard'
export const PizzaList = ({productList}) => {
  return (
    <div id='products' className={styles.container}>
     <h1 className={styles.title}>
      The best pizzeria ever
     </h1>
     <div className={styles.desc}>
     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
     </div>
     <div className={styles.wrapper}>
      {productList.map((product)=>(
        <PizzaCard key={product._id} product={product}/>
      ))}
     </div>
    </div>
  )
}
